const products = [
  {
    id: 1,
    name: "طرح افشان زرین",
    category: "classic",
    size: "12",
    price: 9.8,
    image:
      "https://images.unsplash.com/photo-1616627568505-404779843f38?auto=format&fit=crop&w=800&q=80",
    tag: "پرفروش",
  },
  {
    id: 2,
    name: "طرح کهکشان نیلی",
    category: "modern",
    size: "9",
    price: 7.4,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    tag: "جدید",
  },
  {
    id: 3,
    name: "طرح خیال کودکانه",
    category: "kids",
    size: "6",
    price: 4.2,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    tag: "پرطرفدار",
  },
  {
    id: 4,
    name: "طرح ترمه سلطنتی",
    category: "classic",
    size: "12",
    price: 11.5,
    image:
      "https://images.unsplash.com/photo-1598908314376-37427fbb3f08?auto=format&fit=crop&w=800&q=80",
    tag: "ویژه",
  },
  {
    id: 5,
    name: "طرح نوین مینیمال",
    category: "modern",
    size: "9",
    price: 5.9,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    tag: "پیشنهاد طراحان",
  },
  {
    id: 6,
    name: "طرح شفق آرام",
    category: "modern",
    size: "6",
    price: 3.6,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    tag: "تخفیف ویژه",
  },
  {
    id: 7,
    name: "طرح شاه عباسی فاخر",
    category: "classic",
    size: "9",
    price: 6.8,
    image:
      "https://images.unsplash.com/photo-1616627450936-3a36b69c48df?auto=format&fit=crop&w=800&q=80",
    tag: "پرفروش",
  },
  {
    id: 8,
    name: "طرح صورتی رویا",
    category: "kids",
    size: "6",
    price: 3.9,
    image:
      "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=800&q=80",
    tag: "جدید",
  },
  {
    id: 9,
    name: "طرح انتزاعی نقره‌ای",
    category: "modern",
    size: "12",
    price: 8.6,
    image:
      "https://images.unsplash.com/photo-1523419409543-0c1df022bddf?auto=format&fit=crop&w=800&q=80",
    tag: "محبوب",
  },
];

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sizeSelect = document.querySelector("#size");
const priceRange = document.querySelector("#price");
const priceValue = document.querySelector("#price-value");
const navbar = document.querySelector(".navbar");
const navbarToggle = document.querySelector(".navbar__toggle");
const scrollTopButton = document.querySelector(".scroll-top");
const showVideoButton = document.querySelector("#show-video");
const modal = document.querySelector("#video-modal");

function formatPrice(value) {
  return new Intl.NumberFormat("fa-IR", {
    style: "decimal",
    maximumFractionDigits: 1,
  }).format(value);
}

function renderProducts(items) {
  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>محصولی با این مشخصات یافت نشد</h3>
        <p>فیلترهای انتخابی را تغییر دهید یا با کارشناسان ما تماس بگیرید.</p>
        <a class="btn btn--primary" href="tel:02112345678">تماس با مشاور</a>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-card__tag">${product.tag}</span>
      </div>
      <div class="product-card__body">
        <h3>${product.name}</h3>
        <div class="product-card__meta">
          <span>${formatPrice(product.price)} میلیون</span>
          <small>${product.size} متری</small>
        </div>
        <p>الیاف هیت‌ست، تراکم ۳۶۰۰، تضمین ثبات رنگ و بافت ابریشم مصنوعی.</p>
        <div class="product-card__actions">
          <button class="btn btn--ghost" type="button">مشاهده جزئیات</button>
          <button class="btn btn--primary" type="button">افزودن به سبد</button>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });

  productGrid.appendChild(fragment);
}

function applyFilters() {
  const searchTerm = searchInput.value.trim();
  const category = categorySelect.value;
  const size = sizeSelect.value;
  const price = Number(priceRange.value);

  const filtered = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.includes(searchTerm)
      : true;
    const matchesCategory = category === "all" || product.category === category;
    const matchesSize = size === "all" || product.size === size;
    const matchesPrice = product.price <= price;

    return matchesSearch && matchesCategory && matchesSize && matchesPrice;
  });

  renderProducts(filtered);
}

function updatePriceLabel() {
  priceValue.textContent = formatPrice(priceRange.value);
}

function handleScroll() {
  if (window.scrollY > 450) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
}

function toggleModal(show) {
  modal.setAttribute("aria-hidden", show ? "false" : "true");
  modal.classList.toggle("open", show);
  document.body.style.overflow = show ? "hidden" : "auto";
}

renderProducts(products);
updatePriceLabel();

searchInput?.addEventListener("input", applyFilters);
categorySelect?.addEventListener("change", applyFilters);
sizeSelect?.addEventListener("change", applyFilters);
priceRange?.addEventListener("input", () => {
  updatePriceLabel();
  applyFilters();
});

navbarToggle?.addEventListener("click", () => {
  const expanded = navbarToggle.getAttribute("aria-expanded") === "true";
  navbarToggle.setAttribute("aria-expanded", String(!expanded));
  navbar.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (
    navbar.classList.contains("open") &&
    !event.target.closest(".navbar")
  ) {
    navbar.classList.remove("open");
    navbarToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", handleScroll);
scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

showVideoButton?.addEventListener("click", (event) => {
  event.preventDefault();
  toggleModal(true);
});

modal?.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close")) {
    toggleModal(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    toggleModal(false);
  }
});

const newsletterForm = document.querySelector(".newsletter__form");
newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = newsletterForm.querySelector("input[type='email']");
  if (!emailInput.value.trim()) {
    return;
  }
  emailInput.value = "";
  alert("عضویت شما در خبرنامه ثبت شد. ممنون از همراهی شما!");
});

const contactForm = document.querySelector(".contact__form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = contactForm.querySelector("#name").value.trim();
  const phone = contactForm.querySelector("#phone").value.trim();
  const message = contactForm.querySelector("#message").value.trim();

  if (!name || !phone || !message) {
    alert("لطفاً تمام فیلدها را تکمیل کنید.");
    return;
  }

  contactForm.reset();
  alert("پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس می‌گیرند.");
});
