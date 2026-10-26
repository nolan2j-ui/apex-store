#!/usr/bin/env python3
"""
Builds the complete SEO & Organic Traffic Architecture for Apex Hybrid & Recovery Supply:
1. 68 Static Product Landing Pages (/products/<handle>.html) with JSON-LD Product, Offer, AggregateRating, and BreadcrumbList schema + Nominative Fair-Use HYROX Compatibility SEO.
2. 16 High-Intent SEO Blog / Guide Pages (/articles/<slug>.html) with Article & FAQPage JSON-LD schema and internal product links.
3. Google Merchant Center RSS 2.0 XML Product Feed (/google_shopping_feed.xml) for Free Google Shopping Tab listings.
4. Pinterest / Meta Catalog CSV Feed (/pinterest_catalog_feed.csv).
5. Full XML Sitemap (/sitemap.xml), robots.txt (/robots.txt), and IndexNow verification key.
6. Injects crawlable static HTML product cards, guide links, and JSON-LD Store/ItemList/FAQPage schema directly into index.html (with ZERO item count tallies in navigation).
"""

import csv
import html
import json
import os
import re
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_URL = "https://www.apexhybridco.com"
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")
INDEXNOW_KEY = "a8f9d2e4c7b14f6093e5d8c2a1b4e7f0"

with open(os.path.join(BASE_DIR, "catalog.json"), "r", encoding="utf-8") as f:
    catalog = json.load(f)

products = catalog["products"]
guides = catalog["guides"]
product_by_id = {p["id"]: p for p in products}

os.makedirs(os.path.join(BASE_DIR, "products"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "articles"), exist_ok=True)


def google_category_for(prod):
    dept = prod.get("dept", "")
    if dept in ("Tees & Pump Covers", "Breathable Tech Shirts", "Race City Editions", "Muscle Tanks"):
        return "Apparel & Accessories > Clothing > Shirts & Tops"
    if dept == "Hoodies":
        return "Apparel & Accessories > Clothing > Activewear > Sweatshirts & Hoodies"
    if dept == "Lightweight Jackets":
        return "Apparel & Accessories > Clothing > Outerwear > Coats & Jackets"
    if dept == "Training Gear":
        return "Sporting Goods > Exercise & Fitness"
    return "Health & Beauty > Health Care > Massage & Relaxation"


def generate_product_pages():
    for prod in products:
        handle = prod["handle"]
        title = prod["title"]
        seo_title = prod.get("seo_title", f"{title} — HYROX® & Hybrid Race Gear")
        price = f"{prod['retail_price']:.2f}"
        list_price = f"{(prod.get('list_price') or prod['retail_price']):.2f}"
        img_url = f"{SITE_URL}/{prod['image']}"
        canonical = f"{SITE_URL}/products/{handle}.html"
        short_desc = prod["short_desc"]
        highlights = prod.get("highlights", [])
        dept = prod["dept"]

        related = [p for p in products if p["dept"] == dept and p["id"] != prod["id"]][:4]
        if len(related) < 4:
            related += [p for p in products if p["id"] != prod["id"] and p not in related][: (4 - len(related))]

        json_ld = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE_URL}/"},
                        {"@type": "ListItem", "position": 2, "name": dept, "item": f"{SITE_URL}/?dept={html.escape(dept)}"},
                        {"@type": "ListItem", "position": 3, "name": title, "item": canonical},
                    ],
                },
                {
                    "@type": "Product",
                    "@id": f"{canonical}#product",
                    "name": seo_title,
                    "sku": prod["id"],
                    "mpn": prod["id"],
                    "image": [img_url] + ([f"{SITE_URL}/{prod['alt_image']}"] if prod.get("alt_image") else []),
                    "description": short_desc + " " + " ".join(highlights),
                    "keywords": f"HYROX shirts, breathable HYROX race shirt, {title}, {dept}, hybrid athlete apparel, 8-station functional fitness gear",
                    "brand": {"@type": "Brand", "name": "Apex Hybrid & Recovery Supply"},
                    "category": dept,
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": str(prod["rating"]),
                        "reviewCount": str(prod["reviews"]),
                        "bestRating": "5",
                        "worstRating": "1",
                    },
                    "review": [
                        {
                            "@type": "Review",
                            "author": {"@type": "Person", "name": "Verified Hybrid Athlete"},
                            "datePublished": "2026-10-01",
                            "reviewBody": prod.get("review_quote", "Built for high-output hybrid training and fast recovery."),
                            "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                        }
                    ],
                    "offers": {
                        "@type": "Offer",
                        "url": canonical,
                        "priceCurrency": "USD",
                        "price": price,
                        "priceValidUntil": "2027-12-31",
                        "availability": "https://schema.org/InStock",
                        "itemCondition": "https://schema.org/NewCondition",
                        "seller": {"@type": "Organization", "name": "Apex Hybrid & Recovery Supply"},
                        "shippingDetails": {
                            "@type": "OfferShippingDetails",
                            "shippingRate": {"@type": "MonetaryAmount", "value": "0.00", "currency": "USD"},
                            "shippingDestination": {"@type": "DefinedRegion", "addressCountry": "US"},
                            "deliveryTime": {
                                "@type": "ShippingDeliveryTime",
                                "handlingTime": {"@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY"},
                                "transitTime": {"@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "DAY"},
                            },
                        },
                        "hasMerchantReturnPolicy": {
                            "@type": "MerchantReturnPolicy",
                            "applicableCountry": "US",
                            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                            "merchantReturnDays": 30,
                            "returnMethod": "https://schema.org/ReturnByMail",
                            "returnFees": "https://schema.org/FreeReturn",
                        },
                    },
                },
            ],
        }

        highlights_html = "\n".join(f"<li>{html.escape(h)}</li>" for h in highlights)
        related_html = "\n".join(
            f"""
            <a href="/products/{r['handle']}.html" class="ProductCard" style="text-decoration:none; color:inherit;">
              <div class="ProductCard__Media" style="height:180px;">
                <img src="../{r['image']}" alt="{html.escape(r['title'])}" loading="lazy" />
              </div>
              <div class="ProductCard__Body">
                <div class="ProductCard__Category">{html.escape(r['category'])}</div>
                <div class="ProductCard__Title" style="font-size:14px;">{html.escape(r['title'])}</div>
                <div class="ProductCard__PriceRow">
                  <span class="PriceWhole" style="font-size:18px;">${r['retail_price']:.2f}</span>
                  <span class="PriceList">${(r.get('list_price') or r['retail_price']):.2f}</span>
                </div>
              </div>
            </a>
            """
            for r in related
        )

        is_fw = str(prod.get("id", "")).startswith("APC-C") or prod.get("fulfillment_partner") == "Fourthwall"
        if is_fw:
            fw_blank = html.escape(prod.get("fourthwall_blank") or "Premium Athletic Blank")
            fw_url = prod.get("fourthwall_product_url") or prod.get("checkout_url") or f"../index.html?buy={prod['id']}&fulfillment=fourthwall"
            fulfillment_line = f'<div style="font-size:12.5px; color:#0f172a; font-weight:700; margin-top:6px; background:#f1f5f9; padding:8px 10px; border-radius:6px; border-left:3px solid #2563eb;">✓ Fulfilled via Fourthwall US · {fw_blank} · <a href="{html.escape(fw_url)}" style="color:#2563eb;text-decoration:underline;">Instant Fourthwall Checkout →</a></div>'
            buy_href = fw_url
            top_buy_label = f"Buy via Fourthwall (${price})"
            main_buy_label = "Buy Now · Fourthwall Checkout"
        else:
            fulfillment_line = f'<div style="font-size:12.5px; color:#0f172a; font-weight:700; margin-top:6px; background:#f0fdf4; padding:8px 10px; border-radius:6px; border-left:3px solid #16a34a;">✓ US Warehouse Direct Wholesale (CA/TX/NJ) · Direct Stripe Checkout · ID: {html.escape(prod.get("stripe_price_id") or "")}</div>'
            buy_href = f"../index.html?buy={prod['id']}"
            top_buy_label = f"Quick Checkout (${price})"
            main_buy_label = "Instant Stripe Checkout"

        page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(seo_title)} | Apex Hybrid &amp; Recovery Supply</title>
  <meta name="description" content="{html.escape(short_desc)} Free US Ground Shipping &amp; 30-Day Returns at Apex Hybrid Co." />
  <meta name="keywords" content="hyrox shirts, breathable hyrox shirt, {html.escape(title)}, {html.escape(prod['category'])}, {html.escape(dept)}, hybrid athlete gear, functional fitness recovery" />
  <link rel="canonical" href="{canonical}" />
  <meta property="og:type" content="product" />
  <meta property="og:title" content="{html.escape(seo_title)} | Apex Hybrid Co." />
  <meta property="og:description" content="{html.escape(short_desc)}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="{img_url}" />
  <meta property="og:site_name" content="Apex Hybrid Co." />
  <meta property="product:price:amount" content="{price}" />
  <meta property="product:price:currency" content="USD" />
  <meta property="product:availability" content="in stock" />
  <meta property="og:availability" content="instock" />
  <meta property="product:condition" content="new" />
  <meta property="product:brand" content="Apex Hybrid Co." />
  <meta property="product:retailer_item_id" content="{prod['id']}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{html.escape(seo_title)}" />
  <meta name="twitter:description" content="{html.escape(short_desc)}" />
  <meta name="twitter:image" content="{img_url}" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
{json.dumps(json_ld, indent=2)}
  </script>
