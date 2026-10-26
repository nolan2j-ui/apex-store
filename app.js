const APPAREL = new Set([
  "Breathable Tech Shirts",
  "Race City Editions",
  "Muscle Tanks",
  "Tees & Pump Covers",
  "Hoodies",
  "Lightweight Jackets",
]);

const PILLS = [
  ["apparel", "All apparel"],
  ["Breathable Tech Shirts", "Breathable Tech Shirts"],
  ["Race City Editions", "Race City Editions"],
  ["Muscle Tanks", "Muscle Tanks"],
  ["Tees & Pump Covers", "Race Tees & Pump Covers"],
  ["Hoodies", "Warmup Hoodies"],
  ["Lightweight Jackets", "Lightweight Jackets"],
  ["Training Gear", "Training Gear"],
  ["Recovery Hardware", "Recovery Hardware"],
];

const CITIES = [
  { sku: "APC-C16", code: "CHI", name: "Chicago", venue: "Navy Pier", when: "November 2026", note: "Fast three-lap hall. Protect run one, then stay tall on the sled carpet.", run: 0.98, sled: 1.02 },
  { sku: "APC-C17", code: "DAL", name: "Dallas", venue: "Kay Bailey Hutchison", when: "November 2026", note: "High-grip sled carpet. Budget extra seconds on the push and the pull.", run: 0.99, sled: 1.1 },
  { sku: "APC-C18", code: "SOC", name: "Anaheim", venue: "SoCal Open", when: "December 2026", note: "Dry indoor air. This is the PR window if the first run stays honest.", run: 0.97, sled: 1 },
  { sku: "APC-C20", code: "LAS", name: "Las Vegas", venue: "Championship turf", when: "February 2027", note: "Qualifier weekend. Even effort beats a hot first station.", run: 1, sled: 1.03 },
  { sku: "APC-C19", code: "MIA", name: "Miami", venue: "Beach convention hall", when: "March 2027", note: "Humidity shows up before station four. Open the run and wear the mesh.", run: 1.05, sled: 1.02 },
  { sku: "APC-C21", code: "NYC", name: "New York", venue: "Hudson Pier", when: "May 2027", note: "Metro lap, tight transitions. The Roxzone is where the clock leaks.", run: 0.99, sled: 1.01 },
];

const STATIONS = [
  ["01", "SkiErg", "skierg", 0.15, false],
  ["02", "Sled Push", "sledPush", 0.12, true],
  ["03", "Sled Pull", "sledPull", 0.12, true],
  ["04", "Burpee Broad Jump", "burpee", 0.13, false],
  ["05", "Row", "row", 0.14, false],
  ["06", "Farmer Carry", "farmer", 0.11, false],
  ["07", "Sandbag Lunges", "lunges", 0.12, false],
  ["08", "Wall Balls", "wall", 0.11, false],
];

let PRODUCTS = [];
let GUIDES = [];
let dept = "apparel";
let sort = "featured";
let query = "";
let cart = [];
let express = null;
const sizeChoice = {};
const colorChoice = {};
let labTab = "calculator";
let activeArticle = null;
let toastTimer = 0;

const $ = (sel) => document.querySelector(sel);
const money = (n) => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function sizeOf(p) {
  return sizeChoice[p.id] || (p.has_sizes ? "L" : "");
}
function colorOf(p) {
  return colorChoice[p.id] || "black";
}
function photoOf(p) {
  if (colorOf(p) === "white" && p.alt_image) return p.alt_image;
  return p.image;
}
function findProduct(sku) {
  return PRODUCTS.find((p) => p.id === sku);
}
function colorLabel(p) {
  if (!p.alt_image) return "";
  return colorOf(p) === "white" ? "Bone" : "Black";
}

function matchesDept(p) {
  if (dept === "apparel") return APPAREL.has(p.dept);
  if (dept === "all") return true;
  return p.dept === dept;
}

