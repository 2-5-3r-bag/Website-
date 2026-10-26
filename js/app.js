const STORAGE = {
  users: "zb_users",
  session: "zb_session",
  cart: "zb_cart",
  wishlist: "zb_wishlist",
  orders: "zb_orders"
};

function productImage(product) {
  return product.image || DEFAULT_PERFUME_IMAGE;
}

function notesImage(product) {
  return product.notesImage || DEFAULT_NOTES_IMAGE;
}

function formatPrice(n) {
  if (!Number.isFinite(Number(n)) || Number(n) <= 0) return "Үнэ лавлах";
  return new Intl.NumberFormat("mn-MN").format(n) + " ₮";
}

function purchaseAction(product, label) {
  if (product.price > 0) {
    return `<button class="btn primary" data-add="${product.id}">${label || "Сагсанд"}</button>`;
  }
  return '<a class="btn primary" href="salbar.html">Үнэ лавлах</a>';
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function currentUser() {
  return localStorage.getItem(STORAGE.session);
}

function users() {
  return readJson(STORAGE.users, {});
}

function cart() {
  const items = readJson(STORAGE.cart, []);
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && findProduct(item.id))
    .map((item) => ({ id: item.id, qty: Math.max(1, Number(item.qty) || 1) }));
}

function wishlistMap() {
  return readJson(STORAGE.wishlist, {});
}

function wishlist() {
  const email = currentUser();
  if (!email) return [];
  return wishlistMap()[email] || [];
}

function orders() {
  return readJson(STORAGE.orders, {});
}

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function cartCount() {
  return cart().reduce((sum, item) => sum + item.qty, 0);
}

function requireAuth(next) {
  if (!currentUser()) {
    window.location.href = "login.html?next=" + encodeURIComponent(next || "profile.html");
    return false;
  }
  return true;
}

function updateChrome() {
  const email = currentUser();
  const auth = document.querySelector("[data-auth-link]");
  if (auth) {
    if (email) {
      auth.textContent = "Профайл";
      auth.setAttribute("href", "profile.html");
    } else {
      auth.textContent = "Нэвтрэх";
      auth.setAttribute("href", "login.html");
    }
  }
  const count = document.querySelector("[data-cart-count]");
  if (count) count.textContent = String(cartCount());
}

function bindMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const frame = document.querySelector(".frame");
  if (!toggle || !frame) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.addEventListener("click", () => {
    frame.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(frame.classList.contains("nav-open")));
  });
}

