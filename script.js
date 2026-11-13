/* ===== Ma'lumotlar ===== */
const JOBS = [
  { id: 1, title: "Frontend Developer", company: "EPAM Uzbekistan", city: "Toshkent", category: "IT", type: "Full-time", salary: "$1 200 – $2 000" },
  { id: 2, title: "Python Developer", company: "Uzum", city: "Toshkent", category: "IT", type: "Full-time", salary: "$1 500 – $2 500" },
  { id: 3, title: "UI/UX Designer", company: "Payme", city: "Toshkent", category: "Design", type: "Hybrid", salary: "$900 – $1 600" },
  { id: 4, title: "Graphic Designer", company: "Mediapark", city: "Samarqand", category: "Design", type: "Part-time", salary: "6 – 9 mln so'm" },
  { id: 5, title: "Marketing Manager", company: "Korzinka", city: "Toshkent", category: "Marketing", type: "Full-time", salary: "10 – 15 mln so'm" },
  { id: 6, title: "SMM mutaxassisi", company: "Artel", city: "Andijon", category: "Marketing", type: "Remote", salary: "5 – 8 mln so'm" },
  { id: 7, title: "Buxgalter", company: "Hamkorbank", city: "Buxoro", category: "Finance", type: "Full-time", salary: "7 – 11 mln so'm" },
  { id: 8, title: "Savdo menejeri", company: "Ucell", city: "Farg'ona", category: "Business", type: "Full-time", salary: "6 – 12 mln so'm" },
  { id: 9, title: "Ingliz tili o'qituvchisi", company: "Cambridge School", city: "Samarqand", category: "Education", type: "Part-time", salary: "4 – 8 mln so'm" }
];

const CITIES = ["Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg'ona"];
const CATEGORIES = ["IT", "Design", "Marketing", "Finance", "Business", "Education"];

const I18N = {
  uz: {
    navJobs: "Ishlar", navCategories: "Kategoriyalar", navEmployers: "Ish beruvchilar",
    login: "Kirish", postJob: "Vakansiya joylash",
    heroTitle: "Sizga mos ish shu yerda.",
    heroText: "Toshkentdan Farg'onagacha: vakansiyalarni lavozim, shahar va yo'nalish bo'yicha qidiring.",
    searchLabel: "Lavozim yoki kompaniya", cityLabel: "Shahar",
    searchPh: "Lavozim yoki kompaniya", search: "Qidirish", allCities: "Barcha shaharlar",
    popular: "Ko'p qidiriladi:",
    stat1: "ochiq vakansiya", stat2: "kompaniya", stat3: "shahar",
    categoryTitle: "Yo'nalish tanlang", jobsTitle: "So'nggi vakansiyalar",
    reset: "Filtrlarni tozalash", found: "ta vakansiya topildi",
    noResults: "Hech narsa topilmadi. Boshqa so'z yozing yoki filtrlarni tozalang.",
    employerTitle: "Xodim qidiryapsizmi?",
    employerText: "Vakansiyangizni joylang va nomzodlar arizasini bir joyda oling.",
    contact: "Biz bilan bog'lanish", footer: "O'zbekiston uchun yaratilgan.",
    save: "Saqlash", jobsWord: "vakansiya",
    cat: { IT: "IT", Design: "Dizayn", Marketing: "Marketing", Finance: "Moliya", Business: "Biznes", Education: "Ta'lim" }
  },
  ru: {
    navJobs: "Вакансии", navCategories: "Категории", navEmployers: "Работодателям",
    login: "Войти", postJob: "Разместить вакансию",
    heroTitle: "Работа для вас — здесь.",
    heroText: "От Ташкента до Ферганы: ищите вакансии по должности, городу и направлению.",
    searchLabel: "Должность или компания", cityLabel: "Город",
    searchPh: "Должность или компания", search: "Найти", allCities: "Все города",
    popular: "Часто ищут:",
    stat1: "открытых вакансий", stat2: "компаний", stat3: "городов",
    categoryTitle: "Выберите направление", jobsTitle: "Свежие вакансии",
    reset: "Сбросить фильтры", found: "вакансий найдено",
    noResults: "Ничего не найдено. Измените запрос или сбросьте фильтры.",
    employerTitle: "Ищете сотрудника?",
    employerText: "Разместите вакансию и получайте отклики кандидатов в одном месте.",
    contact: "Связаться с нами", footer: "Сделано для Узбекистана.",
    save: "Сохранить", jobsWord: "вакансий",
    cat: { IT: "IT", Design: "Дизайн", Marketing: "Маркетинг", Finance: "Финансы", Business: "Бизнес", Education: "Образование" }
  },
  en: {
    navJobs: "Jobs", navCategories: "Categories", navEmployers: "Employers",
    login: "Log in", postJob: "Post a job",
    heroTitle: "The right job is right here.",
    heroText: "From Tashkent to Fergana: search jobs by title, city and field.",
    searchLabel: "Job title or company", cityLabel: "City",
    searchPh: "Job title or company", search: "Search", allCities: "All cities",
    popular: "Popular:",
    stat1: "open jobs", stat2: "companies", stat3: "cities",
    categoryTitle: "Pick a field", jobsTitle: "Latest jobs",
    reset: "Clear filters", found: "jobs found",
    noResults: "No jobs found. Try another keyword or clear the filters.",
    employerTitle: "Hiring?",
    employerText: "Post your job and receive applications in one place.",
    contact: "Contact us", footer: "Made for Uzbekistan.",
    save: "Save", jobsWord: "jobs",
    cat: { IT: "IT", Design: "Design", Marketing: "Marketing", Finance: "Finance", Business: "Business", Education: "Education" }
  }
};