function visibleProducts() {
  const q = query.trim().toLowerCase();
  let list = PRODUCTS.filter((p) => {
    if (!q && !matchesDept(p)) return false;
    if (q) {
      const hay = `${p.title} ${p.seo_title || ""} ${p.short_desc || ""} ${p.dept} ${p.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  if (sort === "price-asc") list.sort((a, b) => a.retail_price - b.retail_price);
  else if (sort === "price-desc") list.sort((a, b) => b.retail_price - a.retail_price);
  else if (sort === "rating") list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  return list;
}

function collectionName() {
  if (query.trim()) return "Search";
  const hit = PILLS.find(([id]) => id === dept);
  return hit ? hit[1] : "Apparel";
}

function renderPills() {
  $("#deptPills").innerHTML = PILLS.map(([id, label]) => `
    <button class="Pill" type="button" data-dept="${esc(id)}" aria-pressed="${dept === id && !query ? "true" : "false"}">${esc(label)}</button>
  `).join("");
}

const SHORT = {
  "APC-C36": "AeroMesh™ 4.0",
  "APC-C37": "Dry-Pace™ 1km",
  "APC-C38": "VentTech™ Z4",
  "APC-C39": "Featherweight 3.8",
  "APC-C40": "CoolCore™ Turf",
  "APC-C41": "HyperBreathe™ RX",
  "APC-C16": "Chicago crest",
  "APC-C17": "Dallas turf",
  "APC-C18": "Anaheim open",
  "APC-C19": "Miami heat-block",
  "APC-C20": "Las Vegas qualifier",
  "APC-C21": "New York pier",
  "APC-C28": "Run. Station. Repeat.",
  "APC-C29": "Sled Push Dept.",
  "APC-C30": "1000 Meter Club",
  "APC-C31": "100 Wall Balls",
  "APC-C22": "Zero Excuses",
  "APC-C23": "Roxzone ruined my PR",
  "APC-C24": "Farmer Carry Club",
  "APC-C25": "Sandbag Lunges",
  "APC-C26": "Redline Weekend",
  "APC-C27": "Sub-65 Club",
  "APC-C01": "Run. Station. Repeat.",
  "APC-C02": "Wall Balls & Bad Decisions",
  "APC-C03": "Sled Push Enthusiast",
  "APC-C04": "Kilometer One",
  "APC-C05": "Broad Jumps",
  "APC-C06": "The Erg Doesn't Care",
  "APC-C07": "Wave Call",
  "APC-C08": "Sled Push Dept.",
  "APC-C34": "World Series hoodie",
  "APC-C35": "8-Station Division",
  "APC-C32": "Build Character",
  "APC-C33": "The Erg Doesn't Care",
  "APC-C09": "Warmup fleece",
  "APC-C10": "Bad Decisions hoodie",
  "APC-C11": "Running Club hoodie",
  "APC-C12": "The Footage Speaks",
  "APC-C42": "AeroShell™ Corral Jacket",
  "APC-C43": "08-Station Track Shell",
  "APC-C44": "Pro Quarter-Zip Shell",
  "APC-C45": "World Series Shell",
};

function shortTitle(p) {
  if (SHORT[p.id]) return SHORT[p.id];
  return p.title.split("—")[0].replace(/^["“]|["”]$/g, "").trim();
}

function ratingMarkup(p) {
  const score = Number(p.rating || 0);
  if (!score) return "";
  const full = Math.max(0, Math.min(5, Math.round(score)));
  const stars = `${"★".repeat(full)}${"☆".repeat(5 - full)}`;
  const reviews = p.reviews ? ` · ${p.reviews}` : "";
  return `<p class="Rating"><span class="Stars" aria-hidden="true">${stars}</span><span>${score.toFixed(1)}${reviews}</span></p>`;
}

function renderProducts() {
  const grid = $("#productGrid");
  const list = visibleProducts();
  $("#collectionTitle").textContent = collectionName();
  const count = $("#collectionCount");
  if (count) count.textContent = "";
  renderPills();
  if (!list.length) {
    grid.innerHTML = `<div class="Empty"><p>Nothing in this cut matches that search.</p><button class="Btn Btn--ghost" type="button" data-clear-search="1">Clear search</button></div>`;
    return;
  }
  grid.innerHTML = list.map((p) => {
    const swatches = p.alt_image ? `
      <div class="Swatches Swatches--row">
        <button class="Swatch Swatch--black" type="button" aria-label="Black colorway" data-color="black" data-sku="${p.id}" aria-pressed="${colorOf(p) === "black"}"></button>
        <button class="Swatch Swatch--bone" type="button" aria-label="Bone colorway" data-color="white" data-sku="${p.id}" aria-pressed="${colorOf(p) === "white"}"></button>
      </div>` : "";
    const alt = p.alt_image && colorOf(p) === "black" ? p.alt_image : p.image;
    const hover = p.alt_image ? `<img class="Card__img Card__img--b" src="${esc(alt)}" alt="" loading="lazy" decoding="async" width="1000" height="1280" />` : "";
    const was = p.list_price && p.list_price > p.retail_price ? `<s>${money(p.list_price)}</s>` : "";
    const badge = p.badge ? `<span class="Badge">${esc(p.badge)}</span>` : "";
    const sizes = p.has_sizes
      ? ["S", "M", "L", "XL", "2XL"].map((sz) => `<button type="button" data-quick-add="${p.id}" data-size="${sz}" aria-label="Add size ${sz}">${sz}</button>`).join("")
      : `<button type="button" data-quick-add="${p.id}">Add</button>`;
    return `
      <article class="Card">
        <div class="Card__media">
          ${badge}
          <button class="Card__hit" type="button" data-quick="${p.id}" aria-label="Quick view ${esc(p.title)}">
            <img class="Card__img" src="${esc(photoOf(p))}" alt="${esc(p.seo_title || p.title)}" loading="lazy" decoding="async" width="1000" height="1280" />
            ${hover}
          </button>
          <div class="QuickAdd" aria-label="Add ${esc(shortTitle(p))} to bag">${sizes}</div>
        </div>
        <div class="Card__body">
          <div class="Card__top">
            <h3><button type="button" data-quick="${p.id}">${esc(shortTitle(p))}</button></h3>
            <div class="Price"><span>${money(p.retail_price)}</span>${was}</div>
          </div>
          ${ratingMarkup(p)}
          ${swatches}
        </div>
      </article>`;
  }).join("");
}

function setDept(next) {
  dept = next;
  query = "";
  const input = $("#searchInput");
  if (input) input.value = "";
  renderProducts();
  const shop = $("#apparel");
  if (shop) shop.scrollIntoView({ behavior: "smooth", block: "start" });
}

function variantLabel(p) {
  return [colorLabel(p), p.has_sizes ? `Size ${sizeOf(p)}` : ""].filter(Boolean).join(" · ");
}

function lineFrom(p, qty = 1) {
  const variant = variantLabel(p);
  return {
    key: `${p.id}__${variant}`,
    id: p.id,
    title: p.title,
    image: photoOf(p),
    price: p.retail_price,
    qty,
    variant,
    stripe_price_id: p.stripe_price_id || "",
    stripe_product_id: p.stripe_product_id || "",
    stripe_account_id: p.stripe_account_id || "",
  };
}

function addToCart(sku, openDrawer = true) {
  const p = findProduct(sku);
  if (!p) return;
  const line = lineFrom(p);
  const existing = cart.find((item) => item.key === line.key);
  if (existing) existing.qty += 1;
  else cart.push(line);
  renderCart();
  toast(`${shortTitle(p)} added${variantLabel(p) ? ` · ${variantLabel(p)}` : ""}`);
  if (openDrawer) openSheet("cartDrawer");
}

function changeQty(key, delta) {
  const item = cart.find((entry) => entry.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((entry) => entry.key !== key);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const sub = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  $("#cartCount").textContent = String(count);
  const box = $("#cartItems");
  if (!cart.length) {
    box.innerHTML = `<p class="Empty">The bag is empty. The apparel floor is the place to start.</p>`;
  } else {
    box.innerHTML = cart.map((item) => `
      <div class="Line">
        <img src="${esc(item.image)}" alt="" />
        <div>
          <strong>${esc(item.title)}</strong>
          <div class="StripeId">${esc(item.variant)}</div>
          <div class="Qty">
            <button type="button" data-qty="-1" data-key="${esc(item.key)}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" data-key="${esc(item.key)}" aria-label="Increase quantity">+</button>
            <strong style="margin-left:auto">${money(item.price * item.qty)}</strong>
          </div>
        </div>
      </div>
    `).join("");
  }
  $("#cartSubtotal").textContent = money(sub);
}

function openSheet(id) {
  const sheet = document.getElementById(id);
  if (!sheet) return;
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
  sheet.removeAttribute("inert");
  document.body.classList.add("is-locked");
  const close = sheet.querySelector(".IconBtn");
  if (close) close.focus();
}
function closeSheet(id) {
  const sheet = document.getElementById(id);
  if (!sheet) return;
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
  sheet.setAttribute("inert", "");
  if (![...document.querySelectorAll(".Sheet.is-open")].length) {
    document.body.classList.remove("is-locked");
  }
}
function closeAll() {
  document.querySelectorAll(".Sheet.is-open").forEach((sheet) => closeSheet(sheet.id));
}

function openProduct(sku) {
  const p = findProduct(sku);
  if (!p) return;
  const was = p.list_price && p.list_price > p.retail_price ? `<s>${money(p.list_price)}</s>` : "";
  const swatches = p.alt_image ? `
    <div class="Swatches" style="position:static;margin:12px 0">
      <button class="Swatch Swatch--black" type="button" data-color="black" data-sku="${p.id}" aria-label="Black" aria-pressed="${colorOf(p) === "black"}"></button>
      <button class="Swatch Swatch--bone" type="button" data-color="white" data-sku="${p.id}" aria-label="Bone" aria-pressed="${colorOf(p) === "white"}"></button>
      <span>${esc(colorLabel(p))}</span>
    </div>` : "";
  const sizes = p.has_sizes ? `<div class="Sizes" style="margin:12px 0">${["S", "M", "L", "XL", "2XL"].map((sz) => `
    <button class="SizeBtn" type="button" data-size="${sz}" data-sku="${p.id}" aria-pressed="${sizeOf(p) === sz}">${sz}</button>
  `).join("")}</div>` : "";
  const stripe = [p.stripe_price_id, p.stripe_product_id, p.stripe_account_id].filter(Boolean).join(" · ");
  $("#productModalContent").innerHTML = `
    <div class="ProductLayout">
      <div class="ProductLayout__photo"><img src="${esc(photoOf(p))}" alt="${esc(p.title)}" /></div>
      <div class="ProductLayout__copy">
        <div class="Card__dept">${esc(p.dept)} · ${esc(p.category || "")}</div>
        <h2>${esc(p.title)}</h2>
        <div class="Price"><span>${money(p.retail_price)}</span>${was}</div>
        <p style="margin-top:12px">${esc(p.short_desc || "")}</p>
        ${swatches}
        ${sizes}
        <ul class="Highlights">${(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        ${p.review_quote ? `<blockquote class="Quote">${esc(p.review_quote)}</blockquote>` : ""}
        <p>${esc(p.ship_time || "")}<br />${esc(p.stock_status || "")}</p>
        ${stripe ? `<p class="StripeId">${esc(stripe)}</p>` : ""}
        <div class="Card__actions" style="margin-top:16px">
          <button class="Btn Btn--bone" type="button" data-add="${p.id}">Add to bag</button>
          <button class="Btn Btn--cobalt" type="button" data-buy="${p.id}">Checkout with Stripe</button>
        </div>
      </div>
    </div>`;
  openSheet("productModal");
}

function checkoutLines() {
  return express || cart;
}

function openCheckout(lines) {
  express = lines;
  const bag = checkoutLines();
  if (!bag.length) {
    toast("Add a piece before checkout");
    return;
  }
  closeSheet("productModal");
  closeSheet("cartDrawer");
  const sub = bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  $("#checkoutModalContent").innerHTML = `
    <h2 style="letter-spacing:-0.04em;font-size:32px">Secure checkout</h2>
    <p style="color:#5e6672;margin:6px 0 14px">Card numbers stay on Stripe. This order reserves the kit and requests the encrypted payment link for the price IDs below.</p>
    <div style="margin-bottom:14px">
      ${bag.map((item) => `
        <div class="Row"><span>${item.qty} × ${esc(item.title)} <span class="StripeId">${esc(item.variant)}</span></span><strong>${money(item.price * item.qty)}</strong></div>
        <div class="StripeId">${esc([item.stripe_price_id, item.stripe_product_id, item.stripe_account_id].filter(Boolean).join(" · "))}</div>
      `).join("")}
      <div class="Row" style="margin-top:8px"><span>US delivery</span><strong>Free</strong></div>
      <div class="Row"><span>Total</span><strong>${money(sub)}</strong></div>
    </div>
    <form class="CheckoutForm" id="checkoutForm">
      <div class="CheckoutGrid">
        <label class="Field">Full name<input name="name" required autocomplete="name" /></label>
        <label class="Field">Email<input name="email" type="email" required autocomplete="email" /></label>
        <label class="Field full">Street<input name="street" required autocomplete="address-line1" /></label>
        <label class="Field">City and state<input name="city" required autocomplete="address-level2" /></label>
        <label class="Field">ZIP<input name="zip" required autocomplete="postal-code" /></label>
      </div>
      <button class="Btn Btn--cobalt Btn--full" type="submit" style="margin-top:8px">Continue to Stripe · ${money(sub)}</button>
    </form>`;
  openSheet("checkoutModal");
  $("#checkoutForm").addEventListener("submit", submitOrder);
}

function submitOrder(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const bag = checkoutLines();
  const sub = bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  const orderId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const street = String(data.get("street") || "").trim();
  const city = String(data.get("city") || "").trim();
  const zip = String(data.get("zip") || "").trim();
  const lines = bag.map((item) => {
    const stripe = [item.stripe_price_id, item.stripe_product_id, item.stripe_account_id].filter(Boolean).join(" | ");
    return `- ${item.qty}x ${item.title} (${item.variant}) ${money(item.price * item.qty)} [${stripe}]`;
  }).join("\n");
  const subject = encodeURIComponent(`Order ${orderId} — Stripe payment link (${money(sub)})`);
  const body = encodeURIComponent(`Order ID: ${orderId}\nCustomer: ${name} (${email})\nShip To: ${street}, ${city} ${zip}\nPayment: Stripe Checkout for the price IDs below\n\nItems:\n${lines}\n\nTotal: ${money(sub)} (Free US shipping)`);
  $("#checkoutModalContent").innerHTML = `
    <h2 style="letter-spacing:-0.04em;font-size:32px">Order ${esc(orderId)} is reserved</h2>
    <p style="margin:8px 0 14px">${esc(name)}, the kit is held for ${esc(city)} ${esc(zip)}. Finish payment on the Stripe link we send for these price IDs.</p>
    ${bag.map((item) => `<div class="Row"><span>${item.qty} × ${esc(item.title)}</span><strong>${money(item.price * item.qty)}</strong></div>`).join("")}
    <div class="Row"><span>Total</span><strong>${money(sub)}</strong></div>
    <a class="Btn Btn--cobalt Btn--full" style="margin-top:16px" href="mailto:apexhybridco@gmail.com?subject=${subject}&body=${body}">Email me the Stripe payment link</a>
    <button class="Btn Btn--ghost Btn--full" type="button" style="margin-top:8px" data-close="checkoutModal">Done</button>`;
  if (!express) cart = [];
  express = null;
  renderCart();
}

function fmt(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, "0")}`;
}

function currentCity() {
  const id = $("#calcCity") ? $("#calcCity").value : "CHI";
  return CITIES.find((city) => city.code === id) || CITIES[0];
}

function updateRaceSplitCalculator() {
  const finishEl = $("#calcTargetFinish");
  const divEl = $("#calcDivision");
  const table = $("#splitTable");
  if (!finishEl || !divEl || !table) return;
  const target = (parseInt(finishEl.value, 10) || 70) * 60;
  const division = divEl.value;
  const city = currentCity();
  let runShare = division === "pro" ? 0.5 : division === "doubles" ? 0.56 : 0.53;
  const roxShare = 0.068;
  let stationShare = 1 - runShare - roxShare;
  if (division === "doubles") stationShare *= 0.72;
  let run = target * runShare * city.run;
  const rox = target * roxShare;
  const pool = target * stationShare;
  const stationTimes = STATIONS.map(([, , , weight, sled]) => pool * weight * (sled ? city.sled : 1));
  const raw = run + rox + stationTimes.reduce((sum, n) => sum + n, 0);
  const scale = target / raw;
  run *= scale;
  const stations = stationTimes.map((n) => n * scale);
  const roxScaled = rox * scale;
  const perKm = run / 8;
  const rows = [
    ["Run 1–8", `${fmt(perKm)} / km`, fmt(run)],
    ...STATIONS.map(([, name], i) => [`${STATIONS[i][0]}  ${name}`, "Station", fmt(stations[i])]),
    ["Roxzone", "All transitions", fmt(roxScaled)],
  ];
  const total = run + stations.reduce((s, n) => s + n, 0) + roxScaled;
  table.innerHTML = `
    <thead><tr><th>Piece</th><th>Read</th><th>Time</th></tr></thead>
    <tbody>
      ${rows.map(([a, b, c]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join("")}
      <tr class="total"><td>Finish</td><td>${esc(city.name)}</td><td>${fmt(total)}</td></tr>
    </tbody>`;
  const note = $("#calcNote");
  if (note) {
    const divNote = division === "pro" ? "Pro sleds take a larger share of the clock." : division === "doubles" ? "Doubles share the stations. The run is still yours." : "Open division pacing, even from the first kilometer.";
    note.textContent = `${city.name} · ${city.venue}, ${city.when}. ${city.note} ${divNote}`;
  }
}

function renderLabCities() {
  $("#labCities").innerHTML = CITIES.map((city) => `
    <button class="CityPick" type="button" data-city="${city.code}" data-sku="${city.sku}">
      <span>${esc(city.when)}</span>
      <strong>${esc(city.name)}</strong>
      <p>${esc(city.venue)}. ${esc(city.note)}</p>
    </button>
  `).join("");
}

function renderArticles() {
  const list = $("#articleList");
  if (!list) return;
  if (!activeArticle && GUIDES[0]) activeArticle = GUIDES[0].slug;
  list.innerHTML = GUIDES.map((guide) => `
    <button type="button" data-article="${esc(guide.slug)}" aria-current="${guide.slug === activeArticle}">${esc(guide.title)}</button>
  `).join("");
  const guide = GUIDES.find((item) => item.slug === activeArticle) || GUIDES[0];
  const reader = $("#articleReader");
  if (!guide || !reader) return;
  const recs = (guide.recommended_skus || []).map((sku) => findProduct(sku)).filter(Boolean);
  reader.innerHTML = `
    <p class="Card__dept" style="color:#00f0ff">${esc(guide.category)} · ${esc(guide.read_time)}</p>
    <h3>${esc(guide.title)}</h3>
    <div class="Prose">${guide.body_html || ""}</div>
    <div class="Recs">
      ${recs.map((p) => `
        <div class="Rec">
          <img src="${esc(p.image)}" alt="" />
          <strong>${esc(p.title)}</strong>
          <div>${money(p.retail_price)}</div>
          <button class="Btn Btn--bone Btn--full" type="button" data-add="${p.id}" style="margin-top:6px">Add</button>
        </div>`).join("")}
    </div>`;
}

function openLab(tab, slug) {
  labTab = tab || "calculator";
  if (slug) activeArticle = slug;
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.tab === labTab ? "true" : "false");
  });
  document.querySelectorAll(".LabPane").forEach((pane) => {
    pane.hidden = pane.dataset.pane !== labTab;
  });
  renderArticles();
  updateRaceSplitCalculator();
  openSheet("raceLab");
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("is-on"), 2200);
}

function onClick(event) {
  const deptBtn = event.target.closest("[data-dept]");
  if (deptBtn && deptBtn.dataset.dept) {
    event.preventDefault();
    setDept(deptBtn.dataset.dept);
    $("#siteNav").classList.remove("is-open");
    return;
  }
  const lab = event.target.closest("[data-lab]");
  if (lab) {
    openLab(lab.dataset.lab, lab.dataset.article || null);
    return;
  }
  const tab = event.target.closest("[data-tab]");
  if (tab) {
    openLab(tab.dataset.tab);
    return;
  }
  const article = event.target.closest("[data-article]");
  if (article) {
    activeArticle = article.dataset.article;
    renderArticles();
    if (!$("#raceLab").classList.contains("is-open")) openLab("articles", activeArticle);
    return;
  }
  const quickAdd = event.target.closest("[data-quick-add]");
  if (quickAdd) {
    const sku = quickAdd.dataset.quickAdd;
    if (quickAdd.dataset.size) sizeChoice[sku] = quickAdd.dataset.size;
    addToCart(sku, false);
    return;
  }
  const color = event.target.closest("[data-color]");
  if (color) {
    colorChoice[color.dataset.sku] = color.dataset.color;
    renderProducts();
    if ($("#productModal").classList.contains("is-open")) openProduct(color.dataset.sku);
    return;
  }
  const size = event.target.closest("[data-size]");
  if (size) {
    sizeChoice[size.dataset.sku] = size.dataset.size;
    renderProducts();
    if ($("#productModal").classList.contains("is-open")) openProduct(size.dataset.sku);
    return;
  }
  const quick = event.target.closest("[data-quick]");
  if (quick) {
    openProduct(quick.dataset.quick);
    return;
  }
  const buy = event.target.closest("[data-buy]");
  if (buy) {
    const p = findProduct(buy.dataset.buy);
    if (p) openCheckout([lineFrom(p)]);
    return;
  }
  const add = event.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add, true);
    return;
  }
  const qty = event.target.closest("[data-qty]");
  if (qty) {
    changeQty(qty.dataset.key, Number(qty.dataset.qty));
    return;
  }
  const city = event.target.closest("[data-city]");
  if (city && $("#calcCity")) {
    $("#calcCity").value = city.dataset.city;
    updateRaceSplitCalculator();
    if (city.dataset.sku && event.target.closest("#labCities")) {
      closeSheet("raceLab");
      openProduct(city.dataset.sku);
    }
    return;
  }
  if (event.target.closest("[data-bag]")) {
    openSheet("cartDrawer");
    return;
  }
  if (event.target.closest("[data-checkout-cart]")) {
    express = null;
    openCheckout(null);
    return;
  }
  if (event.target.closest("[data-clear-search]")) {
    query = "";
    $("#searchInput").value = "";
    renderProducts();
    return;
  }
  if (event.target.closest("[data-clear-cart]")) cart = [];
  const closer = event.target.closest("[data-close]");
  if (closer) {
    closeSheet(closer.dataset.close);
    renderCart();
    return;
  }
  const menu = event.target.closest("#menuBtn");
  if (menu) {
    const nav = $("#siteNav");
    const open = nav.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  }
}