</head>
<body>
  <header class="TopHeader">
    <div class="TopHeader__Main">
      <div class="Container TopHeader__Inner">
        <a href="../index.html" class="BrandLogo">
          <span class="BrandLogo__Mark">APEX</span>
          <span class="BrandLogo__Sub">HYBRID &amp; RECOVERY CO.</span>
        </a>
        <div style="margin-left:auto; display:flex; gap:14px; align-items:center;">
          <a href="../index.html" style="color:#fff; font-size:13px; font-weight:700;">← Back to Full Catalog &amp; News Hub</a>
          <a href="{buy_href}" class="Btn Btn--BuyNow" style="width:auto; padding:8px 16px;">{top_buy_label}</a>
        </div>
      </div>
    </div>
  </header>

  <main class="Container" style="padding:28px 20px 60px;">
    <nav aria-label="Breadcrumb" style="font-size:12.5px; color:#555; margin-bottom:18px;">
      <a href="../index.html" style="color:#ff4d1c; font-weight:700;">Home</a> ›
      <a href="../index.html?dept={html.escape(dept)}" style="color:#ff4d1c; font-weight:700;">{html.escape(dept)}</a> ›
      <span>{html.escape(title)}</span>
    </nav>

    <div class="ProdModalGrid" style="background:#fff; border:1px solid #e4e6eb; border-radius:12px; padding:28px;">
      <div class="ProdModalMedia" style="display:flex; flex-direction:column; gap:12px;">
        <img id="staticMainProdImg" src="../{prod['image']}" alt="{html.escape(seo_title)}" style="width:100%; border-radius:10px; object-fit:contain; max-height:480px; background:#0b0f17;" />
        {f'''<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button type="button" onclick="document.getElementById('staticMainProdImg').src='../{prod['image']}'" style="cursor:pointer; border:2px solid #ff4d1c; border-radius:8px; padding:6px; background:#0f172a; color:#fff; display:flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px;">
            <img src="../{prod['image']}" alt="{html.escape(title)} — Primary View" style="width:48px; height:48px; object-fit:cover; border-radius:4px;" />
            <span>1. Black Edition (Front Crest)</span>
          </button>
          <button type="button" onclick="document.getElementById('staticMainProdImg').src='../{prod['alt_image']}'" style="cursor:pointer; border:2px solid #cbd5e1; border-radius:8px; padding:6px; background:#f8fafc; color:#0f172a; display:flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px;">
            <img src="../{prod['alt_image']}" alt="{html.escape(title)} — Bone Edition View" style="width:48px; height:48px; object-fit:cover; border-radius:4px;" />
            <span>2. Bone / White Edition</span>
          </button>
        </div>''' if prod.get("alt_image") else ""}
      </div>
      <div>
        <div style="font-size:11.5px; font-weight:800; color:#ff4d1c; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;">
          {html.escape(dept)} · {html.escape(prod['category'])} · SKU {prod['id']}
        </div>
        <h1 style="font-size:24px; line-height:1.25; margin-bottom:10px;">{html.escape(title)}</h1>
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; margin-bottom:12px;">
          <span class="Stars">★★★★★</span>
          <strong>{prod['rating']} out of 5</strong>
          <span style="color:#525866;">({prod['reviews']} verified athlete reviews)</span>
        </div>
        <div style="padding:12px 0; border-top:1px solid #eee; border-bottom:1px solid #eee; margin-bottom:16px;">
          <div style="display:flex; align-items:baseline; gap:10px;">
            <span style="font-size:28px; font-weight:900;">${price}</span>
            <span style="font-size:14px; color:#525866; text-decoration:line-through;">List: ${list_price}</span>
          </div>
          <div style="font-size:13px; color:#0e8345; font-weight:700; margin-top:4px;">
            ✓ {html.escape(prod['stock_status'])} · {html.escape(prod['ship_time'])}
          </div>
          {fulfillment_line}
        </div>
        <p style="font-size:14.5px; color:#222; line-height:1.6; margin-bottom:14px;">{html.escape(short_desc)}</p>
        <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:0.05em; color:#444; margin-bottom:6px;">Key Performance Specifications</h2>
        <ul class="HighlightsList">
          {highlights_html}
        </ul>
        <div class="ReviewSnippetBox">
          <strong>★★★★★ Verified HYROX® &amp; Hybrid Athlete Review:</strong><br/>
          “{html.escape(prod.get('review_quote', ''))}”
        </div>
        <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
          <a href="../index.html?add={prod['id']}" class="Btn Btn--Cart" style="padding:13px 22px; font-size:14px; text-align:center;">Add to Bag — ${price}</a>
          <a href="{buy_href}" class="Btn Btn--BuyNow" style="padding:13px 22px; font-size:14px; text-align:center;">{main_buy_label}</a>
        </div>
      </div>
    </div>

    <section style="margin-top:42px;">
      <h2 style="font-size:20px; margin-bottom:16px;">Frequently Paired {html.escape(dept)} &amp; HYROX® Prep Gear</h2>
      <div class="ProductGrid">
        {related_html}
      </div>
    </section>

    <section style="margin-top:36px; background:#fff; border:1px solid #e4e6eb; border-radius:12px; padding:24px;">
      <h2 style="font-size:18px; margin-bottom:12px;">Related HYROX® Training, Pacing &amp; Recovery Buyer Guides</h2>
      <ul style="padding-left:20px; line-height:1.9; font-size:14px;">
        {chr(10).join(
            f'<li><a href="../articles/{g["slug"]}.html" style="color:#ff4d1c; font-weight:700;">{html.escape(g["title"])}</a> — <span style="color:#475569;">{html.escape(g["category"])} ({html.escape(g["read_time"])})</span></li>'
            for g in (
                [x for x in guides if prod["id"] in x.get("recommended_skus", [])]
                + [x for x in guides if prod["id"] not in x.get("recommended_skus", [])]
            )[:6]
        )}
      </ul>
    </section>
  </main>

  <footer class="SiteFooter">
    <div class="Container">
      <p><strong>Apex Hybrid &amp; Recovery Supply (Apex Hybrid Co.)</strong> · 8420 Spectrum, Irvine, CA 92618 · Support: <a href="mailto:apexhybridco@gmail.com" style="color:#ff6a3d;">apexhybridco@gmail.com</a> · 24/7 AI Concierge: <a href="tel:+19498054935" style="color:#ff6a3d;">(949) 805-4935</a> · <a href="../index.html" style="color:#ff6a3d;">Return to Storefront</a></p>
      <p style="font-size:11.5px; color:#94a3b8; margin-top:8px;">Apex Hybrid &amp; Recovery Supply is an independent athletic &amp; recovery brand engineered for athletes competing in HYROX®, DEKA®, CrossFit®, and functional fitness events. Not affiliated with or endorsed by HYROX World GmbH.</p>
    </div>
  </footer>
  <script>
  (function(){{
    try {{
      if (/bot|crawl|spider|slurp|headless|lighthouse/i.test(navigator.userAgent || "")) return;
      var ns = "https://abacus.jasoncameron.dev/hit/apexhybridco.com";
      var hit = function(k){{ fetch(ns + "/" + k, {{method:"GET", mode:"cors", keepalive:true, cache:"no-store"}}).catch(function(){{}}); }};
      hit("pageviews_total");
      hit("product_views_total");
      hit("view_{prod['id']}");
      document.addEventListener("click", function(e){{
        var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;
        var h = a.getAttribute("href") || "";
        if (h.indexOf("buy=") !== -1 || h.indexOf("fourthwall.com") !== -1) {{ hit("checkout_clicks_total"); hit("checkout_{prod['id']}"); }}
        else if (h.indexOf("add=") !== -1) {{ hit("cart_add_total"); hit("cart_add_{prod['id']}"); }}
      }});
    }} catch (_) {{}}
  }})();
  </script>
