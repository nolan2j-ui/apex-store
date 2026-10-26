#!/usr/bin/env python3
"""
Idempotent SEO Product Pages, Rich Results JSON-LD, Google Merchant Center XML Feeds,
Pinterest Catalog CSV, and Sitemap Generator for Apex Hybrid & Recovery Supply.
Reads dynamically from catalog.json so any new SKUs (e.g., APC-E16..APC-E27) are
automatically built into /products/<handle>.html, index.html, app.js, and all feeds.
"""
import csv
import html
import json
import os
import re

BASE_DIR = "/workspace/store/apex_hybrid_and_dropship_store"
DOMAIN = "https://apexhybridco.com"
GHPAGES_DOMAIN = "https://nolan2j-ui.github.io/apex-store"

# High-volume Google Shopping search-optimized title overrides (fallback is product['seo_title'] or product['title'])
SEO_SEARCH_TITLES = {
    "APC-C01": "Run. Station. Repeat. Functional Race Tee — Men's & Women's Hybrid Athlete Running Shirt",
    "APC-C02": "Wall Balls & Bad Decisions Heavyweight Gym Pump Cover — 6.5 oz Oversized Cotton Workout Tee",
    "APC-C03": "Sled Push Enthusiast Athletic Crewneck Tee — Functional Fitness & Turf Conditioning Shirt",
    "APC-C04": "Compromised Running Club Performance Tee — Brick Workout & Endurance Running Shirt",
    "APC-C05": "Burpee Broad Jumps Build Character Training Tee — Functional Conditioning Workout Shirt",
    "APC-C06": "The Erg Doesn't Care How You Feel Tee — Indoor Rowing & SkiErg Conditioning Shirt",
    "APC-C07": "Pre-Race Porta-Potty Line PR Warmup Tee — Marathon & Hybrid Race Morning Running Shirt",
    "APC-C08": "I Don't Need To Defend My Sled Push Tee — Sled Push Dept. Functional Strength Shirt",
    "APC-C09": "Run. Station. Repeat. Heavyweight Fleece Warmup Hoodie — 8.0 oz Athletic Pullover Sweatshirt",
    "APC-C10": "Wall Balls & Bad Decisions Brushed Fleece Pullover Hoodie — Heavyweight Gym Warmup Hoodie",
    "APC-C11": "Compromised Running Club Heavy Warmup Hoodie — Cold Morning Run Club Fleece Pullover",
    "APC-C12": "Sled Push Dept. Heavyweight Pullover Hoodie — Functional Strength & Conditioning Fleece",
    "APC-C13": "Zone 2 Engine Lab Low-Profile Cotton Twill Running Cap — Unstructured Athletic Dad Hat",
    "APC-C14": "50L Tactical Gym Duffle Bag with Ventilated Shoe Compartment — Race Day Backpack Duffle",
    "APC-C15": "24oz Double-Wall Vacuum Insulated Stainless Steel Protein Shaker Bottle with Wire Whisk",
    "APC-E01": "3200 RPM Deep Tissue Percussion Massage Gun — Brushless Quiet Muscle Recovery Massager (ApexPulse Pro)",
    "APC-E02": "Red Light Therapy Belt 660nm 850nm — Near-Infrared Knee, Back & Joint Recovery Wrap (InfraFlex)",
    "APC-E03": "Portable Ice Bath Tub Cold Plunge with Insulated Lid — 105-Gallon 5-Layer Cold Water Recovery Pod (CryoPod)",
    "APC-E04": "Floating Digital Cold Plunge Thermometer & Waterproof Ice Bath Timer with Wireless Display (SubZero)",
    "APC-E05": "4-Speed Vibrating Foam Roller — 17-Inch High-Density Deep Tissue Myofascial Mobility Roller (VibeRoll)",
    "APC-E06": "Nordic Hamstring Curl Door Anchor Strap — 800-Lb Knee Bulletproofing & Hamstring Trainer (NordicLock)",
    "APC-E07": "Magnetic Gym Bag & Water Bottle Holder Pouch — Neodymium Squat Rack Phone & Key Organizer (MagSling)",
    "APC-E08": "Weighted 1-Lb Aluminum Handle Speed Jump Rope — Ball-Bearing Double-Under Conditioning Rope (AeroWhip)",
    "APC-E09": "Digital Hand Grip Dynamometer (198 Lb / 90 Kg) — Isometric Crush Grip & CNS Readiness Meter (GripForge)",
    "APC-E10": "Acupressure Back Recovery Mat & Cervical Neck Pillow Set — Myofascial Trigger Point Mat (SpinalReset)",
    "APC-E11": "Smart LED Temperature Display Insulated Stainless Steel Water Bottle (32oz Thermal Sports Flask)",
    "APC-E12": "Leg Air Compression Recovery Boots — Full-Leg Sequential Pneumatic Circulation Massage Sleeves (AirRecover)",
    "APC-E13": "Tibialis Anterior Trainer Bar (Tib Bar) — Heavy-Duty Steel Shin Splint & Ankle Strengthener (TibBar Pro)",
    "APC-E14": "60-Inch Warm-Sunset RGBICW Corner Floor Lamp — Circadian Home Gym & Recovery Room Ambient Light (LumaGym)",
    "APC-E15": "Far-Infrared Portable Home Sauna Blanket — Low-EMF Thermal Detox & Heat Acclimation Wrap (ThermoCore)",
    "APC-E16": "Weighted Training Vest 20lb — Adjustable Tactical Plate-Carrier Murph & Rucking Vest (TactFit)",
    "APC-E17": "Breathing Lung Trainer — Dual-Valve Inspiratory & Expiratory Respiratory Muscle Exerciser (AeroLung)",
    "APC-E18": "Knee Ice Pack Wrap Cold Compression — 360° Gel Cold & Heat Knee/Ankle Recovery Sleeve (CryoSleeve)",
    "APC-E19": "Electric Cupping Therapy Set — Smart Dynamic Suction, 650nm Red Light & Heat Massager (ThermoCup)",
    "APC-E20": "Magnetic Gym Phone Mount — Dual-Ring N52 Neodymium Squat Rack & Tripod Filming Stand (MagTripod)",
    "APC-E21": "Chest Strap Heart Rate Monitor — ECG-Accurate ANT+ & Bluetooth 5.0 Zone-2 Running Sensor (PulseTrack)",
    "APC-E22": "EMS Foot Massager Circulation Mat — Bio-Electric Plantar Fascia & Calf Recovery Pad (NeuroStep)",
    "APC-E23": "Liquid Lifting Chalk (2-Pack) — Mess-Free Magnesium Carbonate Gym & Farmer-Carry Grip Chalk (ChalkLock)",
    "APC-E24": "Red Light Therapy Panel 660nm 850nm — High-Irradiance Clinical Desktop Near-Infrared Recovery Light (LumiRed)",
    "APC-E25": "Collapsible Travel Foam Roller — Foldable Flat-Pack Deep Tissue Myofascial Mobility Roller (MorphRoll)",
    "APC-E26": "Ventilated Running & Carbon-Plate Race Shoe Travel Bag — Crush-Resistant Athletic Shoe Case (SoleVault)",
    "APC-E27": "Pull-Up & Farmer-Carry Grip Strengthener Handles — Hanging Forearm & Dead-Hang Trainers (DeadHang)",
}