/* ===== Holat ===== */
const state = { lang: "uz", query: "", city: "", category: "", saved: new Set() };

try {
  const l = localStorage.getItem("workly-lang");
  if (I18N[l]) state.lang = l;
  JSON.parse(localStorage.getItem("workly-saved") || "[]").forEach(id => state.saved.add(id));
} catch (e) { /* localStorage mavjud emas — e'tibor bermaymiz */ }

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key];

/* ===== Chizish (render) ===== */
function filteredJobs() {
  const q = state.query.trim().toLowerCase();
  return JOBS.filter(j =>
    (!q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)) &&
    (!state.city || j.city === state.city) &&
    (!state.category || j.category === state.category)
  );
}

function renderJobs() {
  const list = filteredJobs();
  $("jobGrid").innerHTML = list.map(j => `
    <article class="job-card">
      <div class="job-top">
        <div>
          <h3>${j.title}</h3>
          <p class="company">${j.company}</p>
        </div>
        <button type="button" class="save-btn" data-save="${j.id}"
          aria-pressed="${state.saved.has(j.id)}" aria-label="${t("save")}: ${j.title}">★</button>
      </div>
      <div class="tags">
        <span class="tag">${j.city}</span>
        <span class="tag">${I18N[state.lang].cat[j.category]}</span>
        <span class="tag">${j.type}</span>
      </div>
      <p class="salary">${j.salary}</p>
    </article>`).join("");
  $("noResults").hidden = list.length > 0;
  $("resultCount").textContent = `${list.length} ${t("jobsWord")}`;
}

function renderCategories() {
  $("categoryGrid").innerHTML = CATEGORIES.map(c => {
    const n = JOBS.filter(j => j.category === c).length;
    return `<button type="button" class="category-card ${state.category === c ? "active" : ""}" data-category="${c}">
      <strong>${I18N[state.lang].cat[c]}</strong><small>${n} ${t("jobsWord")}</small></button>`;
  }).join("");
}

function renderCities() {
  $("citySelect").innerHTML =
    `<option value="">${t("allCities")}</option>` +
    CITIES.map(c => `<option value="${c}" ${state.city === c ? "selected" : ""}>${c}</option>`).join("");
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  $("langBtn").textContent = state.lang.toUpperCase();
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  renderCities();
  renderCategories();
  renderJobs();
}

function renderStats() {
  $("statJobs").textContent = JOBS.length;
  $("statCompanies").textContent = new Set(JOBS.map(j => j.company)).size;
  $("statCities").textContent = CITIES.length;
}

/* ===== Hodisalar ===== */
$("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  state.query = $("searchInput").value;
  state.city = $("citySelect").value;
  renderJobs();
  $("jobs").scrollIntoView();
});

$("citySelect").addEventListener("change", e => { state.city = e.target.value; renderJobs(); });

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    state.query = chip.dataset.search;
    $("searchInput").value = state.query;
    renderJobs();
    $("jobs").scrollIntoView();
  });
});

// Event delegation: bitta tinglovchi barcha kategoriya kartalariga xizmat qiladi
$("categoryGrid").addEventListener("click", e => {
  const card = e.target.closest("[data-category]");
  if (!card) return;
  state.category = state.category === card.dataset.category ? "" : card.dataset.category;
  renderCategories();
  renderJobs();
  $("jobs").scrollIntoView();
});

$("jobGrid").addEventListener("click", e => {
  const btn = e.target.closest("[data-save]");
  if (!btn) return;
  const id = Number(btn.dataset.save);
  state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
  btn.setAttribute("aria-pressed", state.saved.has(id));
  try { localStorage.setItem("workly-saved", JSON.stringify([...state.saved])); } catch (err) {}
});

$("resetBtn").addEventListener("click", () => {
  state.query = ""; state.city = ""; state.category = "";
  $("searchInput").value = "";
  renderCities(); renderCategories(); renderJobs();
});

$("langBtn").addEventListener("click", () => {
  const order = ["uz", "ru", "en"];
  state.lang = order[(order.indexOf(state.lang) + 1) % order.length];
  try { localStorage.setItem("workly-lang", state.lang); } catch (err) {}
  applyLanguage();
});

/* ===== Boshlash ===== */
renderStats();
applyLanguage();