</body>
</html>
"""
        with open(os.path.join(BASE_DIR, "products", f"{handle}.html"), "w", encoding="utf-8") as out:
            out.write(page_html)


def generate_article_pages():
    for art in guides:
        slug = art["slug"]
        title = art["title"]
        cat = art["category"]
        summary = art["summary"]
        canonical = f"{SITE_URL}/articles/{slug}.html"
        rec_skus = art.get("recommended_skus", [])
        rec_products = [product_by_id[s] for s in rec_skus if s in product_by_id]
        if not rec_products:
            rec_products = [product_by_id[s] for s in ("APC-C36", "APC-C42", "APC-E01", "APC-E12") if s in product_by_id]

        hero_prod = rec_products[0]
        hero_img = f"{SITE_URL}/{hero_prod['image']}"
        faqs = art.get("faqs", [
            (
                f"What is the top-rated gear for {cat}?",
                f"Our highest-rated choices are {hero_prod['title']} (${hero_prod['retail_price']:.2f}, SKU {hero_prod['id']}) alongside our AeroMesh™ Laser-Vented Tech Shirt (APC-C36, $36) and Apex AeroShell™ Lightweight Warmup Jacket (APC-C42, $64)—all shipping free in 2–4 business days."
            ),
            (
                "How do I get 15% off Doubles or multi-item race orders?",
                "Add any 2 or more items to your bag at Apex Hybrid & Recovery Supply and apply code HURRY15 (or HYROX15) at checkout for 15% off plus Free 2–4 Day US Shipping and 30-Day Free Returns."
            )
        ])

        json_ld = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Article",
                    "headline": title,
                    "description": summary,
                    "image": hero_img,
                    "author": {"@type": "Organization", "name": "Apex Hybrid Performance Lab"},
                    "publisher": {
                        "@type": "Organization",
                        "name": "Apex Hybrid & Recovery Supply",
                        "logo": {"@type": "ImageObject", "url": f"{SITE_URL}/images/27_aeromesh_tech_tee_black.png"},
                    },
                    "datePublished": "2026-10-20",
                    "dateModified": TODAY,
                    "mainEntityOfPage": canonical,
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": q,
                            "acceptedAnswer": {"@type": "Answer", "text": a},
                        }
                        for q, a in faqs
                    ],
                },
                {
                    "@type": "ItemList",
                    "name": f"Recommended Gear — {title}",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": idx + 1,
                            "item": {
                                "@type": "Product",
                                "name": p["title"],
                                "sku": p["id"],
                                "image": f"{SITE_URL}/{p['image']}",
                                "url": f"{SITE_URL}/products/{p['handle']}.html",
                                "offers": {
                                    "@type": "Offer",
                                    "priceCurrency": "USD",
                                    "price": f"{p['retail_price']:.2f}",
                                    "availability": "https://schema.org/InStock",
                                    "url": f"{SITE_URL}/?buy={p['id']}",
                                },
                            },
                        }
                        for idx, p in enumerate(rec_products)
                    ],
                },
            ],
        }

        top_strip_pills = "\n".join(
            f"""          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:#1e293b;padding:10px 14px;border-radius:8px;border:1px solid #334155;">
            <div style="min-width:0;">
              <a href="../products/{p['handle']}.html" style="color:#fff;font-weight:800;font-size:13.5px;text-decoration:none;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{html.escape(p['title'])}</a>
              <span style="color:#94a3b8;font-size:12px;">SKU {p['id']} · ★ {p['rating']} · Free 2–4 Day US Shipping</span>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
              <a href="{p.get('fourthwall_product_url') or ('../index.html?buy=' + p['id'])}" class="Btn Btn--BuyNow" style="width:auto;padding:7px 12px;font-size:12.5px;font-weight:800;background:#ff4d1c;color:#fff;border-radius:6px;text-decoration:none;">Buy Now — ${p['retail_price']:.2f} (Free Shipping)</a>
              <a href="../index.html?add={p['id']}" class="Btn Btn--Cart" style="width:auto;padding:7px 10px;font-size:12px;font-weight:700;background:#334155;color:#fff;border-radius:6px;text-decoration:none;">+ Add to Bag</a>
            </div>
          </div>"""
            for p in rec_products[:3]
        )

        rec_html = "\n".join(
            f"""
            <article class="ProductCard" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <a href="../products/{p['handle']}.html" class="ProductCard__Media" style="height:185px;display:block;">
                  <img src="../{p['image']}" alt="{html.escape(p['title'])}" loading="lazy" />
                </a>
                <div class="ProductCard__Body">
                  <div class="ProductCard__Category">{html.escape(p['category'])} · SKU {p['id']}</div>
                  <div class="ProductCard__Title" style="font-size:14.5px;font-weight:800;">
                    <a href="../products/{p['handle']}.html" style="color:inherit;text-decoration:none;">{html.escape(p['title'])}</a>
                  </div>
                  <div class="ProductCard__PriceRow" style="margin:6px 0;">
                    <span class="PriceWhole" style="font-size:19px;font-weight:900;">${p['retail_price']:.2f}</span>
                    <span class="PriceList" style="color:#64748b;text-decoration:line-through;font-size:13px;">${(p.get('list_price') or p['retail_price']):.2f}</span>
                  </div>
                  <div style="font-size:12px;color:#0e8345;font-weight:700;margin-bottom:8px;">✓ In Stock · Free 2–4 Day US Shipping</div>
                </div>
              </div>
              <div style="padding:0 14px 14px;display:flex;flex-direction:column;gap:6px;">
                <a href="{p.get('fourthwall_product_url') or ('../index.html?buy=' + p['id'])}" class="Btn Btn--BuyNow" style="text-align:center;padding:10px 12px;font-weight:800;font-size:13px;background:#ff4d1c;color:#fff;border-radius:7px;text-decoration:none;">Buy Now — ${p['retail_price']:.2f} (Free Shipping)</a>
                <div style="display:flex;gap:6px;">
                  <a href="../index.html?add={p['id']}" class="Btn Btn--Cart" style="flex:1;text-align:center;padding:8px;font-size:12.5px;background:#0f172a;color:#fff;border-radius:6px;text-decoration:none;">+ Add to Bag</a>
                  <a href="../products/{p['handle']}.html" class="Btn Btn--QuickView" style="padding:8px 10px;font-size:12.5px;border:1px solid #cbd5e1;border-radius:6px;text-decoration:none;color:#0f172a;font-weight:700;">Specs</a>
                </div>
              </div>
            </article>
            """
            for p in rec_products
        )

        other_articles_html = "\n".join(
            f'<li><a href="{a["slug"]}.html" style="color:#ff4d1c; font-weight:700;">{html.escape(a["title"])}</a> <span style="color:#666;">({a["read_time"]})</span></li>'
            for a in guides
            if a["slug"] != slug
        )

        page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(title)} | Apex Hybrid &amp; Recovery Supply</title>
  <meta name="description" content="{html.escape(summary)}" />
  <meta name="keywords" content="hyrox shirts, breathable hyrox shirt, lightweight warmup jacket, {html.escape(cat)}, hybrid athlete guide, functional race prep, cold plunge recovery" />
  <link rel="canonical" href="{canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{html.escape(title)}" />
  <meta property="og:description" content="{html.escape(summary)}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="{hero_img}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{html.escape(title)}" />
  <meta name="twitter:description" content="{html.escape(summary)}" />
  <meta name="twitter:image" content="{hero_img}" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
{json.dumps(json_ld, indent=2)}
  </script>
</head>
<body>
  <header class="TopHeader">
    <div class="TopHeader__Main">
      <div class="Container TopHeader__Inner">
        <a href="../index.html" class="BrandLogo">
          <span class="BrandLogo__Mark">APEX</span>
          <span class="BrandLogo__Sub">HYBRID &amp; RECOVERY CO.</span>
        </a>
        <div style="margin-left:auto; display:flex; gap:14px; align-items:center; flex-wrap:wrap;">
          <a href="../index.html#articles" style="color:#fff; font-size:13px; font-weight:700;">← All Buyer Guides</a>
          <a href="tel:+19498054935" style="color:#cbd5e1; font-size:12.5px; font-weight:700; text-decoration:none;">24/7 Athlete Line: (949) 805-4935</a>
          <a href="{hero_prod.get('fourthwall_product_url') or ('../index.html?buy=' + hero_prod['id'])}" class="Btn Btn--BuyNow" style="width:auto; padding:8px 16px;">1-Click Buy Top Pick (${hero_prod['retail_price']:.2f})</a>
        </div>
      </div>
    </div>
  </header>

  <main class="Container" style="max-width:980px; padding:28px 20px 64px;">
    <article style="background:#fff; border:1px solid #e4e6eb; border-radius:12px; padding:32px;">
      <div class="ArticleEyebrow">{html.escape(cat)} · {html.escape(art['read_time'])} · Free 2–4 Day US Shipping</div>
      <h1 style="font-size:28px; line-height:1.22; margin:8px 0 14px;">{html.escape(title)}</h1>
      <p style="font-size:16px; color:#444; border-left:3px solid #ff4d1c; padding-left:14px; margin-bottom:20px;">
        {html.escape(summary)}
      </p>

      <!-- Top Quick-Buy Express Checkout Strip -->
      <section aria-label="Express 1-Click Checkout" style="background:#0f172a;color:#fff;padding:16px 18px;border-radius:10px;margin-bottom:26px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
          <span style="font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;color:#ff6a3d;">⚡ Featured Gear In This Guide — Instant 1-Click Checkout</span>
          <span style="font-size:12px;color:#cbd5e1;">Bundle 2+ Items: Use Code <strong style="color:#fff;">HURRY15</strong> for 15% Off + Free US Shipping</span>
        </div>
        <div style="display:grid;gap:8px;">
{top_strip_pills}
        </div>
      </section>

      <div class="Modal__ArticleBody" style="font-size:15px; line-height:1.7;">
        {art['body_html']}
      </div>

      <section style="margin-top:32px; padding-top:24px; border-top:1px solid #e4e6eb;">
        <h2 style="font-size:20px; margin-bottom:6px;">Shop Featured HYROX® Race Apparel &amp; Recovery Hardware (1-Click Checkout)</h2>
        <p style="font-size:13.5px; color:#475569; margin-bottom:16px;">Every order ships Free in 2–4 Business Days from our US warehouses (CA, TX, East Coast) with 30-Day Free Returns &amp; Exchanges.</p>
        <div class="ProductGrid">
          {rec_html}
        </div>
      </section>

      <section style="margin-top:32px; padding-top:20px; border-top:1px solid #e4e6eb;">
        <h3 style="font-size:16px; margin-bottom:10px;">More Hybrid Training, Race-City &amp; Buyer Guides</h3>
        <ul style="padding-left:20px; line-height:1.8; font-size:14px;">
          {other_articles_html}
        </ul>
      </section>
    </article>
  </main>

  <footer class="SiteFooter">
    <div class="Container">
      <p><strong>Apex Hybrid &amp; Recovery Supply (Apex Hybrid Co.)</strong> · 8420 Spectrum, Irvine, CA 92618 · Support: <a href="mailto:apexhybridco@gmail.com" style="color:#ff6a3d;">apexhybridco@gmail.com</a> · 24/7 AI Concierge: <a href="tel:+19498054935" style="color:#ff6a3d;">(949) 805-4935</a> · <a href="../index.html" style="color:#ff6a3d;">Shop All 72 Products</a></p>
    </div>
  </footer>
  <script>
  (function(){{
    try {{
      if (/bot|crawl|spider|slurp|headless|lighthouse/i.test(navigator.userAgent || "")) return;
      var ns = "https://abacus.jasoncameron.dev/hit/apexhybridco.com";
      var hit = function(k){{ fetch(ns + "/" + k, {{method:"GET", mode:"cors", keepalive:true, cache:"no-store"}}).catch(function(){{}}); }};
      hit("pageviews_total");
      hit("article_views_total");
      document.addEventListener("click", function(e){{
        var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;
        var h = a.getAttribute("href") || "";
        if (h.indexOf("buy=") !== -1 || h.indexOf("fourthwall.com") !== -1) hit("checkout_clicks_total");
        else if (h.indexOf("add=") !== -1) hit("cart_add_total");
      }});
    }} catch (_) {{}}
  }})();
  </script>
</body>
</html>
"""
        with open(os.path.join(BASE_DIR, "articles", f"{slug}.html"), "w", encoding="utf-8") as out:
            out.write(page_html)
        city_page_path = os.path.join(BASE_DIR, "seo_city_pages", f"{slug}.html")
        if os.path.exists(city_page_path) or any(k in slug for k in ("chicago", "dallas", "anaheim", "las-vegas", "miami", "new-york", "nyc", "first-hyrox", "pump-cover", "compromised-running-shirt", "sled-push-enthusiast")):
            with open(city_page_path, "w", encoding="utf-8") as out_city:
                out_city.write(page_html)

    # Also generate articles/index.html hub page
    hub_cards = "\n".join(
        f'''        <article class="GuideCard" style="background:#fff; border:1px solid #e4e6eb; border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="GuideCard__Cat" style="font-size:11.5px; font-weight:800; color:#ff4d1c; text-transform:uppercase; margin-bottom:6px;">{html.escape(g["category"])}</div>
            <h2 style="font-size:17px; line-height:1.35; margin-bottom:8px;"><a href="{g["slug"]}.html" style="color:#0f172a; text-decoration:none;">{html.escape(g["title"])}</a></h2>
            <p style="font-size:13.5px; color:#475569; line-height:1.55;">{html.escape(g["summary"])}</p>
          </div>
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid #f1f5f9;">
            <span style="font-size:12px; color:#64748b; font-weight:700;">{html.escape(g["read_time"])}</span>
            <a href="{g["slug"]}.html" class="Btn Btn--QuickView" style="width:auto; padding:6px 14px; text-decoration:none;">Read Guide →</a>
          </div>
        </article>'''
        for g in guides
    )
    hub_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HYROX® Training, Pacing, Race-City &amp; Recovery Buyer Guides ({len(guides)} Guides) | Apex Hybrid Co.</title>
  <meta name="description" content="Explore all {len(guides)} data-backed HYROX® &amp; hybrid athlete training protocols, start-corral warmup guides, 1km pacing strategies, 2026/2027 race-city guides, and recovery blueprints." />
  <link rel="canonical" href="{SITE_URL}/articles/index.html" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <header class="TopHeader">
    <div class="TopHeader__Main">
      <div class="Container TopHeader__Inner">
        <a href="../index.html" class="BrandLogo">
          <span class="BrandLogo__Mark">APEX</span>
          <span class="BrandLogo__Sub">HYBRID &amp; RECOVERY CO.</span>
        </a>
        <div style="margin-left:auto; display:flex; gap:14px; align-items:center;">
          <a href="../index.html" style="color:#fff; font-size:13px; font-weight:700;">← Back to Full 72-Product Storefront</a>
        </div>
      </div>
    </div>
  </header>
  <main class="Container" style="padding:32px 20px 64px;">
    <h1 style="font-size:28px; margin-bottom:8px;">HYROX® &amp; Hybrid Athlete Training, Pacing &amp; Recovery Hub ({len(guides)} Guides)</h1>
    <p style="font-size:15px; color:#475569; margin-bottom:24px;">Station-by-station pacing calculators, start-corral warmup protocols, 2026/2027 race-city gear checklists, and 48-hour post-race recovery blueprints.</p>
    <div class="GuidesGrid">
{hub_cards}
    </div>
  </main>
  <footer class="SiteFooter">
    <div class="Container">
      <p><strong>Apex Hybrid &amp; Recovery Supply (Apex Hybrid Co.)</strong> · <a href="../index.html" style="color:#ff6a3d;">Return to Storefront</a></p>
    </div>
  </footer>
  <script>
  (function(){{
    try {{
      if (/bot|crawl|spider|slurp|headless|lighthouse/i.test(navigator.userAgent || "")) return;
      var ns = "https://abacus.jasoncameron.dev/hit/apexhybridco.com";
      fetch(ns + "/pageviews_total", {{method:"GET", mode:"cors", keepalive:true, cache:"no-store"}}).catch(function(){{}});
      fetch(ns + "/article_views_total", {{method:"GET", mode:"cors", keepalive:true, cache:"no-store"}}).catch(function(){{}});
    }} catch (_) {{}}
  }})();
  </script>