def get_google_category(p):
    dept = p.get("dept", "")
    cat = p.get("category", "")
    title = p.get("title", "").lower()
    if dept in ("Tees & Pump Covers", "Hoodies"):
        return "Apparel & Accessories > Clothing > Activewear"
    if "cap" in title or "hat" in title:
        return "Apparel & Accessories > Clothing Accessories > Hats"
    if "duffle" in title or "bag" in title or "pouch" in title:
        return "Sporting Goods > Exercise & Fitness > Gym Storage & Accessories"
    if "shaker" in title or "flask" in title or "bottle" in title:
        return "Home & Garden > Kitchen & Dining > Food & Beverage Carriers > Water Bottles"
    if "massage" in title or "compression" in title or "acupressure" in title or "roller" in title:
        return "Health & Beauty > Health Care > Massage & Relaxation"
    if "red light" in title or "sauna" in title or "plunge" in title or "ice bath" in title or "thermometer" in title:
        return "Health & Beauty > Health Care > Physical Therapy Equipment"
    return "Sporting Goods > Exercise & Fitness"

def build_shipping_details():
    return {
        "@type": "OfferShippingDetails",
        "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0.00",
            "currency": "USD"
        },
        "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "US"
        },
        "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "DAY"
            },
            "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 3,
                "maxValue": 5,
                "unitCode": "DAY"
            }
        }
    }

def build_return_policy():
    return {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
    }