function boot(data) {
  PRODUCTS = data.products || [];
  GUIDES = data.guides || [];
  renderLabCities();
  renderProducts();
  renderCart();
  renderArticles();
  updateRaceSplitCalculator();
  const params = new URLSearchParams(window.location.search);
  const buy = findProduct(params.get("buy") || "");
  const add = findProduct(params.get("add") || "");
  if (buy) openCheckout([lineFrom(buy)]);
  else if (add) addToCart(add.id, true);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", onClick);
  $("#searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    query = $("#searchInput").value;
    renderProducts();
    $("#apparel").scrollIntoView({ behavior: "smooth" });
  });
  $("#searchInput").addEventListener("input", (event) => {
    query = event.target.value;
    renderProducts();
  });
  $("#sortSelect").addEventListener("change", (event) => {
    sort = event.target.value;
    renderProducts();
  });
  ["calcTargetFinish", "calcDivision", "calcCity"].forEach((id) => {
    const node = document.getElementById(id);
    if (node) node.addEventListener("change", updateRaceSplitCalculator);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
  fetch("catalog.json?v=20261025v4")
    .then((res) => {
      if (!res.ok) throw new Error("catalog");
      return res.json();
    })
    .then(boot)
    .catch(() => {
      $("#productGrid").innerHTML = `<div class="Error"><p>The catalog didn’t load. Refresh the page.</p></div>`;
    });
});

window.openProductModal = openProduct;
window.closeProductModal = () => closeSheet("productModal");
window.addToCart = addToCart;
window.openCheckoutModal = () => { express = null; openCheckout(null); };
window.closeCheckoutModal = () => closeSheet("checkoutModal");
window.updateRaceSplitCalculator = updateRaceSplitCalculator;
window.filterByDepartment = setDept;
window.toggleCartDrawer = (open) => (open ? openSheet("cartDrawer") : closeSheet("cartDrawer"));
window.openRaceLab = openLab;