</body>
</html>'''
    with open(os.path.join(BASE_DIR, "articles", "index.html"), "w", encoding="utf-8") as out:
        out.write(hub_html)


def generate_google_shopping_feed():
    items_xml = []
    for prod in products:
        link = f"{SITE_URL}/products/{prod['handle']}.html"
        img_link = f"{SITE_URL}/{prod['image']}"
        price = f"{prod['retail_price']:.2f} USD"
        sale_price = f"{prod['retail_price']:.2f} USD"
        list_price = f"{(prod.get('list_price') or prod['retail_price']):.2f} USD"
        g_cat = google_category_for(prod)
        feed_title = prod.get("seo_title", prod["title"])

        items_xml.append(
            f"""    <item>
      <g:id>{html.escape(prod['id'])}</g:id>
      <g:title>{html.escape(feed_title)}</g:title>
      <g:description>{html.escape(prod['short_desc'])}</g:description>
      <g:link>{link}</g:link>
      <g:image_link>{img_link}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>{list_price}</g:price>
      <g:sale_price>{sale_price}</g:sale_price>
      <g:brand>Apex Hybrid &amp; Recovery Supply</g:brand>
      <g:mpn>{html.escape(prod['id'])}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>{html.escape(g_cat)}</g:google_product_category>
      <g:product_type>{html.escape(prod['dept'])} &gt; {html.escape(prod['category'])}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Ground</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>"""
        )

    rss_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Apex Hybrid &amp; Recovery Supply — HYROX Shirts, Breathable Race Apparel &amp; Recovery Feed</title>
    <link>{SITE_URL}</link>
    <description>Official Google Merchant Center product feed for Apex Hybrid &amp; Recovery Supply (www.apexhybridco.com) — HYROX shirts, breathable tech tees, 2026/2027 race-city shirts, and recovery hardware.</description>
{chr(10).join(items_xml)}
  </channel>
</rss>
"""
    with open(os.path.join(BASE_DIR, "google_shopping_feed.xml"), "w", encoding="utf-8") as f:
        f.write(rss_xml)
    with open(os.path.join(BASE_DIR, "google_merchant_feed.xml"), "w", encoding="utf-8") as f:
        f.write(rss_xml)



def generate_editorial_rss_feeds():
    """
    Generates standards-compliant RSS 2.0 + Atom + WebSub hub feeds (feed.xml and rss.xml)
    containing all 30 buyer guides and top product releases for RSS aggregators, WebSub hubs,
    and search crawler feed discovery.
    """
    pub_rfc822 = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")
    for filename in ("feed.xml", "rss.xml"):
        self_url = f"{SITE_URL}/{filename}"
        items_xml = []
        for art in guides:
            art_url = f"{SITE_URL}/articles/{art['slug']}.html"
            items_xml.append(
                f"""    <item>
      <title>{html.escape(art['title'])}</title>
      <link>{art_url}</link>
      <guid isPermaLink="true">{art_url}</guid>
      <pubDate>{pub_rfc822}</pubDate>
      <category>{html.escape(art.get('category', 'HYROX & Hybrid Racing Guide'))}</category>
      <description>{html.escape(art.get('summary', ''))}</description>
    </item>"""
            )
        for prod in products:
            prod_url = f"{SITE_URL}/products/{prod['handle']}.html"
            fw_url = prod.get("fourthwall_product_url") or prod.get("checkout_url") or f"{SITE_URL}/?buy={prod['id']}"
            desc = f"{prod['short_desc']} — Price: ${prod['retail_price']:.2f} USD ({prod['ship_time']}). Direct Checkout: {fw_url}"
            items_xml.append(
                f"""    <item>
      <title>{html.escape(prod.get('seo_title', prod['title']))} (${prod['retail_price']:.2f})</title>
      <link>{prod_url}</link>
      <guid isPermaLink="true">{prod_url}</guid>
      <pubDate>{pub_rfc822}</pubDate>
      <category>{html.escape(prod.get('dept', 'Hybrid Race Gear'))}</category>
      <description>{html.escape(desc)}</description>
    </item>"""
            )

        feed_doc = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Apex Hybrid Co. — HYROX® Race Streetwear, Breathable Tech Shirts, Buyer Guides &amp; Recovery Hardware</title>
    <link>{SITE_URL}/</link>
    <description>Official RSS 2.0 &amp; WebSub feed for Apex Hybrid Co. ({SITE_URL}) — 30 data-backed HYROX® &amp; hybrid racing buyer guides, 2026/2027 race-city apparel (Chicago, Dallas, Anaheim, Las Vegas, Miami, NYC), and 72 performance &amp; recovery products.</description>
    <language>en-us</language>
    <lastBuildDate>{pub_rfc822}</lastBuildDate>
    <managingEditor>apexhybridco@gmail.com (Apex Hybrid Co.)</managingEditor>
    <webMaster>apexhybridco@gmail.com (Apex Hybrid Co.)</webMaster>
    <atom:link href="{self_url}" rel="self" type="application/rss+xml" />
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
    <atom:link href="https://pubsubhubbub.superfeedr.com/" rel="hub" />
{chr(10).join(items_xml)}
  </channel>
</rss>
"""
        with open(os.path.join(BASE_DIR, filename), "w", encoding="utf-8") as f:
            f.write(feed_doc)


def generate_pinterest_csv_feed():
    csv_path = os.path.join(BASE_DIR, "pinterest_catalog_feed.csv")
    fieldnames = [
        "id",
        "title",
        "description",
        "link",
        "image_link",
        "price",
        "sale_price",
        "availability",
        "condition",
        "google_product_category",
        "product_type",
        "brand",
    ]
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for prod in products:
            writer.writerow(
                {
                    "id": prod["id"],
                    "title": prod.get("seo_title", prod["title"]),
                    "description": prod["short_desc"],
                    "link": f"{SITE_URL}/products/{prod['handle']}.html",
                    "image_link": f"{SITE_URL}/{prod['image']}",
                    "price": f"{(prod.get('list_price') or prod['retail_price']):.2f} USD",
                    "sale_price": f"{prod['retail_price']:.2f} USD",
                    "availability": "in stock",
                    "condition": "new",
                    "google_product_category": google_category_for(prod),
                    "product_type": f"{prod['dept']} > {prod['category']}",
                    "brand": "Apex Hybrid & Recovery Supply",
                }
            )


def generate_sitemap_and_robots():
    urls = [
        (f"{SITE_URL}/", "1.0", "daily"),
        (f"{SITE_URL}/team_orders.html", "0.95", "daily"),
        (f"{SITE_URL}/articles/index.html", "0.9", "daily"),
    ]
    city_dir = os.path.join(BASE_DIR, "seo_city_pages")
    if os.path.isdir(city_dir):
        for fn in sorted(os.listdir(city_dir)):
            if fn.endswith(".html"):
                urls.append((f"{SITE_URL}/seo_city_pages/{fn}", "0.9", "weekly"))
    for art in guides:
        urls.append((f"{SITE_URL}/articles/{art['slug']}.html", "0.9", "weekly"))
    for prod in products:
        urls.append((f"{SITE_URL}/products/{prod['handle']}.html", "0.8", "weekly"))

    url_entries = "\n".join(
        f"""  <url>
    <loc>{u}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>"""
        for u, prio, freq in urls
    )

    sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{url_entries}
</urlset>
"""
    with open(os.path.join(BASE_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_xml)

    robots_txt = f"""User-agent: *
Allow: /

# Explicitly allow AI Search & Answer Engines (ChatGPT Search, Perplexity, Grok, Claude, Google, Bing)
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: {SITE_URL}/sitemap.xml
"""
    with open(os.path.join(BASE_DIR, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(robots_txt)

    with open(os.path.join(BASE_DIR, f"{INDEXNOW_KEY}.txt"), "w", encoding="utf-8") as f:
        f.write(INDEXNOW_KEY)

    # Also generate llms.txt dynamically from products and guides
    llms_lines = [
        "# Apex Hybrid & Recovery Supply (Apex Hybrid Co.)",
        "",
        f"> Official Storefront: {SITE_URL} (also accessible at https://apexhybridco.com and https://nolan2j-ui.github.io/apex-store/)",
        "> Breathable HYROX® race shirts, laser-vented AeroMesh™ tech tees, 2026/2027 race-city shirts (Chicago, Dallas, Anaheim, Miami, Las Vegas, NYC), sleeveless muscle tanks, heavyweight warmup hoodies, lightweight warmup jackets, and clinical-grade athlete recovery hardware with free 2–4 business day US shipping and 30-day free returns.",
        "",
        "## Brand & Merchant Overview",
        "- **Business Name:** Apex Hybrid & Recovery Supply (Apex Hybrid Co.)",
        "- **Headquarters:** 8420 Spectrum, Irvine, CA 92618",
        "- **Support Email:** apexhybridco@gmail.com",
        f"- **Primary Website:** {SITE_URL}/",
        f"- **XML Sitemap:** {SITE_URL}/sitemap.xml",
        f"- **RSS 2.0 & WebSub Editorial Feed:** {SITE_URL}/feed.xml",
        f"- **RSS 2.0 Mirror Feed:** {SITE_URL}/rss.xml",
        f"- **Google Merchant Shopping Feed:** {SITE_URL}/google_shopping_feed.xml",
        f"- **Pinterest Product Catalog Feed:** {SITE_URL}/pinterest_catalog_feed.csv",
        "- **Shipping Policy:** Free US Ground Shipping ($0.00 USD), 0–1 business day handling, 2–5 business day transit from California, Texas, and East Coast US warehouses.",
        "- **Return Policy:** 30-day free returns & exchanges by mail (`https://schema.org/FreeReturn`).",
        "- **Checkout:** Instant PCI-DSS Level 1 Stripe Checkout (Visa, Mastercard, American Express, Discover, Apple Pay).",
        "",
        f"## Complete Product Catalog ({len(products)} Verified In-Stock SKUs)",
        ""
    ]
    by_dept = {}
    for p in products:
        by_dept.setdefault(p["dept"], []).append(p)
    for dept, items in by_dept.items():
        llms_lines.append(f"### {dept} ({len(items)} SKUs)")
        for p in items:
            llms_lines.append(
                f"- [{p['title']}]({SITE_URL}/products/{p['handle']}.html) — **${float(p['retail_price']):.2f} USD** (SKU: `{p['id']}`, Category: {p['category']}, Rating: {p['rating']}★ from {p['reviews']} reviews, {p['ship_time']}). {p['short_desc']}"
            )
        llms_lines.append("")
    llms_lines.append(f"## Athlete Buyer Guides & Training Protocols ({len(guides)} Articles)")
    llms_lines.append("")
    for g in guides:
        llms_lines.append(
            f"- [{g['title']}]({SITE_URL}/articles/{g['slug']}.html) ({g.get('category', 'Guide')} · {g.get('read_time', '5 min read')}): {g.get('summary', '')}"
        )
    llms_lines.append("")
    with open(os.path.join(BASE_DIR, "llms.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(llms_lines))


def inject_static_seo_into_index():
    index_path = os.path.join(BASE_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        index_html = f.read()

    # Build static product cards so search crawlers index all 68 products + links on the homepage
    static_cards = []
    for p in products:
        badge_class = "top-rated" if p["badge"] == "Top Rated" else ("new-release" if p["badge"] == "New Release" else "")
        badge_html = f'<span class="ProductCard__Badge {badge_class}">{html.escape(p["badge"])}</span>' if p["badge"] else ""
        whole = int(p["retail_price"])
        cents = f"{round((p['retail_price'] - whole) * 100):02d}"
        static_cards.append(
            f"""          <article class="ProductCard" data-sku="{p['id']}">
            <div>
              <div class="ProductCard__Media" onclick="openProductModal('{p['id']}')">
                {badge_html}
                <img src="{p['image']}" alt="{html.escape(p.get('seo_title', p['title']))}" loading="lazy" />
              </div>
              <div class="ProductCard__Body">
                <div class="ProductCard__Category">{html.escape(p['category'])}</div>
                <h2 class="ProductCard__Title" onclick="openProductModal('{p['id']}')">
                  <a href="products/{p['handle']}.html" onclick="event.stopPropagation();">{html.escape(p['title'])}</a>
                </h2>
                <div class="ProductCard__RatingRow">
                  <span class="Stars">★★★★★</span>
                  <span class="ProductCard__RatingNum">{p['rating'].__format__('.1f')}</span>
                  <span class="ProductCard__ReviewCount">({p['reviews']})</span>
                </div>
                <div class="ProductCard__PriceRow">
                  <span class="PriceWhole"><sup>$</sup>{whole}<sup>{cents}</sup></span>
                  <span class="PriceList">List: ${(p.get('list_price') or p['retail_price']):.2f}</span>
                </div>
                <div class="ProductCard__Delivery"><strong>{html.escape(p['ship_time'])}</strong></div>
                <div class="ProductCard__Stock">✓ {html.escape(p['stock_status'])}</div>
                <p class="ProductCard__Desc">{html.escape(p['short_desc'])}</p>
              </div>
            </div>
            <div style="padding: 0 16px 16px;">
              <div class="ProductCard__Actions">
                <button class="Btn Btn--Cart" onclick="addToCart('{p['id']}', 1)">Add to Bag</button>
                <a href="products/{p['handle']}.html" class="Btn Btn--QuickView" title="Full Specs">Specs</a>
              </div>
            </div>
          </article>"""
        )

    static_guides = []
    for g in guides:
        static_guides.append(
            f"""        <article class="GuideCard">
          <div>
            <div class="GuideCard__Cat">{html.escape(g['category'])}</div>
            <h3><a href="articles/{g['slug']}.html">{html.escape(g['title'])}</a></h3>
            <p>{html.escape(g['summary'])}</p>
          </div>
          <div class="GuideCard__Footer">
            <span>{html.escape(g['read_time'])}</span>
            <a href="articles/{g['slug']}.html" class="Btn Btn--QuickView" style="width:auto; padding:6px 14px;">Read Full Guide →</a>
          </div>
        </article>"""
        )

    store_schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "OnlineStore",
                "@id": f"{SITE_URL}/#organization",
                "name": "Apex Hybrid & Recovery Supply",
                "url": f"{SITE_URL}/",
                "logo": f"{SITE_URL}/images/27_aeromesh_tech_tee_black.png",
                "description": "Breathable HYROX® race shirts, laser-vented AeroMesh™ tech tees, 2026/2027 race-city shirts (Chicago, Dallas, Anaheim, Miami, Vegas, NYC), sleeveless muscle tanks, and clinical recovery hardware.",
                "telephone": "+1-949-805-4935",
                "email": "apexhybridco@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "8420 Spectrum",
                    "addressLocality": "Irvine",
                    "addressRegion": "CA",
                    "postalCode": "92618",
                    "addressCountry": "US",
                },
            },
            {
                "@type": "WebSite",
                "@id": f"{SITE_URL}/#website",
                "url": f"{SITE_URL}/",
                "name": "Apex Hybrid & Recovery Supply — HYROX Shirts, Breathable Race Apparel & Recovery Lab",
                "publisher": {"@id": f"{SITE_URL}/#organization"},
            },
            {
                "@type": "FAQPage",
                "@id": f"{SITE_URL}/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What are the best breathable HYROX shirts for race day?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Our 4.0 oz AeroMesh™ Laser-Vented Tech Shirt (APC-C36), Dry-Pace™ Threshold Tech Tee (APC-C37), and Sleeveless Winged Crest Muscle Tanks (APC-C28) are engineered specifically for 8-station hybrid racing with laser-perforated shoulder ventilation and flatlock anti-chafe seams."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you carry 2026/2027 HYROX race-city shirts for Chicago, Dallas, Anaheim, Miami, Las Vegas, and New York?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Our Race City Editions collection includes Winged Apex Crest tees for Chicago Navy Pier (APC-C16), Dallas Lone Star Division (APC-C17), Anaheim SoCal (APC-C18), Miami Beach (APC-C19), Las Vegas (APC-C20), and New York Hudson Pier (APC-C21) with free 2–4 day US shipping."
                        }
                    }
                ]
            },
            {
                "@type": "ItemList",
                "name": "Apex Hybrid & Recovery Supply Full Catalog",
                "numberOfItems": len(products),
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": idx + 1,
                        "url": f"{SITE_URL}/products/{p['handle']}.html",
                        "name": p.get("seo_title", p["title"]),
                    }
                    for idx, p in enumerate(products)
                ],
            },
        ],
    }

    index_html = re.sub(
        r'<div class="ProductGrid" id="productGrid">.*?</div>\s*</div>\s*</div>\s*</div>\s*</main>',
        lambda m: f'<div class="ProductGrid" id="productGrid">\n{chr(10).join(static_cards)}\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>',
        index_html,
        flags=re.DOTALL,
    )

    index_html = re.sub(
        r'<div class="GuidesGrid" id="guidesGrid">.*?</div>\s*</div>\s*</section>',
        lambda m: f'<div class="GuidesGrid" id="guidesGrid">\n{chr(10).join(static_guides)}\n      </div>\n    </div>\n  </section>',
        index_html,
        flags=re.DOTALL,
    )

    schema_block = f'  <script type="application/ld+json" id="seoSchemaJsonLd">\n{json.dumps(store_schema, indent=2)}\n  </script>\n</head>'
    if 'id="seoSchemaJsonLd"' in index_html:
        index_html = re.sub(
            r'\s*<script type="application/ld\+json" id="seoSchemaJsonLd">.*?</script>\s*</head>',
            lambda m: "\n" + schema_block,
            index_html,
            flags=re.DOTALL,
        )
    else:
        index_html = index_html.replace("</head>", schema_block)

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_html)


if __name__ == "__main__":
    generate_product_pages()
    generate_article_pages()
    generate_google_shopping_feed()
    generate_editorial_rss_feeds()
    generate_pinterest_csv_feed()
    generate_sitemap_and_robots()
    inject_static_seo_into_index()
    print(f"Successfully generated {len(products)} product pages, {len(guides)} SEO articles, Shopping XML/CSV feeds, and sitemap.xml")