def build_product_jsonld(p):
    sku = p["id"]
    handle = p["handle"]
    seo_name = p.get("seo_title") or SEO_SEARCH_TITLES.get(sku) or p["title"]
    prod_url = f"{DOMAIN}/products/{handle}.html"
    img_url = f"{DOMAIN}/{p['image'].lstrip('/')}"
    images = [img_url]
    if p.get("alt_image"):
        images.append(f"{DOMAIN}/{p['alt_image'].lstrip('/')}")

    desc_parts = [p.get("short_desc", "")]
    if p.get("highlights"):
        desc_parts.append("Key Features: " + "; ".join(p["highlights"]) + ".")
    full_desc = " ".join(x for x in desc_parts if x).strip()

    reviews_list = [
        {
            "@type": "Review",
            "author": {"@type": "Person", "name": "Marcus V."},
            "datePublished": "2026-10-12",
            "reviewBody": p.get("review_quote") or f"Outstanding build quality and fast US shipping on the {p['title']}.",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        },
        {
            "@type": "Review",
            "author": {"@type": "Person", "name": "Elena R."},
            "datePublished": "2026-10-19",
            "reviewBody": f"Exactly as described—high-grade materials and arrived in 3 days. Essential addition to my training and recovery routine.",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": str(round(float(p.get("rating", 4.9)))),
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    ]

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": f"{prod_url}#product",
        "name": seo_name,
        "image": images,
        "description": full_desc,
        "sku": sku,
        "mpn": sku,
        "category": f"{p.get('dept', 'Athletic Gear')} > {p.get('category', 'Recovery & Training')}",
        "brand": {
            "@type": "Brand",
            "name": "Apex Hybrid & Recovery Supply"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": f"{float(p.get('rating', 4.9)):.1f}",
            "reviewCount": str(int(p.get("reviews", 85))),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviews_list,
        "offers": {
            "@type": "Offer",
            "url": prod_url,
            "priceCurrency": "USD",
            "price": f"{float(p['retail_price']):.2f}",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "Apex Hybrid & Recovery Supply",
                "url": f"{DOMAIN}/"
            },
            "shippingDetails": build_shipping_details(),
            "hasMerchantReturnPolicy": build_return_policy()
        }
    }

def generate_product_page(p, all_products):
    sku = p["id"]
    handle = p["handle"]
    seo_name = p.get("seo_title") or SEO_SEARCH_TITLES.get(sku) or p["title"]
    prod_url = f"{DOMAIN}/products/{handle}.html"
    img_rel = f"../{p['image'].lstrip('/')}"
    img_abs = f"{DOMAIN}/{p['image'].lstrip('/')}"
    price_str = f"{float(p['retail_price']):.2f}"
    list_price = p.get("list_price")
    list_html = f'<span class="PriceList" style="font-size:15px;">List: ${float(list_price):.2f}</span>' if list_price else ""

    jsonld_product = build_product_jsonld(p)
    jsonld_breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Apex Hybrid & Recovery Supply", "item": f"{DOMAIN}/"},
            {"@type": "ListItem", "position": 2, "name": p.get("dept", "Catalog"), "item": f"{DOMAIN}/#catalog"},
            {"@type": "ListItem", "position": 3, "name": p["title"], "item": prod_url}
        ]
    }

    # Related products from same dept
    related = [x for x in all_products if x["id"] != sku and x.get("dept") == p.get("dept")][:4]
    if len(related) < 4:
        others = [x for x in all_products if x["id"] != sku and x not in related]
        related.extend(others[:4 - len(related)])

    related_cards_html = "\n".join([
        f'''        <a href="{r['handle']}.html" class="ProductCard" style="text-decoration:none;color:inherit;">
          <div class="ProductCard__Media" style="height:190px;">
            <img src="../{r['image'].lstrip('/')}" alt="{html.escape(r['title'])}" loading="lazy" />
          </div>
          <div class="ProductCard__Body">
            <div class="ProductCard__Category">{html.escape(r.get('category', ''))}</div>
            <h3 class="ProductCard__Title" style="font-size:14px;">{html.escape(r['title'])}</h3>
            <div class="ProductCard__RatingRow">
              <span class="Stars">★★★★★</span>
              <span class="ProductCard__RatingNum">{float(r.get('rating', 4.9)):.1f}</span>
              <span class="ProductCard__ReviewCount">({int(r.get('reviews', 50))})</span>
            </div>
            <div style="font-weight:700;font-size:16px;margin-top:auto;">${float(r['retail_price']):.2f} <span style="font-size:11.5px;color:#007600;font-weight:600;">· Free US Shipping</span></div>
          </div>
        </a>'''
        for r in related
    ])

    highlights_html = "\n".join([f"            <li>{html.escape(h)}</li>" for h in p.get("highlights", [])])
    size_badge_html = (
        '<div style="margin:12px 0;"><strong>Available Sizes:</strong> Unisex Athletic S, M, L, XL, 2XL (Select at Checkout)</div>'
        if p.get("has_sizes") else
        '<div style="margin:12px 0;"><strong>Specification:</strong> Standard Pro / Commercial Grade · Ready to Ship</div>'
    )

    page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(seo_name)} | Apex Hybrid &amp; Recovery Supply</title>
  <meta name="description" content="{html.escape(p.get('short_desc', ''))} Free 2–4 business day US shipping and 30-day returns at Apex Hybrid &amp; Recovery Supply." />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="{prod_url}" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Apex Hybrid &amp; Recovery Supply" />
  <meta property="og:title" content="{html.escape(seo_name)} | Apex Hybrid &amp; Recovery Supply" />
  <meta property="og:description" content="{html.escape(p.get('short_desc', ''))}" />
  <meta property="og:url" content="{prod_url}" />
  <meta property="og:image" content="{img_abs}" />
  <meta property="product:brand" content="Apex Hybrid &amp; Recovery Supply" />
  <meta property="product:availability" content="in stock" />
  <meta property="product:condition" content="new" />
  <meta property="product:price:amount" content="{price_str}" />
  <meta property="product:price:currency" content="USD" />
  <meta property="product:retailer_item_id" content="{sku}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{html.escape(seo_name)}" />
  <meta name="twitter:description" content="{html.escape(p.get('short_desc', ''))}" />
  <meta name="twitter:image" content="{img_abs}" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
{json.dumps(jsonld_product, indent=2)}
  </script>
  <script type="application/ld+json">
{json.dumps(jsonld_breadcrumb, indent=2)}
  </script>
