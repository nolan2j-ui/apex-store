const BEACON_NS = "https://abacus.jasoncameron.dev/hit/apexhybridco.com";
function trackHit(key) {
  try {
    if (!key) return;
    if (/bot|crawl|spider|slurp|headless|lighthouse/i.test(navigator.userAgent || "")) return;
    const clean = String(key).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 62);
    fetch(`${BEACON_NS}/${clean}`, { method: "GET", mode: "cors", keepalive: true, cache: "no-store" }).catch(() => {});
  } catch (_) {}
}
window.apexTrackHit = trackHit;

const APPAREL = new Set([
  "Breathable Tech Shirts",
  "Race City Editions",
  "Muscle Tanks",
  "Tees & Pump Covers",
  "Hoodies",
  "Lightweight Jackets",
  "Training Gear",
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


const PROMO_CODES = {
  COACHSU10: { pct: 10, label: "Coach Su & The Vault Fitness (10% Off)" },
  DADBOD10: { pct: 10, label: "Hyrox DadBod (10% Off)" },
  HYROX10: { pct: 10, label: "HYROX Athlete (10% Off)" },
  CLUB10: { pct: 10, label: "HYROX Club & Coach (10% Off)" },
  DOUBLES10: { pct: 10, label: "Doubles Partner (10% Off)" },
  LUXESTRONG10: { pct: 10, label: "LuxeStrong (10% Off)" },
  WESTGROX10: { pct: 10, label: "Westgrove HYROX (10% Off)" },
  WESTGROVE10: { pct: 10, label: "Westgrove HYROX (10% Off)" },
  KEVINKIM10: { pct: 10, label: "Coach Kevin Kim (10% Off)" },
  TAEJO10: { pct: 10, label: "Coach TaeJo (10% Off)" },
  FTX10: { pct: 10, label: "FTX Wellness (10% Off)" },
  TEAM15: { pct: 15, label: "Relay Squad 5+ (15% Off)" },
  GYM20: { pct: 20, label: "Affiliate Gym 10+ (20% Off)" },
};


const FW_VARIANTS = {"APC-C01": {"sku": "APC-C01", "title": "Run. Station. Repeat. Heavyweight Hybrid Race Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat", "price": 38.0, "image": "images/streetwear/apc-c01-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c01-white.png?v=20261026v3", "variants": {"S": {"id": "c7204aca-5bc1-4903-921c-4103e7b7bcd0", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=c7204aca-5bc1-4903-921c-4103e7b7bcd0"}, "M": {"id": "c68ce394-fabe-4b4b-a61a-1e62e02ee237", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=c68ce394-fabe-4b4b-a61a-1e62e02ee237"}, "L": {"id": "c72c77ef-f0ad-4d13-b3fd-0df02dfe5a63", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=c72c77ef-f0ad-4d13-b3fd-0df02dfe5a63"}, "XL": {"id": "83622d4b-c74d-4062-bb05-6a828368330b", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=83622d4b-c74d-4062-bb05-6a828368330b"}, "2XL": {"id": "b14e7097-2d16-4828-a929-5d112665caf7", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=b14e7097-2d16-4828-a929-5d112665caf7"}, "3XL": {"id": "4e5706e1-a2b6-4211-a8de-274857fb3a56", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=4e5706e1-a2b6-4211-a8de-274857fb3a56"}, "4XL": {"id": "f711f9fc-e68d-476c-b656-4a815af373b5", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-run-station-repeat?variant=f711f9fc-e68d-476c-b656-4a815af373b5"}}}, "APC-C02": {"sku": "APC-C02", "title": "Wall Balls & Bad Decisions Heavyweight Pump Cover Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions", "price": 38.0, "image": "images/streetwear/apc-c02-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c02-white.png?v=20261026v3", "variants": {"S": {"id": "c5c3892a-360f-47e8-8983-65326e233e93", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=c5c3892a-360f-47e8-8983-65326e233e93"}, "M": {"id": "ae373f8e-e8e2-4460-9ff1-6d9f3eaddd05", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=ae373f8e-e8e2-4460-9ff1-6d9f3eaddd05"}, "L": {"id": "8ef10583-5990-4906-a210-71e5c2907158", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=8ef10583-5990-4906-a210-71e5c2907158"}, "XL": {"id": "3471d1e9-2d95-4fbe-a82b-02cc4ff0680e", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=3471d1e9-2d95-4fbe-a82b-02cc4ff0680e"}, "2XL": {"id": "0a4ee0a0-dd49-4fcc-891f-57d1ab8af263", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=0a4ee0a0-dd49-4fcc-891f-57d1ab8af263"}, "3XL": {"id": "e19cbab1-5e95-4f2c-a98e-34da7fe9001d", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=e19cbab1-5e95-4f2c-a98e-34da7fe9001d"}, "4XL": {"id": "bcfd497a-2f33-46fb-81df-1e900ea95250", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-wall-balls-bad-decisions?variant=bcfd497a-2f33-46fb-81df-1e900ea95250"}}}, "APC-C03": {"sku": "APC-C03", "title": "Sled Push Enthusiast Athletic Crewneck Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast", "price": 38.0, "image": "images/streetwear/apc-c03-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c03-white.png?v=20261026v3", "variants": {"S": {"id": "7face9ce-5c7b-4629-9a16-c7793eaf4d44", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=7face9ce-5c7b-4629-9a16-c7793eaf4d44"}, "M": {"id": "3e967b7d-6ad8-4eb0-b56d-d23daa10872d", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=3e967b7d-6ad8-4eb0-b56d-d23daa10872d"}, "L": {"id": "2eb357f2-3d6d-4494-86b6-154e37b4f718", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=2eb357f2-3d6d-4494-86b6-154e37b4f718"}, "XL": {"id": "5667ffbd-8464-4382-b64b-f15928758377", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=5667ffbd-8464-4382-b64b-f15928758377"}, "2XL": {"id": "9e27edf7-51bf-407c-a457-3eb55b0ed5b1", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=9e27edf7-51bf-407c-a457-3eb55b0ed5b1"}, "3XL": {"id": "e94dae93-849d-4494-b186-c4f65d377dea", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=e94dae93-849d-4494-b186-c4f65d377dea"}, "4XL": {"id": "661f6129-62ca-4308-bb44-a16e322906bc", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-sled-push-enthusiast?variant=661f6129-62ca-4308-bb44-a16e322906bc"}}}, "APC-C04": {"sku": "APC-C04", "title": "Compromised Running Club - Est. Kilometer One Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club", "price": 38.0, "image": "images/streetwear/apc-c04-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c04-white.png?v=20261026v3", "variants": {"S": {"id": "00b46abe-f4bb-4dc0-82de-e7fe669f0579", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=00b46abe-f4bb-4dc0-82de-e7fe669f0579"}, "M": {"id": "367c120b-affe-4f5c-b343-652c3ddcbdfb", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=367c120b-affe-4f5c-b343-652c3ddcbdfb"}, "L": {"id": "8d3cf41a-8f43-4e7c-8686-f6023d613ffd", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=8d3cf41a-8f43-4e7c-8686-f6023d613ffd"}, "XL": {"id": "f3676722-c952-43be-b761-ea6aac9cd420", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=f3676722-c952-43be-b761-ea6aac9cd420"}, "2XL": {"id": "92067371-2226-4722-8303-8d30cba26c78", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=92067371-2226-4722-8303-8d30cba26c78"}, "3XL": {"id": "387f6b07-7cea-4c56-a748-4421ff3831ca", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=387f6b07-7cea-4c56-a748-4421ff3831ca"}, "4XL": {"id": "641c3210-09a8-4879-8462-a5996e6493fc", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-compromised-running-club?variant=641c3210-09a8-4879-8462-a5996e6493fc"}}}, "APC-C05": {"sku": "APC-C05", "title": "Burpee Broad Jumps Build Character Training Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps", "price": 38.0, "image": "images/streetwear/apc-c05-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c05-white.png?v=20261026v3", "variants": {"S": {"id": "6edd799d-2122-465e-8fea-6e0498803987", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=6edd799d-2122-465e-8fea-6e0498803987"}, "M": {"id": "14375fcf-1cac-438f-990f-805f2a1b75fb", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=14375fcf-1cac-438f-990f-805f2a1b75fb"}, "L": {"id": "90c529f7-eb33-4220-b462-957d5e6abedd", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=90c529f7-eb33-4220-b462-957d5e6abedd"}, "XL": {"id": "20dd1fc9-0ec0-4dc7-a31c-3132a282a88e", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=20dd1fc9-0ec0-4dc7-a31c-3132a282a88e"}, "2XL": {"id": "6c886af4-09f2-413b-9a2f-72e0ad01e04e", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=6c886af4-09f2-413b-9a2f-72e0ad01e04e"}, "3XL": {"id": "2e19d790-d2f8-402e-afbb-4718dbdc9981", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=2e19d790-d2f8-402e-afbb-4718dbdc9981"}, "4XL": {"id": "243f1f60-a43d-4acf-acdc-cdef5a83fe12", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-burpee-broad-jumps?variant=243f1f60-a43d-4acf-acdc-cdef5a83fe12"}}}, "APC-C06": {"sku": "APC-C06", "title": "The Erg Doesn't Care How You Feel - Row \u00b7 Ski \u00b7 Repeat Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel", "price": 38.0, "image": "images/streetwear/apc-c06-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c06-white.png?v=20261026v3", "variants": {"S": {"id": "68df6817-246b-4007-ac95-bb9bfbbb8cae", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=68df6817-246b-4007-ac95-bb9bfbbb8cae"}, "M": {"id": "43dcbb25-5c49-4135-afc1-bff30abf0580", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=43dcbb25-5c49-4135-afc1-bff30abf0580"}, "L": {"id": "52e493a7-23ca-4525-ba8c-232e984a1cf9", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=52e493a7-23ca-4525-ba8c-232e984a1cf9"}, "XL": {"id": "a488c09e-550f-4c49-820c-138ea5ab0994", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=a488c09e-550f-4c49-820c-138ea5ab0994"}, "2XL": {"id": "5943682b-132f-4ee2-b305-9f41dfa56ab0", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=5943682b-132f-4ee2-b305-9f41dfa56ab0"}, "3XL": {"id": "675a00fc-4bac-4aba-9f33-905064045487", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=675a00fc-4bac-4aba-9f33-905064045487"}, "4XL": {"id": "ae16ee4d-62df-4650-9cb8-53c1a8aead52", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-the-erg-doesnt-care-how-you-feel?variant=ae16ee4d-62df-4650-9cb8-53c1a8aead52"}}}, "APC-C07": {"sku": "APC-C07", "title": "Pre-Race Porta-Potty Line PR Warmup Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr", "price": 38.0, "image": "images/streetwear/apc-c07-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c07-white.png?v=20261026v3", "variants": {"S": {"id": "7c92c0e4-d216-4164-8ab8-92d2fb3b3300", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=7c92c0e4-d216-4164-8ab8-92d2fb3b3300"}, "M": {"id": "70ec0502-727e-4e16-bd22-103ea7b95d79", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=70ec0502-727e-4e16-bd22-103ea7b95d79"}, "L": {"id": "bdffa63c-fa65-442d-a2e9-b58a3e0fba30", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=bdffa63c-fa65-442d-a2e9-b58a3e0fba30"}, "XL": {"id": "4cc2c891-e2d8-4927-86d7-f548ade47457", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=4cc2c891-e2d8-4927-86d7-f548ade47457"}, "2XL": {"id": "5d3c008f-8d94-4d20-864c-d68ba7b69840", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=5d3c008f-8d94-4d20-864c-d68ba7b69840"}, "3XL": {"id": "cdf279c3-3d72-47fc-ba30-8e212e51c922", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=cdf279c3-3d72-47fc-ba30-8e212e51c922"}, "4XL": {"id": "cf96ba81-d8bf-4a3d-bd36-46e35f5601ef", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-porta-potty-line-pr?variant=cf96ba81-d8bf-4a3d-bd36-46e35f5601ef"}}}, "APC-C08": {"sku": "APC-C08", "title": "I Don't Need To Defend My Sled Push - Sled Push Dept. Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push", "price": 38.0, "image": "images/streetwear/apc-c08-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c08-white.png?v=20261026v3", "variants": {"S": {"id": "312b10cb-f4d0-4e18-9d72-368d38c2c150", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=312b10cb-f4d0-4e18-9d72-368d38c2c150"}, "M": {"id": "fc74fbe2-0473-4436-a214-c66327fa123d", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=fc74fbe2-0473-4436-a214-c66327fa123d"}, "L": {"id": "b488851a-657d-4348-b7e7-3652ea44d216", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=b488851a-657d-4348-b7e7-3652ea44d216"}, "XL": {"id": "b5a5cb27-ae1b-4ac5-965b-af5ebe7dcc96", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=b5a5cb27-ae1b-4ac5-965b-af5ebe7dcc96"}, "2XL": {"id": "04c4c580-4d6d-4511-b742-90575a2f811b", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=04c4c580-4d6d-4511-b742-90575a2f811b"}, "3XL": {"id": "0a0b3b8b-8aab-4096-b24c-84d5efa2cd7d", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=0a0b3b8b-8aab-4096-b24c-84d5efa2cd7d"}, "4XL": {"id": "ae3fc74e-39ad-4dda-9a3e-5622ab5e7100", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-i-dont-need-to-defend-my-sled-push?variant=ae3fc74e-39ad-4dda-9a3e-5622ab5e7100"}}}, "APC-C09": {"sku": "APC-C09", "title": "Run. Station. Repeat. Heavyweight Fleece Warmup Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie", "price": 58.0, "image": "images/streetwear/apc-c09-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c09-white.png?v=20261026v3", "variants": {"XS": {"id": "7d1b0e76-e17e-493c-8a79-23d4a9129316", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=7d1b0e76-e17e-493c-8a79-23d4a9129316"}, "S": {"id": "8dae9001-7052-4aba-ad20-57680b7e7508", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=8dae9001-7052-4aba-ad20-57680b7e7508"}, "M": {"id": "6caec690-8afd-44bb-8566-e232270d856b", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=6caec690-8afd-44bb-8566-e232270d856b"}, "L": {"id": "5e0986ef-ebc2-48d2-801b-1727d6e5e66b", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=5e0986ef-ebc2-48d2-801b-1727d6e5e66b"}, "XL": {"id": "176d4371-37a1-4eb4-bab0-c971b0ecdb51", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=176d4371-37a1-4eb4-bab0-c971b0ecdb51"}, "2XL": {"id": "6254dadd-73ae-4777-9da1-29b60660b3ef", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=6254dadd-73ae-4777-9da1-29b60660b3ef"}, "3XL": {"id": "29defe28-d413-4fdd-9e2f-84ee97266dfd", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-heavyweight-fleece-warmup-hoodie?variant=29defe28-d413-4fdd-9e2f-84ee97266dfd"}}}, "APC-C10": {"sku": "APC-C10", "title": "Wall Balls & Bad Decisions Brushed Fleece Pullover Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie", "price": 58.0, "image": "images/streetwear/apc-c10-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c10-white.png?v=20261026v3", "variants": {"XS": {"id": "9dcb8fc2-40f2-44e8-a248-6e966b632807", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=9dcb8fc2-40f2-44e8-a248-6e966b632807"}, "S": {"id": "7545a9f0-3169-4918-8107-c6caa0aa559b", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=7545a9f0-3169-4918-8107-c6caa0aa559b"}, "M": {"id": "4b60582b-d219-4491-a543-b42fb2b7e40d", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=4b60582b-d219-4491-a543-b42fb2b7e40d"}, "L": {"id": "06660872-edb1-47b0-9ade-6b3d31fa98f8", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=06660872-edb1-47b0-9ade-6b3d31fa98f8"}, "XL": {"id": "12e17539-d1e3-48d9-80a9-41c16a6a7c60", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=12e17539-d1e3-48d9-80a9-41c16a6a7c60"}, "2XL": {"id": "7b8e7c6a-d1f8-4d21-af73-8d7e193330de", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=7b8e7c6a-d1f8-4d21-af73-8d7e193330de"}, "3XL": {"id": "87f73a63-de61-4270-b9ac-c1af04661b8c", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/wall-balls-bad-decisions-brushed-fleece-pullover-hoodie?variant=87f73a63-de61-4270-b9ac-c1af04661b8c"}}}, "APC-C11": {"sku": "APC-C11", "title": "Compromised Running Club Heavy Warmup Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie", "price": 58.0, "image": "images/streetwear/apc-c11-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c11-white.png?v=20261026v3", "variants": {"XS": {"id": "09ebf420-ca29-435e-8884-c4ed99a23200", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=09ebf420-ca29-435e-8884-c4ed99a23200"}, "S": {"id": "f5a4f975-06b7-4e38-9002-a8908588995a", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=f5a4f975-06b7-4e38-9002-a8908588995a"}, "M": {"id": "e686cf02-2840-4545-afa0-0a5c13741a31", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=e686cf02-2840-4545-afa0-0a5c13741a31"}, "L": {"id": "e7bc46ab-f42f-45c6-aebb-ed1bad633116", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=e7bc46ab-f42f-45c6-aebb-ed1bad633116"}, "XL": {"id": "f4da2641-2534-4816-89f8-29bea7337b66", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=f4da2641-2534-4816-89f8-29bea7337b66"}, "2XL": {"id": "2b1d8377-4021-418a-84f0-cc84b5cba47b", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=2b1d8377-4021-418a-84f0-cc84b5cba47b"}, "3XL": {"id": "21f9f457-4512-4f1a-89b5-fcd74e21d98a", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-heavy-warmup-hoodie?variant=21f9f457-4512-4f1a-89b5-fcd74e21d98a"}}}, "APC-C12": {"sku": "APC-C12", "title": "Sled Push Dept.  -  'The Footage Speaks' Pullover Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie", "price": 58.0, "image": "images/streetwear/apc-c12-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c12-white.png?v=20261026v3", "variants": {"XS": {"id": "c2c4b556-38b3-45fe-8671-f7c3098d9877", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=c2c4b556-38b3-45fe-8671-f7c3098d9877"}, "S": {"id": "b368c389-dad2-4166-8bdf-ec6c646b0e16", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=b368c389-dad2-4166-8bdf-ec6c646b0e16"}, "M": {"id": "7c04c499-643c-4f2c-8b59-995d4b9060e9", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=7c04c499-643c-4f2c-8b59-995d4b9060e9"}, "L": {"id": "b46ab63e-edcf-4be1-9821-a6b73dcc8a8c", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=b46ab63e-edcf-4be1-9821-a6b73dcc8a8c"}, "XL": {"id": "6e3a13c8-8982-4062-ada8-8589c122ae7e", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=6e3a13c8-8982-4062-ada8-8589c122ae7e"}, "2XL": {"id": "efaff547-a0ba-4879-bfb5-c956e32895e4", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=efaff547-a0ba-4879-bfb5-c956e32895e4"}, "3XL": {"id": "7cc96662-1bc1-4a72-ada2-8e6a350b1425", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-the-footage-speaks-pullover-hoodie?variant=7cc96662-1bc1-4a72-ada2-8e6a350b1425"}}}, "APC-C13": {"sku": "APC-C13", "title": "Zone 2 Engine Lab Low-Profile Cotton Twill Cap", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-engine-lab-low-profile-cotton-twill-cap", "price": 34.0, "image": "images/streetwear/apc-c13-black.png", "alt_image": "images/streetwear/apc-c13-white.png", "variants": {"One size": {"id": "9b519b62-0e55-4531-8069-143fd4d145bb", "price": 34.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-engine-lab-low-profile-cotton-twill-cap?variant=9b519b62-0e55-4531-8069-143fd4d145bb"}}}, "APC-C14": {"sku": "APC-C14", "title": "8-Station Race Day 50L All-Weather Gym & Shoe Duffle Bag", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/8-station-race-day-50l-all-weather-gym-shoe-bag", "price": 74.0, "image": "images/streetwear/apc-c14-black.png", "alt_image": "images/streetwear/apc-c14-white.png", "variants": {"One size": {"id": "a1c2426f-97bb-4493-b715-852ee8e840a5", "price": 74.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/8-station-race-day-50l-all-weather-gym-shoe-bag?variant=a1c2426f-97bb-4493-b715-852ee8e840a5"}}}, "APC-C15": {"sku": "APC-C15", "title": "24oz Double-Wall Vacuum Insulated Stainless Steel Shaker Bottle", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/24oz-double-wall-vacuum-insulated-stainless-steel-shaker-bottle", "price": 36.0, "image": "images/streetwear/apc-c15-black.png", "alt_image": "images/streetwear/apc-c15-white.png", "variants": {"17oz": {"id": "8fd5562c-358b-4ea7-aa8d-61a8cdfeb9bd", "price": 36.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/24oz-double-wall-vacuum-insulated-stainless-steel-shaker-bottle?variant=8fd5562c-358b-4ea7-aa8d-61a8cdfeb9bd"}}}, "APC-C16": {"sku": "APC-C16", "title": "Chicago Championship Division Tee  -  Navy Pier 8x1000m Club", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division", "price": 38.0, "image": "images/streetwear/apc-c16-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c16-white.png?v=20261026v3", "variants": {"S": {"id": "c16f2888-d87c-4c3f-87d9-e2bd83dc0100", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=c16f2888-d87c-4c3f-87d9-e2bd83dc0100"}, "M": {"id": "08e0595f-274a-40ec-8785-c9ea0f5de0cd", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=08e0595f-274a-40ec-8785-c9ea0f5de0cd"}, "L": {"id": "fcb679ba-d57a-43d9-a0be-2b2cbcdc383c", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=fcb679ba-d57a-43d9-a0be-2b2cbcdc383c"}, "XL": {"id": "faa26a24-2e4b-4c5c-b74e-6467f3e121ab", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=faa26a24-2e4b-4c5c-b74e-6467f3e121ab"}, "2XL": {"id": "ee60d9cb-bc4f-4d18-b48f-02a28c447acc", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=ee60d9cb-bc4f-4d18-b48f-02a28c447acc"}, "3XL": {"id": "1bfd9e68-dfcd-4711-9e20-85d32e25b5b1", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=1bfd9e68-dfcd-4711-9e20-85d32e25b5b1"}, "4XL": {"id": "84a3ff32-39eb-4fe1-8671-31b1944c796c", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-chicago-championship-division?variant=84a3ff32-39eb-4fe1-8671-31b1944c796c"}}}, "APC-C17": {"sku": "APC-C17", "title": "Dallas Turf & Threshold Tee  -  Lone Star 8-Station Classic", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold", "price": 38.0, "image": "images/streetwear/apc-c17-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c17-white.png?v=20261026v3", "variants": {"S": {"id": "29d09b15-c469-4480-93ef-46fc56630660", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=29d09b15-c469-4480-93ef-46fc56630660"}, "M": {"id": "f904e25f-d52b-46d7-985e-bad081971aaa", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=f904e25f-d52b-46d7-985e-bad081971aaa"}, "L": {"id": "168c443a-0b9c-42d1-9d45-0b7895383e8b", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=168c443a-0b9c-42d1-9d45-0b7895383e8b"}, "XL": {"id": "204b8d9c-a8de-4233-8ae5-f72050073c66", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=204b8d9c-a8de-4233-8ae5-f72050073c66"}, "2XL": {"id": "b27dba7d-d08d-4112-bec6-8e77e12cbff3", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=b27dba7d-d08d-4112-bec6-8e77e12cbff3"}, "3XL": {"id": "0ef6640a-89cc-4582-8908-39af2ff1725b", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=0ef6640a-89cc-4582-8908-39af2ff1725b"}, "4XL": {"id": "4901ae29-4874-41c5-a0aa-4c3b4fdcfa57", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-dallas-turf-threshold?variant=4901ae29-4874-41c5-a0aa-4c3b4fdcfa57"}}}, "APC-C18": {"sku": "APC-C18", "title": "Anaheim SoCal Open Division Tee  -  Pacific Coast Race Series", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division", "price": 38.0, "image": "images/streetwear/apc-c18-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c18-white.png?v=20261026v3", "variants": {"S": {"id": "5b4995a6-f354-4919-874f-bc293c0015cd", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=5b4995a6-f354-4919-874f-bc293c0015cd"}, "M": {"id": "12168372-2f3b-4ce2-88df-258fd652cb78", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=12168372-2f3b-4ce2-88df-258fd652cb78"}, "L": {"id": "a2cf7e4e-5cdf-40fe-a1b7-141fdc023187", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=a2cf7e4e-5cdf-40fe-a1b7-141fdc023187"}, "XL": {"id": "c62d440a-181a-4c58-b5e0-c8d605957801", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=c62d440a-181a-4c58-b5e0-c8d605957801"}, "2XL": {"id": "773832b9-b959-4606-a608-1a093ff09318", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=773832b9-b959-4606-a608-1a093ff09318"}, "3XL": {"id": "4795338c-29bd-4c89-a3ca-b341b1fd77a5", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=4795338c-29bd-4c89-a3ca-b341b1fd77a5"}, "4XL": {"id": "7ebaf79b-e154-4880-8895-64f872e0b30c", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-anaheim-socal-open-division?variant=7ebaf79b-e154-4880-8895-64f872e0b30c"}}}, "APC-C19": {"sku": "APC-C19", "title": "Miami Beach Heat-Block Race Tee  -  South Florida Endurance Club", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club", "price": 38.0, "image": "images/streetwear/apc-c19-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c19-white.png?v=20261026v3", "variants": {"S": {"id": "e13d66d2-84ab-42bd-a811-62287e0e96ca", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=e13d66d2-84ab-42bd-a811-62287e0e96ca"}, "M": {"id": "69e54c97-73d3-42f5-b618-64566649d017", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=69e54c97-73d3-42f5-b618-64566649d017"}, "L": {"id": "189a0ffd-7329-47d5-87a5-fb52cce4b135", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=189a0ffd-7329-47d5-87a5-fb52cce4b135"}, "XL": {"id": "a47a8156-007c-4ec9-a90e-7939f4510227", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=a47a8156-007c-4ec9-a90e-7939f4510227"}, "2XL": {"id": "3027f3ce-41b5-4bc6-a4a2-989396817490", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=3027f3ce-41b5-4bc6-a4a2-989396817490"}, "3XL": {"id": "463543de-4d7f-4bd6-ab30-a271d2e1bdc4", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=463543de-4d7f-4bd6-ab30-a271d2e1bdc4"}, "4XL": {"id": "cba57d43-625d-48ad-a62f-9ae321f2d5a6", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-miami-beach-endurance-club?variant=cba57d43-625d-48ad-a62f-9ae321f2d5a6"}}}, "APC-C20": {"sku": "APC-C20", "title": "Las Vegas Championship Qualifier Tee  -  Sin City Turf Club", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier", "price": 38.0, "image": "images/streetwear/apc-c20-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c20-white.png?v=20261026v3", "variants": {"S": {"id": "e95737cc-3b02-4b71-865c-cda9659fac93", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=e95737cc-3b02-4b71-865c-cda9659fac93"}, "M": {"id": "990391a8-3d50-4411-9b7c-2e1d7065a4e7", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=990391a8-3d50-4411-9b7c-2e1d7065a4e7"}, "L": {"id": "a92d8fe2-33a0-4cf5-8fb9-00e0b6edbf08", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=a92d8fe2-33a0-4cf5-8fb9-00e0b6edbf08"}, "XL": {"id": "54d568ee-0b1f-4a77-9211-2b8b9409a4d8", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=54d568ee-0b1f-4a77-9211-2b8b9409a4d8"}, "2XL": {"id": "4fc194b5-a765-4f71-b8ec-6c87a248bf9c", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=4fc194b5-a765-4f71-b8ec-6c87a248bf9c"}, "3XL": {"id": "75a34551-e6c6-49b9-968d-ff5579272d03", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=75a34551-e6c6-49b9-968d-ff5579272d03"}, "4XL": {"id": "c4e65319-d65c-44ea-b346-1d1895d0247d", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-las-vegas-championship-qualifier?variant=c4e65319-d65c-44ea-b346-1d1895d0247d"}}}, "APC-C21": {"sku": "APC-C21", "title": "New York Hudson Pier Race Tee  -  NYC Metro Endurance Dept.", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division", "price": 38.0, "image": "images/streetwear/apc-c21-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c21-white.png?v=20261026v3", "variants": {"S": {"id": "6603a7ea-bddd-4224-9c82-f5a2b4f40a16", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=6603a7ea-bddd-4224-9c82-f5a2b4f40a16"}, "M": {"id": "2bb9a1de-99ae-48c3-838a-88310372249e", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=2bb9a1de-99ae-48c3-838a-88310372249e"}, "L": {"id": "a825800a-126f-462a-9e3a-36be4e31ca49", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=a825800a-126f-462a-9e3a-36be4e31ca49"}, "XL": {"id": "8548abd2-f4e2-40f8-9923-26ad15121428", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=8548abd2-f4e2-40f8-9923-26ad15121428"}, "2XL": {"id": "6be04a0b-846e-4e0b-8657-ecdd20341fc0", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=6be04a0b-846e-4e0b-8657-ecdd20341fc0"}, "3XL": {"id": "a40b3f16-3d26-49a1-9980-fe9727f63769", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=a40b3f16-3d26-49a1-9980-fe9727f63769"}, "4XL": {"id": "8e7a9ea4-b1c0-4d8c-8652-a218ed3c1637", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-race-city-heavyweight-tee-new-york-hudson-pier-division?variant=8e7a9ea4-b1c0-4d8c-8652-a218ed3c1637"}}}, "APC-C22": {"sku": "APC-C22", "title": "8 Runs. 8 Stations. Zero Excuses. Winged Crest Race & Pump Cover Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses", "price": 38.0, "image": "images/streetwear/apc-c22-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c22-white.png?v=20261026v3", "variants": {"S": {"id": "4de0836a-116b-441f-a440-c8a408de6d56", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=4de0836a-116b-441f-a440-c8a408de6d56"}, "M": {"id": "07d55661-2904-4347-ad01-b1b72abe6c7b", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=07d55661-2904-4347-ad01-b1b72abe6c7b"}, "L": {"id": "55158248-39c7-409a-afff-216a2ee73cdd", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=55158248-39c7-409a-afff-216a2ee73cdd"}, "XL": {"id": "d61e5407-2ee3-4f5f-a09b-d0dd892a7773", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=d61e5407-2ee3-4f5f-a09b-d0dd892a7773"}, "2XL": {"id": "e08f0fa7-47d3-40c1-b889-69ace767a27c", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=e08f0fa7-47d3-40c1-b889-69ace767a27c"}, "3XL": {"id": "a5edfbca-e9b3-4e3c-ad33-47f5d8b76a1a", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=a5edfbca-e9b3-4e3c-ad33-47f5d8b76a1a"}, "4XL": {"id": "33d7cd8e-7e13-42ed-94f1-5bb6c18e8994", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-hybrid-tee-8-runs-8-stations-zero-excuses?variant=33d7cd8e-7e13-42ed-94f1-5bb6c18e8994"}}}, "APC-C23": {"sku": "APC-C23", "title": "Roxzone Penalties Ruined My PR Stopwatch Crest Athletic Race Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee", "price": 38.0, "image": "images/streetwear/apc-c23-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c23-white.png?v=20261026v3", "variants": {"S": {"id": "8c697c2c-a31c-4960-b3aa-adcd5611045b", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=8c697c2c-a31c-4960-b3aa-adcd5611045b"}, "M": {"id": "0b1c3e9f-1d91-4a38-8661-b33493b49a99", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=0b1c3e9f-1d91-4a38-8661-b33493b49a99"}, "L": {"id": "4ff60af6-a733-41c8-9960-aa99c086e533", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=4ff60af6-a733-41c8-9960-aa99c086e533"}, "XL": {"id": "8c103b35-a87b-4be1-8515-bd33bfd43b86", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=8c103b35-a87b-4be1-8515-bd33bfd43b86"}, "2XL": {"id": "8ee2abac-27f5-4ecb-ba1b-e308caa180b5", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=8ee2abac-27f5-4ecb-ba1b-e308caa180b5"}, "3XL": {"id": "8a00447d-76e2-4678-bc14-3e738a856073", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=8a00447d-76e2-4678-bc14-3e738a856073"}, "4XL": {"id": "f5bc854f-41a0-40e8-b907-913c0819daaa", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/roxzone-penalties-ruined-my-pr-stopwatch-crest-athletic-race-tee?variant=f5bc854f-41a0-40e8-b907-913c0819daaa"}}}, "APC-C24": {"sku": "APC-C24", "title": "200m Farmer Carry Survivors Club Barbell Insignia Race Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee", "price": 38.0, "image": "images/streetwear/apc-c24-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c24-white.png?v=20261026v3", "variants": {"S": {"id": "5e454b8c-b481-4821-9f22-88e70ee0e37f", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=5e454b8c-b481-4821-9f22-88e70ee0e37f"}, "M": {"id": "346d6534-51f6-43b0-9423-c9a0ceb91b3c", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=346d6534-51f6-43b0-9423-c9a0ceb91b3c"}, "L": {"id": "8f93bfcd-cf45-4dad-a03d-fbd48a365c1b", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=8f93bfcd-cf45-4dad-a03d-fbd48a365c1b"}, "XL": {"id": "b0757e15-591d-44ab-9a9d-684f5a010565", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=b0757e15-591d-44ab-9a9d-684f5a010565"}, "2XL": {"id": "5860c552-42fe-4a51-9a4b-27e4b52bfd98", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=5860c552-42fe-4a51-9a4b-27e4b52bfd98"}, "3XL": {"id": "eda3446b-3318-420b-8da1-c562399abdb7", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=eda3446b-3318-420b-8da1-c562399abdb7"}, "4XL": {"id": "bb038cea-8ef0-4088-99c9-d150f194673d", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/200m-farmer-carry-survivors-club-barbell-insignia-race-tee?variant=bb038cea-8ef0-4088-99c9-d150f194673d"}}}, "APC-C25": {"sku": "APC-C25", "title": "Sandbag Lunges Are A Personal Attack Station 07 Crest Pump Cover", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover", "price": 38.0, "image": "images/streetwear/apc-c25-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c25-white.png?v=20261026v3", "variants": {"S": {"id": "7eae10b8-0f3f-40a7-b3da-e342cd1937ca", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=7eae10b8-0f3f-40a7-b3da-e342cd1937ca"}, "M": {"id": "facf1e6b-1d8a-48b3-9593-1d236ab723df", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=facf1e6b-1d8a-48b3-9593-1d236ab723df"}, "L": {"id": "7d58e13b-ce6f-4cb0-8b9c-5e2480b03daf", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=7d58e13b-ce6f-4cb0-8b9c-5e2480b03daf"}, "XL": {"id": "6f5d8760-e6f2-495c-86c0-62f140531581", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=6f5d8760-e6f2-495c-86c0-62f140531581"}, "2XL": {"id": "5c444c93-ebf5-4934-9db2-1cd0c8d6ab12", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=5c444c93-ebf5-4934-9db2-1cd0c8d6ab12"}, "3XL": {"id": "f1954b8d-a4b5-4c89-8a5f-a18629db6416", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=f1954b8d-a4b5-4c89-8a5f-a18629db6416"}, "4XL": {"id": "b6897f4b-7530-4e1d-bc2d-6ab4a55ae546", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sandbag-lunges-are-a-personal-attack-station-07-crest-pump-cover?variant=b6897f4b-7530-4e1d-bc2d-6ab4a55ae546"}}}, "APC-C26": {"sku": "APC-C26", "title": "Zone 2 All Week, Redline Weekend 185 BPM Tachometer Race Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee", "price": 38.0, "image": "images/streetwear/apc-c26-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c26-white.png?v=20261026v3", "variants": {"S": {"id": "781a4baf-ad06-401a-8fea-aa497d25feca", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=781a4baf-ad06-401a-8fea-aa497d25feca"}, "M": {"id": "7702e84f-51af-42fa-ae93-d3aafa4a19db", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=7702e84f-51af-42fa-ae93-d3aafa4a19db"}, "L": {"id": "fcdd1763-5033-46d8-88df-e622d4052b8c", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=fcdd1763-5033-46d8-88df-e622d4052b8c"}, "XL": {"id": "da08747c-0607-41c2-8eac-806bd9b72301", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=da08747c-0607-41c2-8eac-806bd9b72301"}, "2XL": {"id": "e3c6baef-ecf3-42ea-bd69-c994ad4e9ef5", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=e3c6baef-ecf3-42ea-bd69-c994ad4e9ef5"}, "3XL": {"id": "dc0ab909-65e9-4631-8049-6e07a3d0866d", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=dc0ab909-65e9-4631-8049-6e07a3d0866d"}, "4XL": {"id": "1b1e3fc8-0e1f-42e4-a1d7-5bf38dde465c", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/zone-2-all-week-redline-weekend-185-bpm-tachometer-race-tee?variant=1b1e3fc8-0e1f-42e4-a1d7-5bf38dde465c"}}}, "APC-C27": {"sku": "APC-C27", "title": "Sub-65 Club \u00b7 Pace \u00b7 Pull \u00b7 Push Winged Crest Elite Division Tee", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee", "price": 38.0, "image": "images/streetwear/apc-c27-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c27-white.png?v=20261026v3", "variants": {"S": {"id": "9247cf41-03c0-4965-9840-c74f7e6f2477", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=9247cf41-03c0-4965-9840-c74f7e6f2477"}, "M": {"id": "efe2144c-edf8-4552-8c44-13e4ecc70542", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=efe2144c-edf8-4552-8c44-13e4ecc70542"}, "L": {"id": "f7a31684-947f-4f19-8141-0478221d8912", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=f7a31684-947f-4f19-8141-0478221d8912"}, "XL": {"id": "a329e609-ca20-42fa-adcb-7575cd392eb1", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=a329e609-ca20-42fa-adcb-7575cd392eb1"}, "2XL": {"id": "d1ca19dc-485a-4b5f-bae2-8ada2404d0a6", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=d1ca19dc-485a-4b5f-bae2-8ada2404d0a6"}, "3XL": {"id": "932cc039-5e0d-4525-9beb-34bedc704b60", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=932cc039-5e0d-4525-9beb-34bedc704b60"}, "4XL": {"id": "04e7c5ec-b9cb-448c-bd2f-346ffbdda5ae", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sub-65-club-pace-pull-push-winged-crest-elite-division-tee?variant=04e7c5ec-b9cb-448c-bd2f-346ffbdda5ae"}}}, "APC-C28": {"sku": "APC-C28", "title": "Run. Station. Repeat. Winged Crest Sleeveless Race Day Muscle Tank", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-winged-crest-sleeveless-race-day-muscle-tank", "price": 32.0, "image": "images/streetwear/apc-c28-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c28-white.png?v=20261026v3", "variants": {"S": {"id": "8d35fac0-ea9c-4f3e-853e-6cb60b543b65", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-winged-crest-sleeveless-race-day-muscle-tank?variant=8d35fac0-ea9c-4f3e-853e-6cb60b543b65"}, "M": {"id": "c72dfd45-144e-4306-a028-711c15a6d658", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-winged-crest-sleeveless-race-day-muscle-tank?variant=c72dfd45-144e-4306-a028-711c15a6d658"}, "L": {"id": "08fe4705-4241-4508-9174-75b4dd6acc79", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-winged-crest-sleeveless-race-day-muscle-tank?variant=08fe4705-4241-4508-9174-75b4dd6acc79"}, "XL": {"id": "1328feb2-532a-4aa8-b755-bb1ff2adcc11", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-winged-crest-sleeveless-race-day-muscle-tank?variant=1328feb2-532a-4aa8-b755-bb1ff2adcc11"}, "2XL": {"id": "0a21bff6-d727-4993-8de3-5d4f867f3e5b", "price": 34.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/run-station-repeat-winged-crest-sleeveless-race-day-muscle-tank?variant=0a21bff6-d727-4993-8de3-5d4f867f3e5b"}}}, "APC-C29": {"sku": "APC-C29", "title": "Sled Push Dept. Barbell Crest Conditioning Muscle Tank", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-barbell-crest-conditioning-muscle-tank", "price": 32.0, "image": "images/streetwear/apc-c29-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c29-white.png?v=20261026v3", "variants": {"S": {"id": "ee532b28-050d-492d-a447-a975262ddb30", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-barbell-crest-conditioning-muscle-tank?variant=ee532b28-050d-492d-a447-a975262ddb30"}, "M": {"id": "0bc45bdd-8132-47b6-9ffc-38abf9fcbe44", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-barbell-crest-conditioning-muscle-tank?variant=0bc45bdd-8132-47b6-9ffc-38abf9fcbe44"}, "L": {"id": "b85f66f4-2430-4f02-999d-65ad2f518719", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-barbell-crest-conditioning-muscle-tank?variant=b85f66f4-2430-4f02-999d-65ad2f518719"}, "XL": {"id": "0d70fd17-0281-4ab6-b549-563ffce47384", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-barbell-crest-conditioning-muscle-tank?variant=0d70fd17-0281-4ab6-b549-563ffce47384"}, "2XL": {"id": "88cbcb33-18d2-4437-93c0-cff4dd7e61ba", "price": 34.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/sled-push-dept-barbell-crest-conditioning-muscle-tank?variant=88cbcb33-18d2-4437-93c0-cff4dd7e61ba"}}}, "APC-C30": {"sku": "APC-C30", "title": "Compromised Running Club 1000m Stopwatch Breathable Race Tank", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-1000m-stopwatch-breathable-race-tank", "price": 32.0, "image": "images/streetwear/apc-c30-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c30-white.png?v=20261026v3", "variants": {"S": {"id": "d17716f7-8c5d-459a-b9e2-7f329ad10947", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-1000m-stopwatch-breathable-race-tank?variant=d17716f7-8c5d-459a-b9e2-7f329ad10947"}, "M": {"id": "df92d051-96b0-43d1-886d-1505adfaf0c7", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-1000m-stopwatch-breathable-race-tank?variant=df92d051-96b0-43d1-886d-1505adfaf0c7"}, "L": {"id": "8e4c7692-deba-4f50-9025-e9d1ca50009c", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-1000m-stopwatch-breathable-race-tank?variant=8e4c7692-deba-4f50-9025-e9d1ca50009c"}, "XL": {"id": "94c992b8-21ca-4868-8425-d88a9fa23a8b", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-1000m-stopwatch-breathable-race-tank?variant=94c992b8-21ca-4868-8425-d88a9fa23a8b"}, "2XL": {"id": "2dadc3d8-c268-4319-a7f7-5dbd997f5d80", "price": 34.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/compromised-running-club-1000m-stopwatch-breathable-race-tank?variant=2dadc3d8-c268-4319-a7f7-5dbd997f5d80"}}}, "APC-C31": {"sku": "APC-C31", "title": "100 Wall Balls Unbroken* Winged Crest Sleeveless Muscle Tank", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/100-wall-balls-unbroken-winged-crest-sleeveless-muscle-tank", "price": 32.0, "image": "images/streetwear/apc-c31-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c31-white.png?v=20261026v3", "variants": {"S": {"id": "aac13db6-e423-4ac8-87ba-9eb29c3e176f", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/100-wall-balls-unbroken-winged-crest-sleeveless-muscle-tank?variant=aac13db6-e423-4ac8-87ba-9eb29c3e176f"}, "M": {"id": "5c87cfc4-8080-419a-a2a7-ccb082977f3b", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/100-wall-balls-unbroken-winged-crest-sleeveless-muscle-tank?variant=5c87cfc4-8080-419a-a2a7-ccb082977f3b"}, "L": {"id": "bfa0bf6e-e45a-49cf-a742-85b62074ec4a", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/100-wall-balls-unbroken-winged-crest-sleeveless-muscle-tank?variant=bfa0bf6e-e45a-49cf-a742-85b62074ec4a"}, "XL": {"id": "889c5b4b-8425-4f0d-bf2e-50f4594ab213", "price": 32.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/100-wall-balls-unbroken-winged-crest-sleeveless-muscle-tank?variant=889c5b4b-8425-4f0d-bf2e-50f4594ab213"}, "2XL": {"id": "d652b52d-7f9a-4f15-9153-9061a611fc18", "price": 34.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/100-wall-balls-unbroken-winged-crest-sleeveless-muscle-tank?variant=d652b52d-7f9a-4f15-9153-9061a611fc18"}}}, "APC-C32": {"sku": "APC-C32", "title": "Burpee Broad Jumps Build Character 8.0 oz Warmup Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie", "price": 58.0, "image": "images/streetwear/apc-c32-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c32-white.png?v=20261026v3", "variants": {"XS": {"id": "5add8ab6-c9a0-4c43-8bfe-1771842a5461", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=5add8ab6-c9a0-4c43-8bfe-1771842a5461"}, "S": {"id": "6193f3d6-fccc-481d-b493-8c06b68d4d9d", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=6193f3d6-fccc-481d-b493-8c06b68d4d9d"}, "M": {"id": "151176d5-13a0-4afb-81a4-3edf6f740222", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=151176d5-13a0-4afb-81a4-3edf6f740222"}, "L": {"id": "ed173816-a15c-43e1-b1fa-0630825c49bb", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=ed173816-a15c-43e1-b1fa-0630825c49bb"}, "XL": {"id": "1df12133-b013-4342-a712-6cc249ba527b", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=1df12133-b013-4342-a712-6cc249ba527b"}, "2XL": {"id": "d55b3a2a-323c-4007-8cf3-e0463b9e34ee", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=d55b3a2a-323c-4007-8cf3-e0463b9e34ee"}, "3XL": {"id": "1c0ca70a-8ef9-4d9f-9d69-4ea136a3bb45", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/burpee-broad-jumps-build-character-8-0-oz-warmup-hoodie?variant=1c0ca70a-8ef9-4d9f-9d69-4ea136a3bb45"}}}, "APC-C33": {"sku": "APC-C33", "title": "The Erg Doesn't Care How You Feel Heavyweight Fleece Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie", "price": 58.0, "image": "images/streetwear/apc-c33-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c33-white.png?v=20261026v3", "variants": {"XS": {"id": "2313798a-5651-4821-91d0-81ed4775ed72", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=2313798a-5651-4821-91d0-81ed4775ed72"}, "S": {"id": "10959ca1-dbff-4df4-8713-ffbbcd6df723", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=10959ca1-dbff-4df4-8713-ffbbcd6df723"}, "M": {"id": "ff7ea849-58da-42fb-b9b2-033bcfb6efdc", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=ff7ea849-58da-42fb-b9b2-033bcfb6efdc"}, "L": {"id": "78f1465a-6d25-45ed-b287-548e93135679", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=78f1465a-6d25-45ed-b287-548e93135679"}, "XL": {"id": "6230fc26-5a17-4be0-aae0-6722a5b29b72", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=6230fc26-5a17-4be0-aae0-6722a5b29b72"}, "2XL": {"id": "cd66966a-a461-48a6-96c1-33beb5bfa28a", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=cd66966a-a461-48a6-96c1-33beb5bfa28a"}, "3XL": {"id": "281e8326-b981-41e2-9869-642ce8f84a20", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/the-erg-doesnt-care-how-you-feel-heavyweight-fleece-hoodie?variant=281e8326-b981-41e2-9869-642ce8f84a20"}}}, "APC-C34": {"sku": "APC-C34", "title": "Chicago \u00b7 Dallas \u00b7 SoCal 2026/2027 World Series Prep Winged Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie", "price": 58.0, "image": "images/streetwear/apc-c34-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c34-white.png?v=20261026v3", "variants": {"XS": {"id": "85bb4f83-bff1-4998-9f68-b8a23b08dfb0", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=85bb4f83-bff1-4998-9f68-b8a23b08dfb0"}, "S": {"id": "dc53f607-5617-474d-abff-3eac666aee20", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=dc53f607-5617-474d-abff-3eac666aee20"}, "M": {"id": "9a69d869-5c34-440a-b058-fe89ca39a209", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=9a69d869-5c34-440a-b058-fe89ca39a209"}, "L": {"id": "b7d4593e-9ba1-4f1d-8d17-b09f3a69f59b", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=b7d4593e-9ba1-4f1d-8d17-b09f3a69f59b"}, "XL": {"id": "4811b656-fb01-4fc0-89aa-4cc71c7dc1c9", "price": 58.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=4811b656-fb01-4fc0-89aa-4cc71c7dc1c9"}, "2XL": {"id": "136ea0e4-c417-4e9f-9b52-00ca6ca399e6", "price": 62.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=136ea0e4-c417-4e9f-9b52-00ca6ca399e6"}, "3XL": {"id": "31b5b1e2-256e-48cb-b2d3-fb8eadbba363", "price": 62.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/chicago-dallas-socal-2026-2027-world-series-prep-winged-hoodie?variant=31b5b1e2-256e-48cb-b2d3-fb8eadbba363"}}}, "APC-C35": {"sku": "APC-C35", "title": "8-Station Race Division Winged Crest Oversized Stealth Hoodie", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations", "price": 68.0, "image": "images/streetwear/apc-c35-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c35-white.png?v=20261026v3", "variants": {"XS": {"id": "53bfa640-177d-49d0-aded-dae4af96baba", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=53bfa640-177d-49d0-aded-dae4af96baba"}, "S": {"id": "e59206ce-4687-43b1-b5d3-ede760347a8b", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=e59206ce-4687-43b1-b5d3-ede760347a8b"}, "M": {"id": "bad9bd32-e0b6-4aac-b2ef-b166c3dbb9d1", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=bad9bd32-e0b6-4aac-b2ef-b166c3dbb9d1"}, "L": {"id": "a6299d99-0dbe-4342-a8ae-7dc86ba649e5", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=a6299d99-0dbe-4342-a8ae-7dc86ba649e5"}, "XL": {"id": "17774e46-713e-4e7d-a9a5-fa7fc448112d", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=17774e46-713e-4e7d-a9a5-fa7fc448112d"}, "2XL": {"id": "30d519fe-2887-45fa-97c4-538ac2a3e12f", "price": 72.01, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=30d519fe-2887-45fa-97c4-538ac2a3e12f"}, "3XL": {"id": "204314cd-c931-4819-bd3c-4e7d2045096d", "price": 72.37, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-heavyweight-recovery-hoodie-built-for-the-8-stations?variant=204314cd-c931-4819-bd3c-4e7d2045096d"}}}, "APC-C36": {"sku": "APC-C36", "title": "AeroMesh Lightweight Breathable Workout & Turf Tee  -  \"Built For Compromised Running\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running", "price": 38.0, "image": "images/streetwear/apc-c36-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c36-white.png?v=20261026v3", "variants": {"S": {"id": "20a671fa-a629-4b1a-83d7-52f3b44b1c48", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=20a671fa-a629-4b1a-83d7-52f3b44b1c48"}, "M": {"id": "db9752e0-3cb3-4a43-b134-955028adc222", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=db9752e0-3cb3-4a43-b134-955028adc222"}, "L": {"id": "ea1df055-96ab-44b8-8ed6-25357a1a2323", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=ea1df055-96ab-44b8-8ed6-25357a1a2323"}, "XL": {"id": "663e3316-511a-4372-aa92-497018ec0045", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=663e3316-511a-4372-aa92-497018ec0045"}, "2XL": {"id": "7c5b1f8f-4190-4378-912b-f73f07175d2c", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=7c5b1f8f-4190-4378-912b-f73f07175d2c"}, "3XL": {"id": "10d223af-9e57-4bb4-8be5-745a2d5ff422", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=10d223af-9e57-4bb4-8be5-745a2d5ff422"}, "4XL": {"id": "612196b3-a43d-4644-bd12-4b8fc5cde9fb", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/aeromeshtm-laser-vented-breathable-tech-shirt-built-for-compromised-running?variant=612196b3-a43d-4644-bd12-4b8fc5cde9fb"}}}, "APC-C37": {"sku": "APC-C37", "title": "Dry-Pace Lightweight Threshold Workout & Turf Tee  -  \"1km Split. Station. Repeat.\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat", "price": 38.0, "image": "images/streetwear/apc-c37-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c37-white.png?v=20261026v3", "variants": {"S": {"id": "583681fa-9dc6-4a20-8070-9621ce729ed2", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=583681fa-9dc6-4a20-8070-9621ce729ed2"}, "M": {"id": "33b52cc0-84b1-47cf-93d9-b1e62f3af5f0", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=33b52cc0-84b1-47cf-93d9-b1e62f3af5f0"}, "L": {"id": "0d6c5852-0b4e-4904-acef-9782ddec3eed", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=0d6c5852-0b4e-4904-acef-9782ddec3eed"}, "XL": {"id": "88c75bfc-e9a6-4740-8a92-b7b126d09a2d", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=88c75bfc-e9a6-4740-8a92-b7b126d09a2d"}, "2XL": {"id": "17e6911c-b121-4e28-8fcc-88e401162d02", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=17e6911c-b121-4e28-8fcc-88e401162d02"}, "3XL": {"id": "4a62b4e5-b94b-4176-b61d-b104f25325f3", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=4a62b4e5-b94b-4176-b61d-b104f25325f3"}, "4XL": {"id": "a6520576-18bf-4b1e-86ae-3c207f1047b9", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/dry-pacetm-moisture-wicking-threshold-tech-tee-1km-split-station-repeat?variant=a6520576-18bf-4b1e-86ae-3c207f1047b9"}}}, "APC-C38": {"sku": "APC-C38", "title": "VentTech Breathable Hybrid Conditioning Tee  -  \"Zone 4 / Zone 5 Engine\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine", "price": 38.0, "image": "images/streetwear/apc-c38-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c38-white.png?v=20261026v3", "variants": {"S": {"id": "277fd44c-15db-49a9-92a5-bd88aa4d3fa2", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=277fd44c-15db-49a9-92a5-bd88aa4d3fa2"}, "M": {"id": "a0432be5-8f80-4db0-9b82-8664c48d7b23", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=a0432be5-8f80-4db0-9b82-8664c48d7b23"}, "L": {"id": "3b1a3d13-ac15-4188-9c51-85e084b72db0", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=3b1a3d13-ac15-4188-9c51-85e084b72db0"}, "XL": {"id": "3a58907b-1f88-4088-9c75-335044b0040e", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=3a58907b-1f88-4088-9c75-335044b0040e"}, "2XL": {"id": "65e5d909-b61a-43ac-833f-a6b4204a0725", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=65e5d909-b61a-43ac-833f-a6b4204a0725"}, "3XL": {"id": "ee21708f-d305-4ba3-94a2-61c85799ef98", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=ee21708f-d305-4ba3-94a2-61c85799ef98"}, "4XL": {"id": "6dd520bf-8f9a-49fd-8422-7442c8932293", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/venttechtm-perforated-hybrid-training-shirt-zone-4-zone-5-engine?variant=6dd520bf-8f9a-49fd-8422-7442c8932293"}}}, "APC-C39": {"sku": "APC-C39", "title": "Featherweight 3.8 oz Breathable Race Tee  -  \"Zero Drag \u00b7 8 Stations \u00b7 Sub-60\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60", "price": 38.0, "image": "images/streetwear/apc-c39-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c39-white.png?v=20261026v3", "variants": {"S": {"id": "85f497c2-9b5a-417a-acaa-e74c7f8fa2f4", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=85f497c2-9b5a-417a-acaa-e74c7f8fa2f4"}, "M": {"id": "2f1684cb-4a8c-47fa-ab71-86b0ad63874e", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=2f1684cb-4a8c-47fa-ab71-86b0ad63874e"}, "L": {"id": "8a385777-34dc-4e54-88c3-4a4ab783ca97", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=8a385777-34dc-4e54-88c3-4a4ab783ca97"}, "XL": {"id": "b396e81b-a59b-4855-9d80-204b5da7d8e5", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=b396e81b-a59b-4855-9d80-204b5da7d8e5"}, "2XL": {"id": "0100472c-3efa-4624-9efd-adfdc6696920", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=0100472c-3efa-4624-9efd-adfdc6696920"}, "3XL": {"id": "5509dc19-fcaf-4561-be29-ac6f60f356c1", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=5509dc19-fcaf-4561-be29-ac6f60f356c1"}, "4XL": {"id": "53ac2cc0-1cf9-4ab4-8105-c5d69fd0f8e9", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/featherweight-3-8-oz-breathable-race-tee-zero-drag-8-stations-sub-60?variant=53ac2cc0-1cf9-4ab4-8105-c5d69fd0f8e9"}}}, "APC-C40": {"sku": "APC-C40", "title": "CoolCore Breathable Turf & Sled Conditioning Tee  -  \"Push Heavy. Run Fast.\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast", "price": 38.0, "image": "images/streetwear/apc-c40-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c40-white.png?v=20261026v3", "variants": {"S": {"id": "7448050c-3c2d-4e56-bbf8-c52c338e61a1", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=7448050c-3c2d-4e56-bbf8-c52c338e61a1"}, "M": {"id": "fce65b02-47b6-438b-9d20-103498d70f21", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=fce65b02-47b6-438b-9d20-103498d70f21"}, "L": {"id": "57e27a95-8741-4b00-8fc7-670a7c91b6a0", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=57e27a95-8741-4b00-8fc7-670a7c91b6a0"}, "XL": {"id": "d92261de-1f9d-421e-aaf6-ec27f4d7ce9f", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=d92261de-1f9d-421e-aaf6-ec27f4d7ce9f"}, "2XL": {"id": "aa6d646a-5495-47ef-816b-834d5eb2ef5a", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=aa6d646a-5495-47ef-816b-834d5eb2ef5a"}, "3XL": {"id": "b16d2ed1-b884-4cdb-a969-bccd1bbb850f", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=b16d2ed1-b884-4cdb-a969-bccd1bbb850f"}, "4XL": {"id": "54a99075-2070-42fe-92ad-3269aae5a44f", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/coolcoretm-anti-chafe-turf-sled-tech-shirt-push-heavy-run-fast?variant=54a99075-2070-42fe-92ad-3269aae5a44f"}}}, "APC-C41": {"sku": "APC-C41", "title": "HyperBreathe Breathable Roxzone Conditioning Tee  -  \"Roxzone Speed Dept.\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept", "price": 38.0, "image": "images/streetwear/apc-c41-black.png?v=20261026v3", "alt_image": "images/streetwear/apc-c41-white.png?v=20261026v3", "variants": {"S": {"id": "94a27f9d-b273-4cce-bc32-0d04ed95ff8d", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=94a27f9d-b273-4cce-bc32-0d04ed95ff8d"}, "M": {"id": "cd4cb1fc-9eef-46cd-a60d-8853b35c8b8e", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=cd4cb1fc-9eef-46cd-a60d-8853b35c8b8e"}, "L": {"id": "643813da-c3c4-45b3-99e0-31cd4df4cd04", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=643813da-c3c4-45b3-99e0-31cd4df4cd04"}, "XL": {"id": "99bfce11-d0d2-44c5-8f72-5b69f20f0f40", "price": 38.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=99bfce11-d0d2-44c5-8f72-5b69f20f0f40"}, "2XL": {"id": "a04c4874-fff1-4699-88c3-69dd9350ba3a", "price": 40.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=a04c4874-fff1-4699-88c3-69dd9350ba3a"}, "3XL": {"id": "7e74959a-29bb-4220-83d8-0c2770f0e7f4", "price": 42.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=7e74959a-29bb-4220-83d8-0c2770f0e7f4"}, "4XL": {"id": "791fed22-3303-4de9-8020-130c94f3c8a4", "price": 44.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hyperbreathetm-seamless-conditioning-tee-roxzone-speed-dept?variant=791fed22-3303-4de9-8020-130c94f3c8a4"}}}, "APC-C42": {"sku": "APC-C42", "title": "Apex AeroShell Lightweight Race Warmup Jacket \u2014 \"8\u00d71000M Corral Shell\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-lightweight-race-warmup-jacket-hybrid-division", "price": 68.0, "image": "images/streetwear/apc-c42-black.png", "alt_image": "images/streetwear/apc-c42-white.png", "variants": {"S": {"id": "1d4a10ad-8725-4c1c-af43-7b4a2e71df95", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-lightweight-race-warmup-jacket-hybrid-division?variant=1d4a10ad-8725-4c1c-af43-7b4a2e71df95"}, "M": {"id": "c48fde75-2fe3-4149-b445-d1be28665ad3", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-lightweight-race-warmup-jacket-hybrid-division?variant=c48fde75-2fe3-4149-b445-d1be28665ad3"}, "L": {"id": "05d3d05b-848a-4432-9c1e-0e7a9e1af7b5", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-lightweight-race-warmup-jacket-hybrid-division?variant=05d3d05b-848a-4432-9c1e-0e7a9e1af7b5"}, "XL": {"id": "ca8c2f5b-0134-4ac1-be71-0dcc205d3129", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-lightweight-race-warmup-jacket-hybrid-division?variant=ca8c2f5b-0134-4ac1-be71-0dcc205d3129"}, "2XL": {"id": "6d02c957-c50c-4bf7-847e-5ebf4fb5adfb", "price": 70.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/apex-lightweight-race-warmup-jacket-hybrid-division?variant=6d02c957-c50c-4bf7-847e-5ebf4fb5adfb"}}}, "APC-C43": {"sku": "APC-C43", "title": "Hybrid 8-Station Windbreaker Track Jacket \u2014 \"01 SkiErg to 08 Wall Balls\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hybrid-8-station-windbreaker-track-jacket-01-skierg-to-08-wall-balls", "price": 68.0, "image": "images/streetwear/apc-c43-black.png", "alt_image": "images/streetwear/apc-c43-white.png", "variants": {"S": {"id": "b984aded-2e52-44f9-8090-a1ba479c1569", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hybrid-8-station-windbreaker-track-jacket-01-skierg-to-08-wall-balls?variant=b984aded-2e52-44f9-8090-a1ba479c1569"}, "M": {"id": "7af66ca4-8176-4c5d-9925-ca7b0ee85d3f", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hybrid-8-station-windbreaker-track-jacket-01-skierg-to-08-wall-balls?variant=7af66ca4-8176-4c5d-9925-ca7b0ee85d3f"}, "L": {"id": "586a1a3e-cdc7-4b76-b2a9-61b2ef7b7519", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hybrid-8-station-windbreaker-track-jacket-01-skierg-to-08-wall-balls?variant=586a1a3e-cdc7-4b76-b2a9-61b2ef7b7519"}, "XL": {"id": "7d00e825-5ce2-451d-8344-35674f532034", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hybrid-8-station-windbreaker-track-jacket-01-skierg-to-08-wall-balls?variant=7d00e825-5ce2-451d-8344-35674f532034"}, "2XL": {"id": "0d56b749-acbb-4258-b3ad-ef382e503de8", "price": 70.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/hybrid-8-station-windbreaker-track-jacket-01-skierg-to-08-wall-balls?variant=0d56b749-acbb-4258-b3ad-ef382e503de8"}}}, "APC-C44": {"sku": "APC-C44", "title": "Pro Division Lightweight Quarter-Zip Shell \u2014 \"Sub-65 Warmup Track Top\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/pro-division-lightweight-quarter-zip-shell-sub-65-warmup-track-top", "price": 68.0, "image": "images/streetwear/apc-c44-black.png", "alt_image": "images/streetwear/apc-c44-white.png", "variants": {"S": {"id": "8c2368cd-b62d-4cd3-8a9a-e30ab0fe503b", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/pro-division-lightweight-quarter-zip-shell-sub-65-warmup-track-top?variant=8c2368cd-b62d-4cd3-8a9a-e30ab0fe503b"}, "M": {"id": "0f043a40-8885-434d-a9f0-a53012bdc10f", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/pro-division-lightweight-quarter-zip-shell-sub-65-warmup-track-top?variant=0f043a40-8885-434d-a9f0-a53012bdc10f"}, "L": {"id": "14cb80b7-74b4-43c9-839d-37b663f9de74", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/pro-division-lightweight-quarter-zip-shell-sub-65-warmup-track-top?variant=14cb80b7-74b4-43c9-839d-37b663f9de74"}, "XL": {"id": "3082fab9-42be-414f-a898-2c59c739fc38", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/pro-division-lightweight-quarter-zip-shell-sub-65-warmup-track-top?variant=3082fab9-42be-414f-a898-2c59c739fc38"}, "2XL": {"id": "937d9dda-1dc2-4164-9bab-47644a7650d6", "price": 70.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/pro-division-lightweight-quarter-zip-shell-sub-65-warmup-track-top?variant=937d9dda-1dc2-4164-9bab-47644a7650d6"}}}, "APC-C45": {"sku": "APC-C45", "title": "26/27 World Series Lightweight Warmup Jacket \u2014 \"Chicago \u00b7 Dallas \u00b7 SoCal \u00b7 NYC\"", "url": "https://apex-hybrid-co-shop.fourthwall.com/products/26-27-world-series-lightweight-warmup-jacket-chicago-dallas-socal-nyc", "price": 68.0, "image": "images/streetwear/apc-c45-black.png", "alt_image": "images/streetwear/apc-c45-white.png", "variants": {"S": {"id": "989cee7a-0737-4bfc-a693-9696f1ead10d", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/26-27-world-series-lightweight-warmup-jacket-chicago-dallas-socal-nyc?variant=989cee7a-0737-4bfc-a693-9696f1ead10d"}, "M": {"id": "9d933c04-3aef-4602-a7c9-df0429339bce", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/26-27-world-series-lightweight-warmup-jacket-chicago-dallas-socal-nyc?variant=9d933c04-3aef-4602-a7c9-df0429339bce"}, "L": {"id": "ec91cc61-cfae-4341-9766-97859144e369", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/26-27-world-series-lightweight-warmup-jacket-chicago-dallas-socal-nyc?variant=ec91cc61-cfae-4341-9766-97859144e369"}, "XL": {"id": "b6d8f181-3098-4d49-b582-b0b83ff1c97a", "price": 68.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/26-27-world-series-lightweight-warmup-jacket-chicago-dallas-socal-nyc?variant=b6d8f181-3098-4d49-b582-b0b83ff1c97a"}, "2XL": {"id": "7704d039-9dc8-4215-814a-d036480726bd", "price": 70.0, "url": "https://apex-hybrid-co-shop.fourthwall.com/products/26-27-world-series-lightweight-warmup-jacket-chicago-dallas-socal-nyc?variant=7704d039-9dc8-4215-814a-d036480726bd"}}}};

async function checkoutViaFourthwallApi(items, fallbackUrl) {
  try {
    toast("Opening secure checkout…");
    const cartItems = [];
    for (const item of items) {
      const entry = FW_VARIANTS[item.id];
      if (entry && entry.variants) {
        const sz = item.size || sizeChoice[item.id] || "L";
        const v = entry.variants[sz] || entry.variants.L || Object.values(entry.variants)[0];
        if (v && v.id) {
          cartItems.push({ id: v.id, quantity: Math.max(1, Number(item.qty) || 1) });
        }
      }
    }
    if (!cartItems.length) {
      if (fallbackUrl) window.location.href = fourthwallUrlWithPromo(fallbackUrl);
      return;
    }
    const addRes = await fetch("https://apex-hybrid-co-shop.fourthwall.com/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });
    if (!addRes.ok) throw new Error("cart_add_failed");
    const addData = await addRes.json();
    const cartId = addData && addData.cart && addData.cart.id;
    if (!cartId) throw new Error("no_cart_id");
    const chkRes = await fetch("https://apex-hybrid-co-shop.fourthwall.com/api/v2/checkout/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, cartCurrency: "USD" }),
    });
    if (!chkRes.ok) throw new Error("checkout_create_failed");
    const chkData = await chkRes.json();
    if (chkData && chkData.id) {
      const promoInfo = resolvePromo(activePromo);
      if (promoInfo) {
        const fwCode = promoInfo.code === "DADBOD10" ? "DADBOD10" : "COACHSU10";
        await fetch(`https://apex-hybrid-co-shop.fourthwall.com/api/v2/checkout/${encodeURIComponent(chkData.id)}/code`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: fwCode }),
        }).catch(() => {});
      }
      const checkoutUrl = `https://apex-hybrid-co-shop.fourthwall.com/checkout/${encodeURIComponent(chkData.id)}`;
      window.location.href = fourthwallUrlWithPromo(checkoutUrl);
      return;
    }
    throw new Error("no_checkout_id");
  } catch (_) {
    if (fallbackUrl) {
      window.location.href = fourthwallUrlWithPromo(fallbackUrl);
    }
  }
}

