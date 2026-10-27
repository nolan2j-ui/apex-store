/* ==========================================================================
   Apex Hybrid Co. - Storefront Application
   Irvine, Orange County, CA · Built for the 8th Station & 8th Kilometer
   ========================================================================== */

(() => {
  'use strict';

  const STORAGE_KEY_CART = 'apex_cart_v3';
  const STORAGE_KEY_PROMO = 'apex_promo_v3';

  /* Lightweight First-Party Funnel Telemetry (Abacus Counter API + Referrer Tracking) */
  function trackEvent(eventName) {
    try {
      const clean = String(eventName || '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60);
      if (!clean) return;
      fetch(`https://abacus.jasoncameron.dev/hit/apexhybridco.com/${clean}`, {
        method: 'GET',
        mode: 'cors',
        keepalive: true
      }).catch(() => {});
    } catch (_) {}
  }
  window.apexTrack = trackEvent;

  function trackReferrerOnce() {
    try {
      if (sessionStorage.getItem('apex_ref_tracked')) return;
      sessionStorage.setItem('apex_ref_tracked', '1');
      const params = new URLSearchParams(window.location.search);
      const utm = (params.get('utm_source') || params.get('ref') || '').toLowerCase();
      const ref = (document.referrer || '').toLowerCase();
      const combined = `${utm} ${ref}`;
      if (combined.includes('tiktok')) trackEvent('ref_tiktok');
      else if (combined.includes('pinterest') || combined.includes('pinimg')) trackEvent('ref_pinterest');
      else if (combined.includes('instagram') || combined.includes('ig')) trackEvent('ref_ig');
      else if (combined.includes('google') || combined.includes('bing')) trackEvent('ref_google');
      else trackEvent('ref_direct');
    } catch (_) {}
  }

  const PROMO_CODES = {
    HYROX10:    { code: 'HYROX10',    pct: 10, label: '10% Athlete Welcome Discount' },
    APEX10:     { code: 'APEX10',     pct: 10, label: '10% Welcome Discount' },
    DADBOD10:   { code: 'DADBOD10',   pct: 10, label: '10% Everyday Athlete Discount' },
    COACHSU10:  { code: 'COACHSU10',  pct: 10, label: '10% Coach Suzanna Partner Code' },
    ROXZONE10:  { code: 'ROXZONE10',  pct: 10, label: '10% Race Prep Discount' },
    CANCUN15:   { code: 'CANCUN15',   pct: 15, label: '15% Cancun Race Block Discount' },
    TEAM15:     { code: 'TEAM15',     pct: 15, label: '15% Doubles & Team Pack Discount' },
    DOUBLES15:  { code: 'DOUBLES15',  pct: 15, label: '15% Doubles Partner Pack' },
    SQUAD20:    { code: 'SQUAD20',    pct: 20, label: '20% Affiliate Box / 5+ Shirt Squad Rate' }
  };

  const APPAREL_DEPTS = new Set([
    'Tees & Pump Covers',
    'Race City Editions',
    'Hoodies & Tanks'
  ]);

  const PILLS = [
    { key: 'apparel',       label: 'All Apparel',          match: p => APPAREL_DEPTS.has(p.dept) },
    { key: 'tees',          label: 'Workout & Turf Tees',  match: p => p.dept === 'Tees & Pump Covers' },
    { key: 'cities',        label: 'City Editions',        match: p => p.dept === 'Race City Editions' },
    { key: 'hoodies-tanks', label: 'Hoodies & Tanks',      match: p => p.dept === 'Hoodies & Tanks' }
  ];

  const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

  const state = {
    catalog: null,
    products: [],
    byId: new Map(),
    activePill: 'apparel',
    searchQuery: '',
    sortBy: 'featured',
    cart: loadCart(),
    promo: loadPromo(),
    activeModalProduct: null,
    activeModalSize: 'L',
    activeModalColor: 'Black',
    activeModalBlank: '6.1 oz Heavyweight Cotton'
  };

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CART);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
    } catch (_) {}
  }

  function loadPromo() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROMO);
      if (!raw) return null;
      const code = String(raw).trim().toUpperCase();
      return PROMO_CODES[code] || null;
    } catch (_) {
      return null;
    }
  }

  function savePromo(promoObj) {
    state.promo = promoObj || null;
    try {
      if (state.promo) localStorage.setItem(STORAGE_KEY_PROMO, state.promo.code);
      else localStorage.removeItem(STORAGE_KEY_PROMO);
    } catch (_) {}
  }

  function applyPromoCode(rawCode) {
    const clean = String(rawCode || '').trim().toUpperCase();
    if (!clean) {
      savePromo(null);
      updateCartUI();
      return { ok: false, msg: 'Promo code cleared.' };
    }
    const found = PROMO_CODES[clean];
    if (!found) {
      return { ok: false, msg: `Code "${clean}" not recognized. Try HYROX10 (10% off) or TEAM15 (15% off 2+ items).` };
    }
    savePromo(found);
    updateCartUI();
    trackEvent('promo_applied');
    trackEvent(`promo_${found.code}`);
    return { ok: true, promo: found, msg: `${found.code} applied: ${found.label}!` };
  }

  const fmtPrice = n => {
    const num = Number(n) || 0;
    return Number.isInteger(num) ? `$${num}` : `$${num.toFixed(2)}`;
  };

  const escapeHtml = str =>
    String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  function cleanDisplayTitle(p) {
    return String(p.title || '')
      .replace(/^"|"$/g, '')
      .replace(/™/g, '')
      .replace(/—/g, ' - ')
      .trim();
  }

  function shortTagFor(p) {
    const idNum = parseInt(String(p.id || '').replace('APC-C', ''), 10) || 0;
    if (idNum >= 36 && idNum <= 41) return 'Lightweight 3.8 oz Workout Knit / 6.1 oz Turf Option';
    if (idNum >= 16 && idNum <= 21) return 'Race City Edition · 6.1 oz Ring-Spun Cotton';
    if (idNum >= 28 && idNum <= 31) return 'Sleeveless Turf Muscle Tank';
    if ([9, 10, 11, 12, 32, 33, 34, 35].includes(idNum)) return 'Heavyweight Warmup Fleece Hoodie';
    return '6.1 oz Heavyweight Cotton + Lightweight Option';
  }

  function buildFourthwallUrl(p) {
    let targetUrl = p.fourthwall_checkout_url || p.fourthwall_product_url || p.checkout_url || 'https://apex-hybrid-co-shop.fourthwall.com';
    if (state.promo) {
      const sep = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${sep}discount=${encodeURIComponent(state.promo.code)}&promo=${encodeURIComponent(state.promo.code)}`;
    }
    return targetUrl;
  }

  function renderPills(containerId, activeKey) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = PILLS.map(pill => {
      const count = state.products.filter(pill.match).length;
      const isActive = pill.key === activeKey;
      return `
        <button
          type="button"
          class="Pill ${isActive ? 'is-active' : ''}"
          data-pill="${pill.key}"
          aria-pressed="${isActive ? 'true' : 'false'}"
        >
          ${escapeHtml(pill.label)}<span class="Pill__count">${count}</span>
        </button>
      `;
    }).join('');

    el.querySelectorAll('[data-pill]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-pill');
        state.activePill = key;
        renderPills('apparelPills', state.activePill);
        renderApparelGrid();
      });
    });
  }

  function productCardMarkup(p) {
    const price = Number(p.retail_price) || 38;
    const tag = shortTagFor(p);
    const title = cleanDisplayTitle(p);
    const hasSizes = Boolean(p.has_sizes);
    const hasColors = Boolean(p.has_colorways && p.alt_image);
    const defaultSize = 'L';
    const isHoodie = [9, 10, 11, 12, 32, 33, 34, 35].includes(parseInt(String(p.id || '').replace('APC-C', ''), 10));
    const whiteName = isHoodie ? 'Bone' : 'White';

    const badgeHtml = p.badge
      ? `<span class="Product__badge ${p.badge.toLowerCase().includes('new') || p.badge.toLowerCase().includes('pro') || p.badge.toLowerCase().includes('2026') ? 'Product__badge--lime' : ''}">${escapeHtml(p.badge)}</span>`
      : '';

    const swatchesHtml = hasColors
      ? `
        <div class="Product__swatches" role="group" aria-label="Colorway">
          <button type="button" class="Swatch Swatch--black is-active" data-swatch-color="Black" data-swatch-src="${escapeHtml(p.image)}" title="Stealth Black" aria-label="Stealth Black"></button>
          <button type="button" class="Swatch Swatch--white" data-swatch-color="${whiteName}" data-swatch-src="${escapeHtml(p.alt_image)}" title="${whiteName}" aria-label="${whiteName}"></button>
        </div>
      `
      : '';

    const sizesHtml = hasSizes
      ? `
        <div class="Product__sizes" role="group" aria-label="Select size">
          ${SIZES.map(sz => `
            <button
              type="button"
              class="SizeBtn ${sz === defaultSize ? 'is-active' : ''}"
              data-size="${sz}"
            >${sz}</button>
          `).join('')}
        </div>
      `
      : '';

    const fwUrl = buildFourthwallUrl(p);

    return `
      <article class="Product" data-product-id="${escapeHtml(p.id)}" data-selected-size="${hasSizes ? defaultSize : ''}" data-selected-color="Black">
        <div class="Product__media" data-open-modal="${escapeHtml(p.id)}">
          ${badgeHtml}
          <img
            class="Product__img"
            src="${escapeHtml(p.image)}"
            alt="${escapeHtml(title)}"
            loading="lazy"
            decoding="async"
          />
          ${swatchesHtml}
          <span class="Product__quick">Quick View &amp; Fabric Specs</span>
        </div>

        <div class="Product__body">
          <div class="Product__meta">
            <span class="Product__cat">${escapeHtml(tag)}</span>
            <span class="Product__sku" style="font-family:var(--font-mono);font-size:11px;color:var(--ink-4);">${escapeHtml(p.id)}</span>
          </div>

          <h3 class="Product__title" data-open-modal="${escapeHtml(p.id)}">${escapeHtml(title)}</h3>

          <p class="Product__desc">${escapeHtml(p.short_desc || '')}</p>

          <div class="Product__foot">
            <div class="Product__priceRow">
              <div class="Product__price">
                <span class="Product__priceNow">${fmtPrice(price)}</span>
              </div>
              <span class="Product__ship">Ships in 2-5 Days · Soft-Hand Cured Print</span>
            </div>

            ${sizesHtml}

            <div class="Product__actions" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <button type="button" class="Product__add" data-add-to-cart="${escapeHtml(p.id)}">
                <span>Add to Bag</span>
                <span aria-hidden="true">+</span>
              </button>
              <a
                href="${escapeHtml(fwUrl)}"
                class="Product__buyNow"
                data-direct-buy="${escapeHtml(p.id)}"
                style="display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 12px;border-radius:4px;background:var(--lime);color:#090A0C;font-family:var(--font-mono);font-size:11.5px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;transition:opacity 0.15s;"
              >
                <span>Buy Now</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function filterAndSort(list) {
    const q = state.searchQuery.trim().toLowerCase();
    let out = list;

    if (q) {
      out = out.filter(p => {
        const hay = `${p.id} ${p.title} ${p.category} ${p.dept} ${p.short_desc || ''}`.toLowerCase();
        return hay.includes(q);
      });
    }

    switch (state.sortBy) {
      case 'price-asc':
        out = [...out].sort((a, b) => (Number(a.retail_price) || 0) - (Number(b.retail_price) || 0));
        break;
      case 'price-desc':
        out = [...out].sort((a, b) => (Number(b.retail_price) || 0) - (Number(a.retail_price) || 0));
        break;
      default:
        break;
    }

    return out;
  }

  function renderApparelGrid() {
    const grid = document.getElementById('apparelGrid');
    const countEl = document.getElementById('apparelCount');
    if (!grid) return;

    const pill = PILLS.find(p => p.key === state.activePill) || PILLS[0];
    const base = state.products.filter(pill.match);
    const items = filterAndSort(base);

    if (countEl) {
      countEl.textContent = `${items.length} ${items.length === 1 ? 'piece' : 'pieces'}`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="EmptyState">
          <p class="EmptyState__title">No matching pieces found.</p>
          <p class="EmptyState__sub">Try clearing your search filter or viewing All Apparel.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(productCardMarkup).join('');
    bindCardEvents(grid);
  }

  function bindCardEvents(root) {
    root.querySelectorAll('.Product__swatches .Swatch').forEach(sw => {
      sw.addEventListener('click', e => {
        e.stopPropagation();
        const card = sw.closest('.Product');
        if (!card) return;
        card.querySelectorAll('.Swatch').forEach(b => b.classList.remove('is-active'));
        sw.classList.add('is-active');
        const newColor = sw.getAttribute('data-swatch-color') || 'Black';
        const newSrc = sw.getAttribute('data-swatch-src');
        card.setAttribute('data-selected-color', newColor);
        const img = card.querySelector('.Product__img');
        if (img && newSrc) img.src = newSrc;
      });
    });

    root.querySelectorAll('.Product__sizes .SizeBtn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const card = btn.closest('.Product');
        if (!card) return;
        card.querySelectorAll('.SizeBtn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        card.setAttribute('data-selected-size', btn.getAttribute('data-size') || 'L');
      });
    });

    root.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.getAttribute('data-add-to-cart');
        const card = btn.closest('.Product');
        const size = card ? card.getAttribute('data-selected-size') || 'L' : 'L';
        const color = card ? card.getAttribute('data-selected-color') || 'Black' : 'Black';
        addToCart(id, size, 1, color);

        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Added to Bag</span><span>&#10003;</span>';
        setTimeout(() => {
          btn.innerHTML = orig;
        }, 900);
      });
    });

    root.querySelectorAll('[data-direct-buy]').forEach(link => {
      link.addEventListener('click', e => {
        e.stopPropagation();
        const id = link.getAttribute('data-direct-buy');
        const p = state.byId.get(id);
        trackEvent('fourthwall_redirect');
        trackEvent(`fw_${id}`);
        if (p) {
          link.href = buildFourthwallUrl(p);
        }
      });
    });

    root.querySelectorAll('[data-open-modal]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-open-modal');
        openProductModal(id);
      });
    });
  }

  function openProductModal(productId) {
    const p = state.byId.get(productId);
    const modal = document.getElementById('productModal');
    const body = document.getElementById('productModalBody');
    if (!p || !modal || !body) return;

    trackEvent('product_view');
    trackEvent(`view_${p.id}`);

    state.activeModalProduct = p;
    state.activeModalSize = 'L';
    state.activeModalColor = 'Black';
    state.activeModalBlank = '6.1 oz Heavyweight Cotton';

    const price = Number(p.retail_price) || 38;
    const title = cleanDisplayTitle(p);
    const tag = shortTagFor(p);
    const highlights = Array.isArray(p.highlights) ? p.highlights : [];
    const hasColors = Boolean(p.has_colorways && p.alt_image);
    const idNum = parseInt(String(p.id || '').replace('APC-C', ''), 10) || 0;
    const isHoodie = [9, 10, 11, 12, 32, 33, 34, 35].includes(idNum);
    const isTank = idNum >= 28 && idNum <= 31;
    const whiteName = isHoodie ? 'Bone' : 'White';
    const fwUrl = buildFourthwallUrl(p);

    const colorPickerHtml = hasColors
      ? `
        <div>
          <div class="Modal__optionLabel">Colorway · <span id="modalColorLabel">Stealth Black</span></div>
          <div class="Modal__sizes" id="modalColors">
            <button type="button" class="SizeBtn is-active" data-modal-color="Black" data-modal-img="${escapeHtml(p.image)}" style="padding:0 14px;width:auto;">Stealth Black</button>
            <button type="button" class="SizeBtn" data-modal-color="${whiteName}" data-modal-img="${escapeHtml(p.alt_image)}" style="padding:0 14px;width:auto;">${whiteName}</button>
          </div>
        </div>
      `
      : '';

    const blankPickerHtml = (!isHoodie && !isTank)
      ? `
        <div>
          <div class="Modal__optionLabel">Blank Weight · <span id="modalBlankLabel">6.1 oz Heavyweight Pump Cover (100% Ring-Spun Cotton)</span></div>
          <div class="Modal__sizes" id="modalBlanks" style="display:flex;flex-wrap:wrap;gap:8px;">
            <button type="button" class="SizeBtn is-active" data-modal-blank="6.1 oz Heavyweight Cotton" style="padding:0 12px;width:auto;">6.1 oz Heavyweight Pump Cover</button>
            <button type="button" class="SizeBtn" data-modal-blank="3.8 oz Lightweight Workout Knit" style="padding:0 12px;width:auto;">3.8 oz ASICS-Style Breathable Workout Fit</button>
          </div>
        </div>
      `
      : '';

    body.innerHTML = `
      <div class="Modal__media">
        <img id="modalProductImg" src="${escapeHtml(p.image)}" alt="${escapeHtml(title)}" />
      </div>
      <div class="Modal__info">
        <span class="Modal__eyebrow">${escapeHtml(tag)} · ${escapeHtml(p.id)}</span>
        <h2 class="Modal__title">${escapeHtml(title)}</h2>

        <div class="Modal__priceRow">
          <span class="Modal__priceNow">${fmtPrice(price)}</span>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--lime);">Exact Checkout Price · No Hidden Markup</span>
        </div>

        <p class="Modal__desc">${escapeHtml(p.short_desc || '')}</p>

        ${highlights.length ? `
          <ul class="Modal__highlights">
            ${highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>
        ` : ''}

        ${colorPickerHtml}
        ${blankPickerHtml}

        ${p.has_sizes ? `
          <div>
            <div class="Modal__optionLabel">Select Size (Unisex Athletic Fit · True to Size or Size Up for Oversized Pump Cover)</div>
            <div class="Modal__sizes" id="modalSizes">
              ${SIZES.map(sz => `
                <button
                  type="button"
                  class="SizeBtn ${sz === state.activeModalSize ? 'is-active' : ''}"
                  data-modal-size="${sz}"
                >${sz}</button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="Modal__actions">
          <a
            href="${escapeHtml(fwUrl)}"
            class="Btn Btn--lime Btn--full"
            id="modalBuyNowBtn"
            style="text-align:center;justify-content:center;"
          >
            Instant Checkout on Fourthwall &middot; ${fmtPrice(price)} &rarr;
          </a>
          <button type="button" class="Btn Btn--ghost Btn--full" id="modalAddBtn">
            Add to Multi-Item Bag
          </button>
        </div>

        <p class="Modal__ship">
          <strong>Fast US Fulfillment · Ships in 2-5 Business Days · 100% Quality Guarantee</strong> · Breathable soft-hand cured ink that never cracks or feels like plastic. Questions? Text/call Irvine HQ at <a href="tel:+19498054935" style="color:var(--lime);">(949) 805-4935</a>.
        </p>
      </div>
    `;

    body.querySelectorAll('[data-modal-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('[data-modal-color]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.activeModalColor = btn.getAttribute('data-modal-color') || 'Black';
        const imgUrl = btn.getAttribute('data-modal-img');
        const imgEl = document.getElementById('modalProductImg');
        const lblEl = document.getElementById('modalColorLabel');
        if (imgEl && imgUrl) imgEl.src = imgUrl;
        if (lblEl) lblEl.textContent = btn.textContent;
      });
    });

    body.querySelectorAll('[data-modal-blank]').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('[data-modal-blank]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.activeModalBlank = btn.getAttribute('data-modal-blank') || '6.1 oz Heavyweight Cotton';
        const lblEl = document.getElementById('modalBlankLabel');
        if (lblEl) lblEl.textContent = btn.textContent;
      });
    });

    body.querySelectorAll('[data-modal-size]').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('[data-modal-size]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.activeModalSize = btn.getAttribute('data-modal-size') || 'L';
      });
    });

    const addBtn = document.getElementById('modalAddBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(p.id, p.has_sizes ? state.activeModalSize : '', 1, state.activeModalColor);
        closeProductModal();
        openCartDrawer();
      });
    }

    const buyBtn = document.getElementById('modalBuyNowBtn');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        trackEvent('fourthwall_redirect');
        trackEvent(`fw_${p.id}`);
      });
    }

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function addToCart(productId, size = 'L', qty = 1, color = 'Black') {
    const p = state.byId.get(productId);
    if (!p) return;

    trackEvent('add_to_cart');
    trackEvent(`cart_${p.id}`);

    const cleanSize = p.has_sizes ? (size || 'L') : '';
    const cleanColor = p.has_colorways ? (color || 'Black') : '';
    const key = `${p.id}__${cleanSize}__${cleanColor}`;
    const existing = state.cart.find(item => item.key === key);

    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        key,
        id: p.id,
        title: cleanDisplayTitle(p),
        price: Number(p.retail_price) || 38,
        image: cleanColor && cleanColor !== 'Black' && p.alt_image ? p.alt_image : p.image,
        size: cleanSize,
        color: cleanColor,
        qty,
        fourthwall_url: p.fourthwall_checkout_url || p.fourthwall_product_url || p.checkout_url || 'https://apex-hybrid-co-shop.fourthwall.com'
      });
    }

    // Automatically apply TEAM15 (15% off) when adding 2+ items if no promo is active yet
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (totalQty >= 2 && !state.promo) {
      savePromo(PROMO_CODES.TEAM15);
    }

    saveCart();
    updateCartUI();
  }

  function updateItemQty(key, delta) {
    const idx = state.cart.findIndex(item => item.key === key);
    if (idx === -1) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    saveCart();
    updateCartUI();
  }

  function cartTotals() {
    const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discountPct = state.promo ? state.promo.pct : 0;
    const discountAmount = Math.round(subtotal * (discountPct / 100) * 100) / 100;
    const total = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);
    return { count, subtotal, discountPct, discountAmount, total };
  }

  function updateCartUI() {
    const { count, subtotal, discountPct, discountAmount, total } = cartTotals();

    const countEl = document.getElementById('bagCount');
    if (countEl) countEl.textContent = String(count);

    const subEl = document.getElementById('cartSubtotal');
    if (subEl) {
      if (discountAmount > 0 && state.promo) {
        subEl.innerHTML = `<span style="text-decoration:line-through;color:var(--ink-3);font-size:14px;margin-right:6px;">${fmtPrice(subtotal)}</span> ${fmtPrice(total)} <span style="display:block;font-size:11px;color:var(--lime);font-weight:500;">${escapeHtml(state.promo.code)} (-${discountPct}% / -${fmtPrice(discountAmount)})</span>`;
      } else {
        subEl.textContent = fmtPrice(subtotal);
      }
    }

    const promoStatusEl = document.getElementById('cartPromoStatus');
    const promoInputEl = document.getElementById('cartPromoInput');
    if (promoStatusEl) {
      if (state.promo) {
        promoStatusEl.innerHTML = `<span style="color:var(--lime);">&#10003; ${escapeHtml(state.promo.code)} active (${escapeHtml(state.promo.label)})</span>`;
        if (promoInputEl && !promoInputEl.value) promoInputEl.value = state.promo.code;
      } else {
        promoStatusEl.innerHTML = `<span style="color:var(--ink-3);">Use code <strong>HYROX10</strong> (10% off) or <strong>TEAM15</strong> (15% off 2+ shirts)</span>`;
      }
    }

    const listEl = document.getElementById('cartItems');
    if (!listEl) return;

    if (state.cart.length === 0) {
      listEl.innerHTML = `
        <div class="Drawer__empty">
          <p>Your bag is empty.</p>
          <p style="margin-top:6px;font-size:12px;">Select a 6.1 oz Heavyweight Pump Cover or 3.8 oz Breathable Workout Tee to get started.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = state.cart.map(item => {
      const p = state.byId.get(item.id);
      const itemFwUrl = p ? buildFourthwallUrl(p) : (item.fourthwall_url || 'https://apex-hybrid-co-shop.fourthwall.com');
      return `
        <div class="CartItem">
          <img class="CartItem__img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
          <div>
            <div class="CartItem__title">${escapeHtml(item.title)}</div>
            <div class="CartItem__meta">
              ${item.color ? `Color: ${escapeHtml(item.color)} · ` : ''}${item.size ? `Size ${escapeHtml(item.size)} · ` : ''}${fmtPrice(item.price)}
            </div>
            <div class="CartItem__qty">
              <button type="button" data-qty-delta="-1" data-qty-key="${escapeHtml(item.key)}" aria-label="Decrease quantity">&minus;</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-delta="1" data-qty-key="${escapeHtml(item.key)}" aria-label="Increase quantity">+</button>
              <a href="${escapeHtml(itemFwUrl)}" style="margin-left:8px;font-family:var(--font-mono);font-size:10.5px;color:var(--lime);text-decoration:underline;">Checkout Item &rarr;</a>
            </div>
          </div>
          <div class="CartItem__price">${fmtPrice(item.price * item.qty)}</div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('[data-qty-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-qty-key');
        const delta = Number(btn.getAttribute('data-qty-delta')) || 0;
        updateItemQty(key, delta);
      });
    });
  }

  function openCartDrawer() {
    const d = document.getElementById('cartDrawer');
    if (!d) return;
    d.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    const d = document.getElementById('cartDrawer');
    if (!d) return;
    d.hidden = true;
    document.body.style.overflow = '';
  }

  /* Direct Fourthwall Checkout (No mailto form!) */
  function proceedToFourthwallCheckout() {
    if (state.cart.length === 0) return;
    trackEvent('checkout_click');
    trackEvent('fourthwall_redirect');

    if (state.promo && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(state.promo.code).catch(() => {});
    }

    const firstItem = state.cart[0];
    const p = state.byId.get(firstItem.id);
    const targetUrl = p ? buildFourthwallUrl(p) : (firstItem.fourthwall_url || 'https://apex-hybrid-co-shop.fourthwall.com');
    window.location.href = targetUrl;
  }

  function bindGlobalEvents() {
    document.querySelectorAll('[data-open-Modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-Modal');
        openProductModal(id);
      });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value || '';
        renderApparelGrid();
      });
    }

    const sortSelect = document.getElementById('apparelSort');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        state.sortBy = e.target.value || 'featured';
        renderApparelGrid();
      });
    }

    document.querySelectorAll('[data-filter-Select]').forEach(link => {
      link.addEventListener('click', () => {
        const key = link.getAttribute('data-filter-Select');
        if (!key) return;
        state.activePill = key;
        renderPills('apparelPills', state.activePill);
        renderApparelGrid();
      });
    });

    document.querySelectorAll('[data-city-Select]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-city-Select');
        trackEvent('city_click');
        if (id) trackEvent(`city_${id}`);
        if (id && state.byId.has(id)) {
          openProductModal(id);
        }
      });
    });

    const openBagBtn = document.getElementById('openBagBtn');
    if (openBagBtn) openBagBtn.addEventListener('click', openCartDrawer);

    document.querySelectorAll('[data-close-drawer]').forEach(el => {
      el.addEventListener('click', closeCartDrawer);
    });

    document.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeProductModal);
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', proceedToFourthwallCheckout);

    const promoApplyBtn = document.getElementById('cartPromoApplyBtn');
    const promoInputEl = document.getElementById('cartPromoInput');
    if (promoApplyBtn && promoInputEl) {
      promoApplyBtn.addEventListener('click', () => {
        const res = applyPromoCode(promoInputEl.value);
        const statusEl = document.getElementById('cartPromoStatus');
        if (statusEl) {
          statusEl.innerHTML = res.ok
            ? `<span style="color:var(--lime);">&#10003; ${escapeHtml(res.msg)}</span>`
            : `<span style="color:#ff6b6b;">${escapeHtml(res.msg)}</span>`;
        }
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeProductModal();
        closeCartDrawer();
      }
    });
  }

  async function init() {
    trackEvent('pageview_total');
    trackEvent('pageview_home');
    trackReferrerOnce();

    bindGlobalEvents();
    updateCartUI();

    try {
      const res = await fetch('catalog.json?v=20261026v3', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.catalog = data;
      state.products = Array.isArray(data.products) ? data.products : [];
      state.byId = new Map(state.products.map(p => [p.id, p]));

      renderPills('apparelPills', state.activePill);
      renderApparelGrid();

      const params = new URLSearchParams(window.location.search);
      const urlPromo = params.get('promo') || params.get('discount') || params.get('code');
      if (urlPromo) {
        applyPromoCode(urlPromo);
      }
      const buySku = params.get('buy') || params.get('sku');
      if (buySku && state.byId.has(buySku.toUpperCase())) {
        const sku = buySku.toUpperCase();
        openProductModal(sku);
      }
    } catch (err) {
      console.error('Failed to load catalog.json:', err);
      const grid = document.getElementById('apparelGrid');
      if (grid) {
        grid.innerHTML = `
          <div class="EmptyState">
            <p class="EmptyState__title">Unable to load catalog right now.</p>
            <p class="EmptyState__sub">Please refresh the page or visit our <a href="https://apex-hybrid-co-shop.fourthwall.com" style="color:var(--lime);">Official Fourthwall Storefront</a>.</p>
          </div>
        `;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