function renderCards(target, list) {
  if (!target) return;
  if (!list.length) {
    target.innerHTML = '<p class="empty">Тохирох сүрчиг олдсонгүй.</p>';
    return;
  }
  target.innerHTML = list
    .map((p) => {
      const saved = wishlist().includes(p.id);
      return `
      <article class="card">
        <a href="product.html?id=${encodeURIComponent(p.id)}">
          <img src="${productImage(p)}" alt="${p.name}">
        </a>
        <div class="card-body">
          <h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3>
          <p class="meta">${p.brand}${p.size ? ` · ${p.size}` : ""}</p>
          <p class="price">${formatPrice(p.price)}</p>
          <div class="actions">
            ${purchaseAction(p)}
            <button class="btn" data-save="${p.id}">${saved ? "Хадгалсан" : "Хадгалах"}</button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function addToCart(id, qty) {
  const product = findProduct(id);
  if (!product) return;
  const items = cart();
  const found = items.find((i) => i.id === id);
  if (found) found.qty += qty || 1;
  else items.push({ id, qty: qty || 1 });
  writeJson(STORAGE.cart, items);
  updateChrome();
}

function savePerfume(id) {
  if (!requireAuth("product.html?id=" + id)) return;
  const email = currentUser();
  const all = wishlistMap();
  const items = all[email] || [];
  if (!items.includes(id)) items.push(id);
  all[email] = items;
  writeJson(STORAGE.wishlist, all);
}

function unsavePerfume(id) {
  const email = currentUser();
  if (!email) return;
  const all = wishlistMap();
  all[email] = (all[email] || []).filter((x) => x !== id);
  writeJson(STORAGE.wishlist, all);
}

function bindCatalogClicks(root) {
  (root || document).addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    const save = e.target.closest("[data-save]");
    const unsave = e.target.closest("[data-unsave]");
    if (add) {
      addToCart(add.getAttribute("data-add"), 1);
      add.textContent = "Нэмэгдлээ";
    }
    if (save) {
      const id = save.getAttribute("data-save");
      savePerfume(id);
      save.textContent = "Хадгалсан";
    }
    if (unsave) {
      unsavePerfume(unsave.getAttribute("data-unsave"));
      renderProfile();
    }
  });
}

function pageQuery(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderHome() {
  const el = document.querySelector("[data-featured]");
  if (!el) return;
  renderCards(el, PRODUCTS.slice(0, 6));
}

function renderFiltered() {
  const el = document.querySelector("[data-catalog]");
  if (!el) return;
  const gender = el.getAttribute("data-gender");
  const family = pageQuery("family") || el.getAttribute("data-family");
  const brand = pageQuery("brand");
  const isFamilyCatalog = window.location.pathname.endsWith("unertnii-torol.html");
  if (isFamilyCatalog && !PRODUCTS.some((p) => FAMILIES.some((f) => f.id === p.family))) {
    el.innerHTML = '<p class="empty">Word жагсаалтад үнэрийн бүлгийн мэдээлэл байхгүй тул энэ ангиллыг одоогоор сонгох боломжгүй.</p>';
    return;
  }
  if (family && !PRODUCTS.some((p) => p.family === family)) {
    el.innerHTML = '<p class="empty">Энэ үнэрийн бүлэгт ангилсан сүрчиг одоогоор алга.</p>';
    return;
  }
  let list = PRODUCTS.slice();
  if (gender === "emegtei") list = list.filter((p) => p.gender === "emegtei" || p.gender === "unisex");
  if (gender === "eregtei") list = list.filter((p) => p.gender === "eregtei" || p.gender === "unisex");
  if (family) list = list.filter((p) => p.family === family);
  if (brand) list = list.filter((p) => p.brand === brand);
  renderCards(el, list);
}

function renderBrands() {
  const nav = document.querySelector("[data-brands]");
  if (nav) {
    const current = pageQuery("brand");
    nav.innerHTML = BRANDS.map(
      (b) =>
        `<a class="${b === current ? "active" : ""}" href="brands.html?brand=${encodeURIComponent(b)}">${b}</a>`
    ).join("");
  }
  renderFiltered();
}

function renderFamilies() {
  const nav = document.querySelector("[data-families]");
  if (nav) {
    const current = pageQuery("family");
    const available = FAMILIES.filter((f) => PRODUCTS.some((p) => p.family === f.id));
    if (!available.length) {
      nav.innerHTML = '<p class="auth-note">Үнэрийн бүлгийн мэдээлэл бүтээгдэхүүний жагсаалтад ороогүй байна.</p>';
      return;
    }
    nav.innerHTML =
      `<a class="${!current ? "active" : ""}" href="unertnii-torol.html">Бүгд</a>` +
      available.map(
        (f) =>
          `<a class="${f.id === current ? "active" : ""}" href="unertnii-torol.html?family=${f.id}">${f.name}</a>`
      ).join("");
  }
  renderFiltered();
}

function renderProduct() {
  const root = document.querySelector("[data-product]");
  if (!root) return;
  const product = findProduct(pageQuery("id"));
  if (!product) {
    root.innerHTML = '<p class="empty">Сүрчиг олдсонгүй. <a href="index.html">Нүүр</a></p>';
    return;
  }
  const saved = wishlist().includes(product.id);
  const notes = product.notes || { top: [], heart: [], base: [] };
  const hasNotes = notes.top.length || notes.heart.length || notes.base.length;
  const details = [product.brand, product.origin, product.size].filter(Boolean).join(" · ");
  root.innerHTML = `
    <div class="product-layout">
      <aside class="notes-panel">
        <h3>Үнэрийн ноот</h3>
        ${hasNotes ? `
          <p class="meta">Дээд нот</p><ul>${notes.top.map((n) => `<li>${n}</li>`).join("")}</ul>
          <p class="meta">Зүрх нот</p><ul>${notes.heart.map((n) => `<li>${n}</li>`).join("")}</ul>
          <p class="meta">Суурь нот</p><ul>${notes.base.map((n) => `<li>${n}</li>`).join("")}</ul>` :
          '<p class="meta">Ноотын мэдээллийг одоогоор оруулаагүй.</p>'}
      </aside>
      <div class="product-main">
        <img src="${productImage(product)}" alt="${product.name}">
        <h1>${product.name}</h1>
        <p class="meta">${details}</p>
        <p class="price">${formatPrice(product.price)}</p>
        ${product.description ? `<p class="lead">${product.description}</p>` : ""}
        <div class="actions" style="justify-content:center;margin-top:18px">
          ${purchaseAction(product, "Сагсанд нэмэх")}
          <button class="btn" data-save="${product.id}">${saved ? "Хадгалсан" : "Хадгалах"}</button>
        </div>
      </div>
      <aside class="notes-panel">
        <img src="${notesImage(product)}" alt="Орцын зураг">
        <h3>Дэлгэрэнгүй</h3>
        <p class="meta">Үнэ, савлагааны хэмжээ болон үнэрийн мэдээллийг лавлах бол салбарын мэдээллийг үзнэ үү.</p>
        <a class="btn" href="salbar.html">Салбарын мэдээлэл</a>
      </aside>
    </div>`;
}

function isGmail(email) {
  return /^[^\s@]+@gmail\.com$/i.test((email || "").trim());
}

function bindLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;
  const msg = document.querySelector("[data-msg]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    if (!isGmail(email)) {
      msg.textContent = "Зөвхөн Gmail хаяг (@gmail.com) ашиглана уу.";
      return;
    }
    if (password.length < 4) {
      msg.textContent = "Нууц үг дор хаяж 4 тэмдэгт байна.";
      return;
    }
    const all = users();
    const mode = form.getAttribute("data-mode") || "login";
    if (mode === "register") {
      if (all[email]) {
        msg.textContent = "Энэ Gmail аль хэдийн бүртгэлтэй.";
        return;
      }
      all[email] = { password, createdAt: Date.now() };
      writeJson(STORAGE.users, all);
    } else {
      if (!all[email] || all[email].password !== password) {
        msg.textContent = "Gmail эсвэл нууц үг буруу. Эхлээд бүртгүүлнэ үү.";
        return;
      }
    }
    localStorage.setItem(STORAGE.session, email);
    const next = pageQuery("next") || "profile.html";
    window.location.href = next;
  });

  document.querySelectorAll("[data-mode-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      form.setAttribute("data-mode", btn.getAttribute("data-mode-btn"));
      const submit = form.querySelector("[type=submit]");
      submit.textContent = btn.getAttribute("data-mode-btn") === "register" ? "Бүртгүүлэх" : "Нэвтрэх";
      document.querySelectorAll("[data-mode-btn]").forEach((b) => b.classList.remove("primary"));
      btn.classList.add("primary");
    });
  });
}

function renderProfile() {
  const root = document.querySelector("[data-profile]");
  if (!root) return;
  if (!requireAuth("profile.html")) return;
  const email = currentUser();
  const saved = wishlist().map(findProduct).filter(Boolean);
  const mine = orders()[email] || [];
  root.innerHTML = `
    <h1>Профайл</h1>
    <p class="lead">Нэвтэрсэн Gmail: <strong>${email}</strong></p>
    <p><button class="btn ghost" data-logout>Гарах</button></p>
    <h2 class="section-title">Хадгалсан сүрчиг</h2>
    <div class="grid" data-saved></div>
    <h2 class="section-title">Худалдан авалтын түүх</h2>
    <div data-orders></div>`;
  const savedEl = root.querySelector("[data-saved]");
  if (!saved.length) savedEl.innerHTML = '<p class="empty">Хадгалсан сүрчиг байхгүй.</p>';
  else {
    savedEl.innerHTML = saved
      .map(
        (p) => `
      <article class="card">
        <a href="product.html?id=${p.id}"><img src="${productImage(p)}" alt="${p.name}"></a>
        <div class="card-body">
          <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p class="price">${formatPrice(p.price)}</p>
          <div class="actions">
            ${purchaseAction(p)}
            <button class="btn ghost" data-unsave="${p.id}">Хасах</button>
          </div>
        </div>
      </article>`
      )
      .join("");
  }
  const ordersEl = root.querySelector("[data-orders]");
  if (!mine.length) ordersEl.innerHTML = '<p class="empty">Одоогоор захиалга алга.</p>';
  else {
    ordersEl.innerHTML = mine
      .map(
        (o) => `
      <article class="order-card">
        <p><strong>Захиалга #${o.id}</strong> · ${new Date(o.date).toLocaleString("mn-MN")}</p>
        <p class="meta">${o.name} · ${o.phone} · ${o.address}</p>
        <ul>${o.items
          .map((i) => {
            const p = findProduct(i.id);
            return `<li>${p ? p.name : i.id} × ${i.qty} — ${formatPrice((p ? p.price : 0) * i.qty)}</li>`;
          })
          .join("")}</ul>
        <p class="price">Нийт: ${formatPrice(o.total)}</p>
      </article>`
      )
      .join("");
  }
  root.querySelector("[data-logout]").addEventListener("click", () => {
    localStorage.removeItem(STORAGE.session);
    window.location.href = "index.html";
  });
}

function renderCart() {
  const root = document.querySelector("[data-cart]");
  if (!root) return;
  const items = cart();
  if (!items.length) {
    root.innerHTML = '<p class="empty">Сагс хоосон байна. <a href="brands.html">Сүрчиг үзэх</a></p>';
    return;
  }
  let total = 0;
  const rows = items
    .map((item) => {
      const p = findProduct(item.id);
      if (!p) return "";
      const line = p.price > 0 && Number.isFinite(Number(p.price)) ? Number(p.price) * item.qty : null;
      if (line !== null) total += line;
      return `<tr>
        <td><a href="product.html?id=${p.id}">${p.name}</a></td>
        <td>${formatPrice(p.price)}</td>
        <td><input class="qty" type="number" min="1" value="${item.qty}" data-qty="${p.id}"></td>
        <td>${line === null ? "Үнэ лавлах" : formatPrice(line)}</td>
        <td><button class="btn ghost" data-remove="${p.id}">Устгах</button></td>
      </tr>`;
    })
    .join("");
  const hasUnpriced = items.some((item) => !(findProduct(item.id)?.price > 0));
  root.innerHTML = `
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Сүрчиг</th><th>Үнэ</th><th>Тоо</th><th>Дүн</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="price">${hasUnpriced ? "Нийт үнэ: лавлах" : `Нийт: ${formatPrice(total)}`}</p>
    ${hasUnpriced
      ? '<p class="auth-note">Үнэ тодорхойгүй бараатай тул захиалгыг одоогоор үргэлжлүүлэх боломжгүй.</p>'
      : '<p><a class="btn primary" href="checkout.html">Захиалах</a></p>'}`;
  root.querySelectorAll("[data-qty]").forEach((input) => {
    input.addEventListener("change", () => {
      const id = input.getAttribute("data-qty");
      const itemsNow = cart();
      const found = itemsNow.find((i) => i.id === id);
      if (found) found.qty = Math.max(1, Number(input.value) || 1);
      writeJson(STORAGE.cart, itemsNow);
      updateChrome();
      renderCart();
    });
  });
  root.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      writeJson(
        STORAGE.cart,
        cart().filter((i) => i.id !== btn.getAttribute("data-remove"))
      );
      updateChrome();
      renderCart();
    });
  });
}

function bindCheckout() {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;
  if (!requireAuth("checkout.html")) return;
  if (cart().some((item) => !(findProduct(item.id)?.price > 0))) {
    window.location.href = "sags.html";
    return;
  }
  if (!cart().length) {
    window.location.href = "sags.html";
    return;
  }
  const msg = document.querySelector("[data-msg]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = currentUser();
    const items = cart();
    const total = items.reduce((sum, i) => {
      const p = findProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
    const all = orders();
    if (!all[email]) all[email] = [];
    all[email].unshift({
      id: String(Date.now()).slice(-8),
      date: Date.now(),
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      items,
      total
    });
    writeJson(STORAGE.orders, all);
    writeJson(STORAGE.cart, []);
    msg.textContent = "Захиалга амжилттай. Профайл руу шилжиж байна...";
    setTimeout(() => (window.location.href = "profile.html"), 700);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateChrome();
  bindMenu();
  bindCatalogClicks(document);
  renderHome();
  renderBrands();
  renderFamilies();
  renderFiltered();
  renderProduct();
  bindLogin();
  renderProfile();
  renderCart();
  bindCheckout();
});