let activePromo = "";
try {
  activePromo = (sessionStorage.getItem("apx_promo_code") || "").trim().toUpperCase();
} catch (_) {}

function resolvePromo(code) {
  const c = String(code || "").trim().toUpperCase();
  if (!c) return null;
  if (PROMO_CODES[c]) return { code: c, pct: PROMO_CODES[c].pct, label: PROMO_CODES[c].label };
  if (c.length >= 4 && c.endsWith("20")) return { code: c, pct: 20, label: `${c} Partner (20% Off)` };
  if (c.length >= 4 && c.endsWith("15")) return { code: c, pct: 15, label: `${c} Partner (15% Off)` };
  if (c.length >= 4 && c.endsWith("10")) return { code: c, pct: 10, label: `${c} Partner (10% Off)` };
  return null;
}

function setPromoCode(rawCode, notify = true) {
  const info = resolvePromo(rawCode);
  if (!info) {
    if (rawCode && notify) toast(`Promo code "${String(rawCode).toUpperCase()}" is not valid`);
    return false;
  }
  activePromo = info.code;
  try {
    sessionStorage.setItem("apx_promo_code", activePromo);
  } catch (_) {}
  trackHit(`promo_${activePromo}`);
  if (notify) toast(`Promo ${activePromo} (${info.pct}% off) applied!`);
  renderCart();
  return true;
}

