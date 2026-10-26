const PRODUCTS = [
  {
    id: "colonia",
    name: "Acqua di Parma Colonia",
    brand: "Acqua di Parma",
    gender: "eregtei",
    family: "citrus",
    size: "100 мл",
    price: 489000,
    origin: "Парма, Итали, 1916",
    image: "images/perfumes/colonia.svg",
    notesImage: "images/notes/citrus.svg",
    description:
      "Италийн cologne-ийн сонгодог. Бергамот, нимбэг, чидун модны цэцэг, сарнай, ветивер. Parma-д 1916 оноос үйлдвэрлэдэг.",
    notes: {
      top: ["Бергамот", "Нимбэг", "Жүрж", "Мандарин", "Лаванда"],
      heart: ["Сарнай", "Розмарин", "Өргөст хэмхний цэцэг"],
      base: ["Ветивер", "Сандал", "Пачули"]
    }
  },
  {
    id: "arancia",
    name: "Blu Mediterraneo Arancia di Capri",
    brand: "Acqua di Parma",
    gender: "unisex",
    family: "citrus",
    size: "75 мл",
    price: 429000,
    origin: "Капри / Парма, Итали",
    description:
      "Каприйн жүржний хальс, нимбэг, карамель, хуш мод. Газар дундын тэнгисийн зуны үнэр.",
    notes: {
      top: ["Жүрж", "Нимбэг", "Мандарин"],
      heart: ["Карамель", "Лабурнум"],
      base: ["Хуш", "Муск"]
    }
  },
  {
    id: "naxos",
    name: "Xerjoff Naxos",
    brand: "Xerjoff",
    gender: "unisex",
    family: "oriental",
    size: "100 мл",
    price: 1290000,
    origin: "Турин, Итали",
    description:
      "Сицилийн тамхи, зөгийн бал, ваниль, лаванда. Xerjoff-ийн 1861 цувралын хамгийн алдартай найрлагын нэг.",
    notes: {
      top: ["Бергамот", "Нимбэг", "Лаванда"],
      heart: ["Зөгийн бал", "Шарчилсан тамхи", "Кориандр"],
      base: ["Ваниль", "Тонка", "Сандал", "Кедр"]
    }
  },
  {
    id: "erba-pura",
    name: "Xerjoff Erba Pura",
    brand: "Xerjoff",
    gender: "unisex",
    family: "fresh",
    size: "100 мл",
    price: 1190000,
    origin: "Турин, Итали",
    description:
      "Жимс, сицилийн жүрж, ваниль, муск. Xerjoff V-цувралын гэрэл гэгээтэй, удаан хадгалагддаг үнэр.",
    notes: {
      top: ["Сицилийн жүрж", "Бергамот", "Нимбэг"],
      heart: ["Чинжүү жимс", "Алим"],
      base: ["Ваниль", "Муск", "Цагаан мод"]
    }
  },
  {
    id: "lira",
    name: "Casamorati Lira",
    brand: "Xerjoff Casamorati",
    gender: "emegtei",
    family: "oriental",
    size: "100 мл",
    price: 980000,
    origin: "Итали (Casamorati 1888)",
    notesImage: "images/notes/floral.svg",
    description:
      "Карамель, шанцай, жүрж, ваниль. 1888 оны Casamorati өвийг Xerjoff сэргээсэн амтат oriental.",
    notes: {
      top: ["Жүрж", "Бергамот", "Лаванда"],
      heart: ["Шанцай", "Сарнай", "Гүрвэлзгэнэ", "Ликер"],
      base: ["Ваниль", "Карамель", "Муск", "Кедр"]
    }
  },
  {
    id: "melograno",
    name: "Santa Maria Novella Melograno",
    brand: "Santa Maria Novella",
    gender: "unisex",
    family: "woody",
    size: "100 мл",
    price: 620000,
    origin: "Флоренц, Итали, 1612 оноос",
    description:
      "Анаар (pomegranate), пачули, модлог суурь. Флоренцын Officina Profumo-Farmaceutica di Santa Maria Novella-ийн түүхэн үнэр.",
    notes: {
      top: ["Анаар", "Бергамот"],
      heart: ["Сарнай", "Лийр"],
      base: ["Пачули", "Муск", "Мод"]
    }
  },
  {
    id: "acqua-di-sale",
    name: "Profumum Roma Acqua di Sale",
    brand: "Profumum Roma",
    gender: "unisex",
    family: "fresh",
    size: "100 мл",
    price: 890000,
    origin: "Ром, Итали",
    description:
      "Далайн давс, мирт, хуш. Газар дундын эргийн далайн агаартай ойролцоо нише үнэр.",
    notes: {
      top: ["Далайн давс", "Мирт"],
      heart: ["Цэцэг"],
      base: ["Хуш", "Муск"]
    }
  },
  {
    id: "acqua-di-gio",
    name: "Giorgio Armani Acqua di Giò",
    brand: "Giorgio Armani",
    gender: "eregtei",
    family: "fresh",
    size: "100 мл",
    price: 359000,
    origin: "Милан, Итали, 1996",
    description:
      "Пантеллерийн тэнгисээс санаа авсан. Бергамот, нероли, далайн нот, хуш, пачули.",
    notes: {
      top: ["Нимбэг", "Бергамот", "Нероли"],
      heart: ["Жасмин", "Розмарин", "Далайн акватик"],
      base: ["Хуш", "Пачули", "Царсны хөвд"]
    }
  },
  {
    id: "eros",
    name: "Versace Eros",
    brand: "Versace",
    gender: "eregtei",
    family: "oriental",
    size: "100 мл",
    price: 329000,
    origin: "Милан, Итали, 2012",
    description:
      "Гүзээлзгэнэт навч, ментол, ваниль, ветивер. Versace-ийн эрэгтэйчүүдийн алдартай амтат-шинэ үнэр.",
    notes: {
      top: ["Гүзээлзгэнэт навч", "Нимбэг", "Ментол"],
      heart: ["Тонка", "Амброксан", "Герань"],
      base: ["Ваниль", "Ветивер", "Хуш", "Пачули"]
    }
  },
  {
    id: "light-blue",
    name: "Dolce & Gabbana Light Blue",
    brand: "Dolce & Gabbana",
    gender: "emegtei",
    family: "citrus",
    size: "100 мл",
    price: 299000,
    origin: "Итали, 2001",
    notesImage: "images/notes/citrus.svg",
    description:
      "Сицилийн нимбэг, алим, хуш, балгасны мод. Каприйн зун, цитрус-woody бүтэц.",
    notes: {
      top: ["Сицилийн нимбэг", "Алим", "Цэнхэр хонх"],
      heart: ["Бамбай", "Жасмин", "Бамбайн мод"],
      base: ["Хуш", "Амбра", "Муск"]
    }
  },
  {
    id: "iris",
    name: "Prada Infusion d'Iris",
    brand: "Prada",
    gender: "emegtei",
    family: "floral",
    size: "100 мл",
    price: 410000,
    origin: "Милан, Итали",
    notesImage: "images/notes/floral.svg",
    description:
      "Ирис, нероли, бензоин, кедр. Prada-ийн цэвэр, нунтаг floral-woody.",
    notes: {
      top: ["Мандарин", "Нероли", "Галбанум"],
      heart: ["Ирис", "Жасмин", "Усан үзмийн цэцэг"],
      base: ["Бензоин", "Кедр", "Ветiver", "Франкинсенс"]
    }
  },
  {
    id: "bloom",
    name: "Gucci Bloom",
    brand: "Gucci",
    gender: "emegtei",
    family: "floral",
    size: "100 мл",
    price: 389000,
    origin: "Флоренц / Итали, 2017",
    notesImage: "images/notes/floral.svg",
    description:
      "Түбэроз, жасмин, рангун creeper. Gucci-ийн цэцэрлэгт хүрээлэн мэт цагаан цэцгийн найрлага.",
    notes: {
      top: ["Рангун creeper"],
      heart: ["Түбэроз", "Жасмин"],
      base: ["Орхидэйн үндэс"]
    }
  }
];

const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
const FAMILIES = [
  { id: "citrus", name: "Цитрус" },
  { id: "floral", name: "Цэцэг" },
  { id: "woody", name: "Модлог" },
  { id: "oriental", name: "Ориентал" },
  { id: "fresh", name: "Шинэхэн" }
];

const DEFAULT_PERFUME_IMAGE = "images/perfumes/default.svg";
const DEFAULT_NOTES_IMAGE = "images/notes/default.svg";