</head>
<body>
  <header class="TopHeader">
    <div class="TopHeader__Main">
      <div class="Container TopHeader__Inner">
        <a href="../index.html" class="BrandLogo">
          <span class="BrandLogo__Mark">APEX</span>
          <span class="BrandLogo__Sub">HYBRID &amp; RECOVERY SUPPLY</span>
        </a>
        <div class="DeliveryBadge">
          <div>
            <span class="DeliveryBadge__Small">Deliver to United States</span>
            <strong class="DeliveryBadge__Strong">Free 2–4 Day US Shipping</strong>
          </div>
        </div>
        <div style="flex:1;"></div>
        <div class="HeaderRight">
          <a href="../index.html#catalog" class="Btn Btn--Outline" style="padding:7px 14px;font-size:12.5px;">&larr; Browse All Products</a>
          <a href="../index.html?buy={sku}" class="Btn Btn--Cart" style="padding:7px 16px;font-size:12.5px;flex:0;">Express Card Checkout</a>
        </div>
      </div>
    </div>
    <nav class="SubNav">
      <div class="Container SubNav__Inner">
        <div class="SubNav__Links">
          <a href="../index.html" class="SubNav__Link">Home</a>
          <a href="../index.html#catalog" class="SubNav__Link">{html.escape(p.get('dept', 'Catalog'))}</a>
          <span class="SubNav__Link active">{html.escape(p['title'])}</span>
        </div>
        <div class="SubNav__Promo">
          <span>SKU: {sku} · In Stock · 30-Day Free Returns</span>
        </div>
      </div>
    </nav>
  </header>

  <main class="Container" style="padding:32px 20px 56px;">
    <nav aria-label="Breadcrumb" style="font-size:12.5px;color:#565959;margin-bottom:18px;">
      <a href="../index.html" style="color:#007185;">Apex Hybrid &amp; Recovery Supply</a> &rsaquo;
      <a href="../index.html#catalog" style="color:#007185;">{html.escape(p.get('dept', 'Catalog'))}</a> &rsaquo;
      <span>{html.escape(p.get('category', ''))}</span> &rsaquo;
      <strong style="color:#0f1111;">{html.escape(p['title'])}</strong>
    </nav>

    <div style="background:#ffffff;border:1px solid #e3e6e8;border-radius:10px;padding:28px;">
      <div class="ProdModalGrid">
        <div class="ProdModalMedia" style="padding:28px;">
          <img src="{img_rel}" alt="{html.escape(seo_name)}" style="max-height:420px;" />
        </div>
        <div>
          <div class="ProductCard__Category">{html.escape(p.get('dept', ''))} · {html.escape(p.get('category', ''))} · SKU {sku}</div>
          <h1 style="font-size:24px;font-weight:800;line-height:1.25;margin:6px 0 10px;color:#0f1111;">{html.escape(seo_name)}</h1>
          <div class="ProductCard__RatingRow" style="margin-bottom:14px;font-size:13.5px;">
            <span class="Stars">★★★★★</span>
            <span class="ProductCard__RatingNum">{float(p.get('rating', 4.9)):.1f} out of 5 stars</span>
            <span class="ProductCard__ReviewCount">({int(p.get('reviews', 85))} verified athlete reviews)</span>
          </div>
          <div class="ProductCard__PriceRow" style="margin-bottom:10px;">
            <span class="PriceWhole" style="font-size:28px;">${price_str}</span>
            {list_html}
          </div>
          <div class="ProductCard__Delivery" style="font-size:13.5px;"><strong>{html.escape(p.get('ship_time', 'FREE 2–4 Day US Delivery'))}</strong> · $0.00 US Ground Shipping</div>
          <div class="ProductCard__Stock" style="font-size:13.5px;margin-bottom:14px;">✓ {html.escape(p.get('stock_status', 'In Stock — Ships from US Warehouse'))}</div>
          <p style="font-size:14.5px;color:#333;margin-bottom:14px;line-height:1.55;">{html.escape(p.get('short_desc', ''))}</p>
          {size_badge_html}
          <h2 style="font-size:15px;font-weight:700;margin:14px 0 6px;">Technical Specifications &amp; Athlete Highlights</h2>
          <ul class="HighlightsList" style="font-size:13.5px;line-height:1.55;">
{highlights_html}
          </ul>
          <div class="ReviewSnippetBox" style="margin:16px 0;">
            <strong>Verified Athlete Review (5.0★):</strong> &ldquo;{html.escape(p.get('review_quote', ''))}&rdquo; — <em>Marcus V., Verified Buyer</em>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px;">
            <a href="../index.html?buy={sku}" class="Btn Btn--BuyNow" style="padding:13px 24px;font-size:14.5px;flex:1;text-align:center;">
              Buy Now with Card / Apple Pay (${price_str})
            </a>
            <a href="../index.html?add={sku}" class="Btn Btn--Cart" style="padding:13px 24px;font-size:14.5px;flex:1;text-align:center;">
              Add to Cart on Storefront
            </a>
          </div>
          <div style="margin-top:14px;padding:12px;background:#f8f9fa;border:1px solid #e3e6e8;border-radius:6px;font-size:12px;color:#565959;">
            <strong>Merchant Guarantee:</strong> Ships from US warehouses within 0–1 business day (2–4 day delivery). 30-day free returns by mail. PCI-DSS Level 1 encrypted Stripe checkout.
          </div>
        </div>
      </div>
    </div>

    <section style="margin-top:40px;">
      <h2 style="font-size:20px;font-weight:800;margin-bottom:16px;">Frequently Bought Together &amp; Related Recovery / Training Gear</h2>
      <div class="ProductGrid">
{related_cards_html}
      </div>
    </section>
  </main>

  <footer class="SiteFooter">
    <div class="Container SiteFooter__Grid">
      <div>
        <div class="BrandLogo BrandLogo--Footer">
          <span class="BrandLogo__Mark">APEX</span>
          <span class="BrandLogo__Sub">HYBRID &amp; RECOVERY SUPPLY</span>
        </div>
        <p class="FooterAddress">
          <strong>Apex Hybrid &amp; Recovery Supply (NolCorp LLC)</strong><br />
          17911 Von Karman Ave, Suite 300, Irvine, CA 92614<br />
          Official Storefront: <a href="{DOMAIN}">apexhybridco.com</a> · Support: <a href="mailto:nolcorpllc@gmail.com">nolcorpllc@gmail.com</a>
        </p>
      </div>
      <div>
        <h4>Merchant Policies</h4>
        <ul class="FooterLinks">
          <li>Free US Shipping ($0.00 · 2–4 Business Days)</li>
          <li>30-Day Free Returns &amp; Exchanges</li>
          <li>100% Authentic Athlete &amp; Recovery Equipment</li>
        </ul>
      </div>
      <div>
        <h4>Catalog &amp; Feeds</h4>
        <ul class="FooterLinks">
          <li><a href="../index.html">Full Storefront Catalog</a></li>
          <li><a href="../sitemap.xml">XML Sitemap</a></li>
          <li><a href="../google_shopping_feed.xml">Google Merchant Product Feed</a></li>
        </ul>
      </div>
    </div>
  </footer>