function clearPromoCode() {
  activePromo = "";
  try {
    sessionStorage.removeItem("apx_promo_code");
  } catch (_) {}
  renderCart();
}

function fourthwallUrlWithPromo(url) {
  if (!url) return url;
  const info = resolvePromo(activePromo);
  if (!info) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}discount=${encodeURIComponent(info.code)}&promo=${encodeURIComponent(info.code)}`;
}

let PRODUCTS = [];
let GUIDES = [];
let dept = "apparel";
let sort = "featured";
let query = "";
let cart = [];
let express = null;
const sizeChoice = {};
const colorChoice = {};
const blankChoice = {};

function hasBlankChoice(p) {
  if (!p) return false;
  return p.dept === "Tees & Pump Covers" || p.dept === "Breathable Tech Shirts" || p.dept === "Race City Editions";
}
function blankOf(p) {
  if (!p) return "heavy";
  if (blankChoice[p.id]) return blankChoice[p.id];
  return p.dept === "Breathable Tech Shirts" ? "light" : "heavy";
}
function blankLabel(p) {
  if (!hasBlankChoice(p)) return "";
  return blankOf(p) === "light"
    ? "3.8 oz Breathable Workout Tee"
    : "6.1 oz Heavyweight Cotton Tee";
}
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
  "APC-C36": "AeroMesh 4.0",
  "APC-C37": "Dry-Pace 1km",
  "APC-C38": "VentTech Z4",
  "APC-C39": "Featherweight 3.8",
  "APC-C40": "CoolCore Turf",
  "APC-C41": "HyperBreathe RX",
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
  "APC-C04": "Compromised Running Club",
  "APC-C05": "Burpee Broad Jumps",
  "APC-C06": "The Erg Doesn't Care",
  "APC-C07": "Porta-Potty Line PR",
  "APC-C08": "Defend My Sled Push",
  "APC-C34": "World Series hoodie",
  "APC-C35": "8-Station Division",
  "APC-C32": "Build Character",
  "APC-C33": "The Erg Doesn't Care",
  "APC-C09": "Warmup fleece",
  "APC-C10": "Bad Decisions hoodie",
  "APC-C11": "Running Club hoodie",
  "APC-C12": "The Footage Speaks",
  "APC-C42": "AeroShell Corral Jacket",
  "APC-C43": "08-Station Track Shell",
  "APC-C44": "Pro Quarter-Zip Shell",
  "APC-C45": "World Series Shell",
};

function shortTitle(p) {
  if (SHORT[p.id]) return SHORT[p.id];
  return p.title.split(" - ")[0].replace(/^["“]|["”]$/g, "").trim();
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
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
            ${swatches}
            <button class="Btn Btn--cobalt" type="button" data-buy="${p.id}" style="margin-left:auto;padding:7px 12px;font-size:12.5px;border-radius:6px">Buy Now →</button>
          </div>
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
  return [colorLabel(p), blankLabel(p), p.has_sizes ? `Size ${sizeOf(p)}` : ""].filter(Boolean).join(" · ");
}

function isFourthwallItem(p) {
  return Boolean(p && (p.fulfillment_partner === "Fourthwall" || String(p.id || "").startsWith("APC-C")));
}

function lineFrom(p, qty = 1) {
  const variant = variantLabel(p);
  const isFw = isFourthwallItem(p);
  return {
    key: `${p.id}__${variant}`,
    id: p.id,
    title: p.title,
    image: photoOf(p),
    price: p.retail_price,
    qty,
    size: sizeOf(p) || "L",
    blank: blankLabel(p),
    variant,
    is_fourthwall: isFw,
    fulfillment_partner: isFw ? "Fourthwall" : (p.fulfillment_partner || "US Warehouse Direct Wholesale"),
    fourthwall_blank: isFw ? (p.fourthwall_blank || "Athletic Blank") : "",
    fourthwall_handle: isFw ? (p.fourthwall_handle || p.handle || "") : "",
    fourthwall_product_url: isFw ? (p.fourthwall_product_url || p.checkout_url || "") : "",
    stripe_price_id: p.stripe_price_id || "",
    stripe_product_id: p.stripe_product_id || "",
    stripe_account_id: p.stripe_account_id || "",
  };
}

function addToCart(sku, openDrawer = true) {
  const p = findProduct(sku);
  if (!p) return;
  trackHit("cart_add_total");
  trackHit(`cart_add_${p.id}`);
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
    box.innerHTML = `<p class="Empty">Your bag is empty. Grab a race tee or warmup layer to get started.</p>`;
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
  const promoInfo = resolvePromo(activePromo);
  const discAmt = promoInfo ? sub * (promoInfo.pct / 100) : 0;
  const finalSub = Math.max(0, sub - discAmt);
  if (cart.length) {
    box.insertAdjacentHTML(
      "beforeend",
      `<div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb">
        <div style="display:flex;gap:6px;align-items:center">
          <input id="cartPromoInput" type="text" value="${esc(activePromo)}" placeholder="Promo code (e.g. COACHSU10)" style="flex:1;padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:12px;text-transform:uppercase" />
          <button type="button" class="Btn Btn--bone" data-apply-promo="cart" style="padding:7px 12px;font-size:12px">Apply</button>
        </div>
        ${promoInfo ? `<div style="display:flex;justify-content:space-between;font-size:12px;color:#059669;font-weight:700;margin-top:6px"><span>✓ ${esc(promoInfo.label)}</span><span>−${money(discAmt)}</span></div>` : ""}
      </div>`
    );
  }
  $("#cartSubtotal").textContent = promoInfo ? `${money(finalSub)} (${promoInfo.pct}% off)` : money(sub);
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
  trackHit("product_views_total");
  trackHit(`view_${p.id}`);
  const was = p.list_price && p.list_price > p.retail_price ? `<s>${money(p.list_price)}</s>` : "";
  const swatches = p.alt_image ? `
    <div class="Swatches" style="position:static;margin:12px 0">
      <button class="Swatch Swatch--black" type="button" data-color="black" data-sku="${p.id}" aria-label="Black" aria-pressed="${colorOf(p) === "black"}"></button>
      <button class="Swatch Swatch--bone" type="button" data-color="white" data-sku="${p.id}" aria-label="Bone" aria-pressed="${colorOf(p) === "white"}"></button>
      <span>Color: <strong>${esc(colorLabel(p))}</strong></span>
    </div>` : "";
  const blankSelector = hasBlankChoice(p) ? `
    <div class="BlankPicker">
      <span class="BlankPicker__label">Select Shirt Blank &amp; Material</span>
      <div class="BlankPicker__grid">
        <button class="BlankBtn" type="button" data-blank="heavy" data-sku="${p.id}" aria-pressed="${blankOf(p) === "heavy"}">
          <strong>6.1 oz Heavyweight Cotton</strong>
          <small>Garment-dyed ring-spun cotton pump cover · Boxy streetwear drape · Soft-hand cured print</small>
        </button>
        <button class="BlankBtn" type="button" data-blank="light" data-sku="${p.id}" aria-pressed="${blankOf(p) === "light"}">
          <strong>3.8 oz Breathable Workout Tee</strong>
          <small>Featherlight moisture-wicking race knit · Built for compromised running &amp; turf stations</small>
        </button>
      </div>
    </div>` : "";
  const sizes = p.has_sizes ? `<div class="Sizes" style="margin:12px 0">${["S", "M", "L", "XL", "2XL"].map((sz) => `
    <button class="SizeBtn" type="button" data-size="${sz}" data-sku="${p.id}" aria-pressed="${sizeOf(p) === sz}">${sz}</button>
  `).join("")}</div>` : "";
  const isFw = isFourthwallItem(p);
  const fulfillmentLine = `✓ Ships in 2 - 4 business days from our US hubs · Free 30-day size exchanges`;
  const buyBtnLabel = "Buy Now - Instant Checkout";
  $("#productModalContent").innerHTML = `
    <div class="ProductLayout">
      <div class="ProductLayout__photo"><img src="${esc(photoOf(p))}" alt="${esc(p.title)}" /></div>
      <div class="ProductLayout__copy">
        <div class="Card__dept">${esc(p.dept)} · ${esc(p.category || "")}</div>
        <h2>${esc(p.title)}</h2>
        <div class="Price"><span>${money(p.retail_price)}</span>${was}</div>
        <p style="margin-top:10px;font-size:13px;font-weight:600;color:#0f172a">${esc(fulfillmentLine)}</p>
        ${blankSelector}
        ${swatches}
        ${sizes}
        <div class="Card__actions" style="margin-top:14px;margin-bottom:14px">
          <button class="Btn Btn--cobalt" type="button" data-buy="${p.id}" style="font-weight:800">${esc(buyBtnLabel)} · ${money(p.retail_price)} →</button>
          <button class="Btn Btn--bone" type="button" data-add="${p.id}">Add to bag</button>
        </div>
        <p style="margin-top:10px">${esc(p.short_desc || "")}</p>
        <ul class="Highlights">${(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        ${p.review_quote ? `<blockquote class="Quote">${esc(p.review_quote)}</blockquote>` : ""}
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
  trackHit("checkout_clicks_total");
  bag.forEach((item) => { if (item && item.id) trackHit(`checkout_${item.id}`); });
  const fwBag = bag.filter((item) => item.is_fourthwall);
  if (fwBag.length) {
    const fallback = fwBag[0] ? fwBag[0].fourthwall_product_url : "https://apex-hybrid-co-shop.fourthwall.com";
    checkoutViaFourthwallApi(fwBag, fallback);
    return;
  }
  const rawSub = bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  const promoInfo = resolvePromo(activePromo);
  const discAmt = promoInfo ? rawSub * (promoInfo.pct / 100) : 0;
  const sub = Math.max(0, rawSub - discAmt);
  const hasFw = bag.some((item) => item.is_fourthwall);
  const hasWs = bag.some((item) => !item.is_fourthwall);
  const checkoutTitle = "Express Athlete Checkout";
  const checkoutDesc = "All apparel and recovery hardware ships free from our US hubs in 2–4 business days with 30-day easy exchanges.";
  const submitLabel = `Complete Order · ${money(sub)}`;
  $("#checkoutModalContent").innerHTML = `
    <h2 style="letter-spacing:-0.04em;font-size:32px">${esc(checkoutTitle)}</h2>
    <p style="color:#5e6672;margin:6px 0 14px">${esc(checkoutDesc)}</p>
    <div style="margin-bottom:14px">
      ${bag.map((item) => `
        <div class="Row"><span>${item.qty} × ${esc(item.title)} <span class="StripeId">${esc(item.variant)}</span></span><strong>${money(item.price * item.qty)}</strong></div>
        <div class="StripeId">Ships in 2–4 business days (US)${item.is_fourthwall && item.fourthwall_product_url ? ` · <a href="${esc(item.fourthwall_product_url)}" target="_blank" rel="noopener" style="color:#2563eb;font-weight:700">Instant 1-Click Checkout →</a>` : ""}</div>
      `).join("")}
      <div style="margin:10px 0;display:flex;gap:8px;align-items:center">
        <input id="checkoutPromoInput" type="text" value="${esc(activePromo)}" placeholder="Promo code (e.g. COACHSU10)" style="flex:1;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;text-transform:uppercase" />
        <button type="button" class="Btn Btn--bone" data-apply-promo="checkout" style="padding:8px 14px;font-size:13px">Apply Code</button>
      </div>
      ${promoInfo ? `<div class="Row" style="color:#059669;font-weight:700"><span>Promo (${esc(promoInfo.code)} · ${promoInfo.pct}% off)</span><strong>−${money(discAmt)}</strong></div>` : ""}
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
      <button class="Btn Btn--cobalt Btn--full" type="submit" style="margin-top:8px">${esc(submitLabel)}</button>
    </form>`;
  openSheet("checkoutModal");
  $("#checkoutForm").addEventListener("submit", submitOrder);
}

function submitOrder(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const bag = checkoutLines();
  const rawSub = bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  const promoInfo = resolvePromo(activePromo);
  const discAmt = promoInfo ? rawSub * (promoInfo.pct / 100) : 0;
  const sub = Math.max(0, rawSub - discAmt);
  const orderId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
  trackHit("order_submits_total");
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const street = String(data.get("street") || "").trim();
  const city = String(data.get("city") || "").trim();
  const zip = String(data.get("zip") || "").trim();
  const lines = bag.map((item) => {
    const stripe = [item.stripe_price_id, item.stripe_product_id, item.stripe_account_id].filter(Boolean).join(" | ");
    const fulfill = item.is_fourthwall ? `Fourthwall (${item.fourthwall_blank})` : "US Warehouse Direct Wholesale";
    return `- ${item.qty}x ${item.title} (${item.variant}) ${money(item.price * item.qty)} [Fulfillment: ${fulfill} | ${stripe}]`;
  }).join("\n");
  const hasFw = bag.some((item) => item.is_fourthwall);
  const subject = encodeURIComponent(`Order ${orderId}  -  ${hasFw ? "Fourthwall & Stripe" : "Stripe"} Checkout (${money(sub)})`);
  const promoLine = promoInfo ? `\nPromo Code: ${promoInfo.code} (${promoInfo.pct}% Off, -${money(discAmt)})` : "";
  const body = encodeURIComponent(`Order ID: ${orderId}\nCustomer: ${name} (${email})\nShip To: ${street}, ${city} ${zip}\nFulfillment: ${hasFw ? "Fourthwall US Apparel Production / Direct US Dispatch" : "US Warehouse Direct Wholesale"}${promoLine}\n\nItems:\n${lines}\n\nTotal: ${money(sub)} (Free US shipping)`);
  $("#checkoutModalContent").innerHTML = `
    <h2 style="letter-spacing:-0.04em;font-size:32px">Order ${esc(orderId)} is reserved</h2>
    <p style="margin:8px 0 14px">Thanks ${esc(name)}  -  your order is reserved for ${esc(city)} ${esc(zip)}. Click below to confirm your order and receive your instant payment and tracking link.</p>
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
  const blank = event.target.closest("[data-blank]");
  if (blank) {
    blankChoice[blank.dataset.sku] = blank.dataset.blank;
    if ($("#productModal").classList.contains("is-open")) openProduct(blank.dataset.sku);
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
  const fwLink = event.target.closest('a[href*="apex-hybrid-co-shop.fourthwall.com/products/"]');
  if (fwLink) {
    const href = fwLink.getAttribute("href") || "";
    const slug = href.split("?")[0].replace(/\/+$/, "").split("/").pop();
    const matchedSku = Object.keys(FW_VARIANTS).find((k) => (FW_VARIANTS[k].url || "").endsWith("/" + slug));
    if (matchedSku) {
      event.preventDefault();
      trackHit("checkout_clicks_total");
      trackHit(`checkout_${matchedSku}`);
      const p = findProduct(matchedSku) || { id: matchedSku, fourthwall_product_url: href };
      checkoutViaFourthwallApi([{ id: matchedSku, size: sizeChoice[matchedSku] || "L", qty: 1 }], p.fourthwall_product_url || href);
      return;
    }
  }
  const buy = event.target.closest("[data-buy]");
  if (buy) {
    const p = findProduct(buy.dataset.buy);
    if (p) {
      event.preventDefault();
      trackHit("checkout_clicks_total");
      trackHit(`checkout_${p.id}`);
      checkoutViaFourthwallApi([lineFrom(p)], p.fourthwall_product_url);
    }
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
  const promoBtn = event.target.closest("[data-apply-promo]");
  if (promoBtn) {
    const mode = promoBtn.dataset.applyPromo;
    const input = document.getElementById(mode === "checkout" ? "checkoutPromoInput" : "cartPromoInput");
    if (input) {
      const val = input.value.trim();
      if (!val) clearPromoCode();
      else setPromoCode(val, true);
      if (mode === "checkout") openCheckout(express);
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
  const urlPromo = params.get("promo") || params.get("discount") || params.get("code") || params.get("ref") || "";
  if (urlPromo) {
    setPromoCode(urlPromo, true);
  }
  const reqDept = params.get("dept") || "";
  if (reqDept) {
    dept = reqDept;
    renderProducts();
  }
  const reqQty = Math.max(1, parseInt(params.get("qty") || "1", 10) || 1);
  const buy = findProduct(params.get("buy") || "");
  const add = findProduct(params.get("add") || "");
  if (buy) {
    if (isFourthwallItem(buy)) {
      trackHit("checkout_clicks_total");
      trackHit(`checkout_${buy.id}`);
      checkoutViaFourthwallApi([lineFrom(buy, reqQty)], buy.fourthwall_product_url);
      return;
    }
    openCheckout([lineFrom(buy, reqQty)]);
  } else if (add) {
    if (params.get("checkout") === "1" && isFourthwallItem(add)) {
      trackHit("checkout_clicks_total");
      trackHit(`checkout_${add.id}`);
      checkoutViaFourthwallApi([lineFrom(add, reqQty)], add.fourthwall_product_url);
      return;
    }
    addToCart(add.id, true);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  trackHit("pageviews_total");
  trackHit("pageviews_home");
  try {
    if (!sessionStorage.getItem("apx_uv_tracked")) {
      sessionStorage.setItem("apx_uv_tracked", "1");
      trackHit("unique_sessions_total");
    }
  } catch (_) {}
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
  fetch("catalog.json?v=20261028v1")
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