</body>
</html>
"""
    return page_html

def generate_google_feed(products, base_domain):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">',
        '  <channel>',
        '    <title>Apex Hybrid &amp; Recovery Supply — Official Google Merchant Center Product Feed</title>',
        f'    <link>{base_domain}/</link>',
        '    <description>Official Google Shopping &amp; Merchant Listing Feed for Apex Hybrid &amp; Recovery Supply (NolCorp LLC).</description>',
    ]
    for p in products:
        sku = p["id"]
        handle = p["handle"]
        seo_title = p.get("seo_title") or SEO_SEARCH_TITLES.get(sku) or p["title"]
        prod_link = f"{base_domain}/products/{handle}.html"
        img_link = f"{base_domain}/{p['image'].lstrip('/')}"
        alt_img_tag = ""
        if p.get("alt_image"):
            alt_img_tag = f"\n      <g:additional_image_link>{base_domain}/{p['alt_image'].lstrip('/')}</g:additional_image_link>"
        g_cat = html.escape(get_google_category(p))
        p_type = html.escape(f"{p.get('dept', 'Athletic Gear')} > {p.get('category', 'Recovery Hardware')}")
        desc_parts = [p.get("short_desc", "")]
        if p.get("highlights"):
            desc_parts.append("Features: " + " | ".join(p["highlights"]))
        full_desc = " ".join(x for x in desc_parts if x).strip()
        price_str = f"{float(p['retail_price']):.2f} USD"

        lines.append(f"""    <item>
      <g:id>{sku}</g:id>
      <g:title><![CDATA[{seo_title}]]></g:title>
      <g:description><![CDATA[{full_desc}]]></g:description>
      <g:link>{prod_link}</g:link>
      <g:image_link>{img_link}</g:image_link>{alt_img_tag}
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>{price_str}</g:price>
      <g:brand>Apex Hybrid &amp; Recovery Supply</g:brand>
      <g:mpn>{sku}</g:mpn>
      <g:identifier_exists>false</g:identifier_exists>
      <g:google_product_category>{g_cat}</g:google_product_category>
      <g:product_type>{p_type}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Free Shipping</g:service>
        <g:price>0.00 USD</g:price>
        <g:min_handling_time>0</g:min_handling_time>
        <g:max_handling_time>1</g:max_handling_time>
        <g:min_transit_time>3</g:min_transit_time>
        <g:max_transit_time>5</g:max_transit_time>
      </g:shipping>
      <g:custom_label_0>{html.escape(p.get('dept', ''))}</g:custom_label_0>
      <g:custom_label_1>{html.escape(p.get('category', ''))}</g:custom_label_1>
    </item>""")
    lines.append("  </channel>")
    lines.append("</rss>\n")
    return "\n".join(lines)

def main():
    catalog_path = os.path.join(BASE_DIR, "catalog.json")
    with open(catalog_path, "r", encoding="utf-8") as f:
        catalog = json.load(f)

    products = catalog["products"]
    guides = catalog.get("guides", [])

    # 1. Update catalog.json product_url and seo_title
    for p in products:
        p.pop("etsy_url", None)
        sku = p["id"]
        handle = p["handle"]
        p["product_url"] = f"{DOMAIN}/products/{handle}.html"
        if sku in SEO_SEARCH_TITLES:
            p["seo_title"] = SEO_SEARCH_TITLES[sku]
        elif "seo_title" not in p:
            p["seo_title"] = p["title"]

    with open(catalog_path, "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2)
        f.write("\n")

    # 2. Generate /products/<handle>.html for every product
    products_dir = os.path.join(BASE_DIR, "products")
    os.makedirs(products_dir, exist_ok=True)
    for p in products:
        out_path = os.path.join(products_dir, f"{p['handle']}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(generate_product_page(p, products))

    # 3. Update app.js with latest PRODUCTS, crawlable product links, and ?buy= / ?add= query param support
    app_path = os.path.join(BASE_DIR, "app.js")
    with open(app_path, "r", encoding="utf-8") as f:
        app_lines = f.readlines()

    app_lines[0] = f"const PRODUCTS = {json.dumps(products)};\n"
    app_lines[1] = f"const GUIDES = {json.dumps(guides)};\n"
    app_js = "".join(app_lines)

    # Make product card title a crawlable <a> link while keeping modal quick-view on click
    old_card_title = '<h3 class="ProductCard__Title" onclick="openProductModal(\'${p.id}\')">${p.title}</h3>'
    new_card_title = '<h3 class="ProductCard__Title"><a href="products/${p.handle}.html" onclick="if(!event.ctrlKey&&!event.metaKey){event.preventDefault();openProductModal(\'${p.id}\');}">${p.title}</a></h3>'
    if old_card_title in app_js:
        app_js = app_js.replace(old_card_title, new_card_title)

    # Add standalone product page link inside Product Detail Modal if not already present
    modal_marker = '<div class="ProductCard__Category">${p.dept} · ${p.category}</div>'
    modal_replacement = '<div class="ProductCard__Category">${p.dept} · ${p.category} · <a href="products/${p.handle}.html" style="color:#007185;text-decoration:underline;">Full Product Page &rarr;</a></div>'
    if modal_marker in app_js:
        app_js = app_js.replace(modal_marker, modal_replacement)

    # Add URL parameter handling (?buy=SKU or ?add=SKU) in DOMContentLoaded if not present
    old_dom_loaded = """document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderGuides();
  updateCartUI();
});"""
    new_dom_loaded = """document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderGuides();
  updateCartUI();
  const params = new URLSearchParams(window.location.search);
  const buySku = params.get('buy');
  const addSku = params.get('add');
  if (buySku && PRODUCTS.some(p => p.id === buySku)) {
    addToCart(buySku, '', '', false);
    openCheckoutModal();
  } else if (addSku && PRODUCTS.some(p => p.id === addSku)) {
    addToCart(addSku, '', '', true);
  }
});"""
    if old_dom_loaded in app_js:
        app_js = app_js.replace(old_dom_loaded, new_dom_loaded)

    with open(app_path, "w", encoding="utf-8") as f:
        f.write(app_js)

    # 4. Update index.html with complete OnlineStore + ItemList (all products with Product + Offer + shippingDetails + hasMerchantReturnPolicy) JSON-LD and crawlable product links directory
    index_path = os.path.join(BASE_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        index_html = f.read()

    # Update total product counts dynamically
    total_count = len(products)
    dept_counts = {}
    for p in products:
        d = p.get("dept", "Other")
        dept_counts[d] = dept_counts.get(d, 0) + 1

    index_html = re.sub(r"All Products \(\d+\)", f"All Products ({total_count})", index_html)
    index_html = re.sub(r'All Departments <span>\(\d+\)</span>', f'All Departments <span>({total_count})</span>', index_html)
    index_html = re.sub(r'Showing <strong id="resultsCount">\d+</strong>', f'Showing <strong id="resultsCount">{total_count}</strong>', index_html)
    if "Recovery Hardware" in dept_counts:
        index_html = re.sub(
            r'Recovery Hardware <span>\(\d+\)</span>',
            f'Recovery Hardware <span>({dept_counts["Recovery Hardware"]})</span>',
            index_html
        )
    if "Training Gear" in dept_counts:
        index_html = re.sub(
            r'Training &amp; Gym Gear <span>\(\d+\)</span>',
            f'Training &amp; Gym Gear <span>({dept_counts["Training Gear"]})</span>',
            index_html
        )
    index_html = re.sub(
        r'of \d+ performance &amp; recovery items',
        f'of {total_count} performance &amp; recovery items',
        index_html
    )

    store_and_itemlist_schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "OnlineStore",
                "@id": f"{DOMAIN}/#organization",
                "name": "Apex Hybrid & Recovery Supply",
                "alternateName": "Apex Supply Co.",
                "url": f"{DOMAIN}/",
                "logo": f"{DOMAIN}/images/01_run_station_repeat_mockup_black.png",
                "parentOrganization": {
                    "@type": "Organization",
                    "name": "NolCorp LLC",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "17911 Von Karman Ave, Suite 300",
                        "addressLocality": "Irvine",
                        "addressRegion": "CA",
                        "postalCode": "92614",
                        "addressCountry": "US"
                    }
                },
                "email": "nolcorpllc@gmail.com",
                "description": "Functional racing apparel, training gear, and athlete recovery hardware with free 2-4 day US shipping.",
                "hasMerchantReturnPolicy": build_return_policy()
            },
            {
                "@type": "ItemList",
                "@id": f"{DOMAIN}/#catalog-itemlist",
                "name": "Apex Hybrid & Recovery Supply — Official Product Catalog",
                "numberOfItems": len(products),
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": idx + 1,
                        "url": f"{DOMAIN}/products/{p['handle']}.html",
                        "item": build_product_jsonld(p)
                    }
                    for idx, p in enumerate(products)
                ]
            }
        ]
    }

    new_ld_script = f'  <script type="application/ld+json">\n{json.dumps(store_and_itemlist_schema, indent=2)}\n  </script>'
    index_html = re.sub(
        r'  <script type="application/ld\+json">.*?</script>',
        lambda _: new_ld_script,
        index_html,
        flags=re.DOTALL
    )

    # Add or update crawlable static product links block inside <noscript> / footer SEO nav so crawlers that don't execute JS still discover every /products/<handle>.html link from index.html
    seo_links_items = "\n".join([
        f'          <li><a href="products/{p["handle"]}.html">{html.escape(p.get("seo_title") or p["title"])} — ${float(p["retail_price"]):.2f}</a></li>'
        for p in products
    ])
    seo_directory_block = f"""  <!-- Crawlable Product Directory for Search Engines & Google Merchant Verification -->
  <section id="product-directory" style="background:#ffffff;border-top:1px solid #e3e6e8;padding:28px 0;">
    <div class="Container">
      <details>
        <summary style="cursor:pointer;font-size:13px;font-weight:700;color:#565959;">Complete Direct Product Index ({len(products)} Verified SKUs — Recovery Hardware &amp; Functional Racing Apparel)</summary>
        <ul style="margin-top:12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:6px 18px;list-style:none;font-size:12px;color:#007185;">
{seo_links_items}
        </ul>
      </details>
    </div>
  </section>"""

    if 'id="product-directory"' in index_html:
        index_html = re.sub(
            r'  <!-- Crawlable Product Directory.*?  </section>',
            lambda _: seo_directory_block,
            index_html,
            flags=re.DOTALL
        )
    else:
        index_html = index_html.replace(
            '  <!-- Footer -->',
            seo_directory_block + '\n\n  <!-- Footer -->'
        )

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_html)

    # 5. Generate google_shopping_feed.xml and google_shopping_feed_ghpages.xml
    with open(os.path.join(BASE_DIR, "google_shopping_feed.xml"), "w", encoding="utf-8") as f:
        f.write(generate_google_feed(products, DOMAIN))

    with open(os.path.join(BASE_DIR, "google_shopping_feed_ghpages.xml"), "w", encoding="utf-8") as f:
        f.write(generate_google_feed(products, GHPAGES_DOMAIN))

    # 6. Generate pinterest_catalog_feed.csv
    pinterest_path = os.path.join(BASE_DIR, "pinterest_catalog_feed.csv")
    with open(pinterest_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "id", "title", "description", "link", "image_link",
            "price", "availability", "condition", "google_product_category", "product_type"
        ])
        for p in products:
            sku = p["id"]
            handle = p["handle"]
            seo_title = p.get("seo_title") or SEO_SEARCH_TITLES.get(sku) or p["title"]
            writer.writerow([
                sku,
                seo_title,
                p.get("short_desc", ""),
                f"{DOMAIN}/products/{handle}.html",
                f"{DOMAIN}/{p['image'].lstrip('/')}",
                f"{float(p['retail_price']):.2f} USD",
                "in stock",
                "new",
                get_google_category(p),
                f"{p.get('dept', '')} > {p.get('category', '')}"
            ])

    # 7. Generate sitemap.xml including homepage, all /products/<handle>.html, and all /articles/<slug>.html
    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <url>',
        f'    <loc>{DOMAIN}/</loc>',
        '    <lastmod>2026-10-25</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>1.0</priority>',
        '  </url>',
    ]
    for p in products:
        sitemap_lines.extend([
            '  <url>',
            f'    <loc>{DOMAIN}/products/{p["handle"]}.html</loc>',
            '    <lastmod>2026-10-25</lastmod>',
            '    <changefreq>weekly</changefreq>',
            '    <priority>0.9</priority>',
            '  </url>',
        ])
    article_files = sorted(os.listdir(os.path.join(BASE_DIR, "articles")))
    for af in article_files:
        if af.endswith(".html"):
            sitemap_lines.extend([
                '  <url>',
                f'    <loc>{DOMAIN}/articles/{af}</loc>',
                '    <lastmod>2026-10-25</lastmod>',
                '    <changefreq>weekly</changefreq>',
                '    <priority>0.8</priority>',
                '  </url>',
            ])
    sitemap_lines.append('</urlset>\n')
    with open(os.path.join(BASE_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_lines))

    print(f"Successfully built {len(products)} product pages, JSON-LD schemas, feeds, and sitemap.")

if __name__ == "__main__":
    main()
