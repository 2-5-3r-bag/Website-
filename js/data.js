const DEFAULT_PERFUME_IMAGE = "images/perfumes/placeholder.svg";
const DEFAULT_NOTES_IMAGE = "images/notes/placeholder.svg";

const PRODUCTS = [
  { id: "chance-eau-fraiche", name: "Chance Eau de Parfum Fraîche", brand: "Chanel", gender: "emegtei" },
  { id: "chance-eau-tendre", name: "Chance Eau de Parfum Tendre", brand: "Chanel", gender: "emegtei" },
  { id: "chance-eau-splendide", name: "Chance Eau de Parfum Splendide", brand: "Chanel", gender: "emegtei" },
  { id: "coco-mademoiselle", name: "Coco Mademoiselle Eau de Parfum", brand: "Chanel", gender: "emegtei" },
  { id: "bleu-de-chanel-parfum", name: "Bleu de Chanel Parfum", brand: "Chanel", gender: "eregtei" },
  { id: "allure-homme-sport", name: "Allure Homme Sport Eau de Toilette", brand: "Chanel", gender: "eregtei" },

  { id: "bright-crystal", name: "Bright Crystal Eau de Toilette", brand: "Versace", gender: "emegtei" },
  { id: "bright-crystal-absolu", name: "Bright Crystal Absolu Eau de Parfum", brand: "Versace", gender: "emegtei" },
  { id: "yellow-diamond", name: "Yellow Diamond Eau de Toilette", brand: "Versace", gender: "emegtei" },
  { id: "eros", name: "Eros Eau de Toilette", brand: "Versace", gender: "eregtei" },
  { id: "eros-flame", name: "Eros Flame Eau de Parfum", brand: "Versace", gender: "eregtei" },
  { id: "eros-energy", name: "Eros Energy Eau de Parfum", brand: "Versace", gender: "eregtei" },
  { id: "versace-pour-homme", name: "Pour Homme Eau de Toilette", brand: "Versace", gender: "eregtei" },
  { id: "versace-fraiche", name: "Eau Fraîche Eau de Toilette", brand: "Versace", gender: "eregtei" },

  { id: "delina", name: "Delina", brand: "Parfums de Marly", gender: "emegtei" },
  { id: "valaya", name: "Valaya", brand: "Parfums de Marly", gender: "emegtei" },
  { id: "layton", name: "Layton", brand: "Parfums de Marly", gender: "eregtei" },

  { id: "mon-paris", name: "Mon Paris Eau de Parfum", brand: "Yves Saint Laurent", gender: "emegtei" },
  { id: "mon-paris-intensement", name: "Mon Paris Eau de Parfum Intensément", brand: "Yves Saint Laurent", gender: "emegtei" },

  { id: "power-of-you", name: "Power of You Eau de Parfum", brand: "Giorgio Armani", gender: "emegtei" },
  { id: "my-way", name: "My Way Eau de Parfum", brand: "Giorgio Armani", gender: "emegtei" },
  { id: "acqua-di-gio", name: "Acqua di Giò Eau de Toilette", brand: "Giorgio Armani", gender: "eregtei" },
  { id: "stronger-with-you-absolutely", name: "Stronger With You Absolutely Parfum", brand: "Giorgio Armani", gender: "eregtei" },
  { id: "stronger-with-you-intensely", name: "Stronger With You Intensely Eau de Parfum", brand: "Giorgio Armani", gender: "eregtei" },
  { id: "stronger-with-you-powerfully", name: "Stronger With You Powerfully Eau de Parfum", brand: "Giorgio Armani", gender: "eregtei" },

  { id: "le-male-elixir", name: "Le Male Elixir Parfum", brand: "Jean Paul Gaultier", gender: "eregtei" },

  { id: "sauvage", name: "Sauvage Eau de Parfum", brand: "Dior", gender: "eregtei" },
  { id: "jadore-parfum-deau", name: "J’adore Parfum d’eau", brand: "Dior", gender: "emegtei" },

  { id: "coach-for-men", name: "Coach for Men Eau de Toilette", brand: "Coach", gender: "eregtei" },
  { id: "coach-green", name: "Coach Green for Men Eau de Toilette", brand: "Coach", gender: "eregtei" },
  { id: "coach-platinum", name: "Coach for Men Platinum Eau de Parfum", brand: "Coach", gender: "eregtei" },
  { id: "coach-floral", name: "Coach Floral", brand: "Coach", gender: "emegtei" },
  { id: "coach-love", name: "Coach Love Eau de Parfum Spray", brand: "Coach", gender: "emegtei" },

  { id: "jimmy-choo-blossom", name: "Jimmy Choo Blossom", brand: "Jimmy Choo", gender: "emegtei" },
  { id: "jimmy-choo-man", name: "Jimmy Choo Man", brand: "Jimmy Choo", gender: "eregtei" },
  { id: "jimmy-choo-man-intense", name: "Jimmy Choo Man Intense", brand: "Jimmy Choo", gender: "eregtei" },
  { id: "jimmy-choo-man-aqua", name: "Jimmy Choo Man Aqua", brand: "Jimmy Choo", gender: "eregtei" },

  { id: "creed-aventus", name: "Aventus", brand: "Creed", gender: "eregtei" },
  { id: "silver-mountain-water", name: "Silver Mountain Water", brand: "Creed", gender: "eregtei" },
  { id: "aventus-for-her", name: "Aventus for Her", brand: "Creed", gender: "emegtei" },

  { id: "montblanc-explorer", name: "Explorer", brand: "Montblanc", gender: "eregtei" },
  { id: "montblanc-legend", name: "Legend", brand: "Montblanc", gender: "eregtei" },
  { id: "montblanc-legend-spirit", name: "Legend Spirit", brand: "Montblanc", gender: "eregtei" },
  { id: "montblanc-starwalker", name: "Starwalker", brand: "Montblanc", gender: "eregtei" },
  { id: "montblanc-explorer-extreme", name: "Explorer Extreme", brand: "Montblanc", gender: "eregtei" },

  { id: "aqva-pour-homme", name: "Aqva Pour Homme Eau de Toilette", brand: "Bvlgari", gender: "eregtei" },
  { id: "omnia-amethyste", name: "Omnia Amethyste", brand: "Bvlgari", gender: "emegtei" },
  { id: "omnia-crystalline", name: "Omnia Crystalline", brand: "Bvlgari", gender: "emegtei" },
  { id: "omnia-coral", name: "Omnia Coral Eau de Toilette", brand: "Bvlgari", gender: "emegtei" },

  { id: "lacoste-pour-femme", name: "Pour Femme", brand: "Lacoste", gender: "emegtei" },
  { id: "lacoste-blanc-parfum", name: "Lacoste Blanc Parfum", brand: "Lacoste", gender: "eregtei" },
  { id: "lacoste-blanc-edt", name: "Lacoste Blanc Eau de Toilette", brand: "Lacoste", gender: "eregtei" },

  { id: "gucci-guilty", name: "Gucci Guilty", brand: "Gucci", gender: "unisex" },

  { id: "replica-jazz-club", name: "Jazz Club", brand: "Maison Margiela", gender: "unisex" },
  { id: "replica-coffee-break", name: "Coffee Break", brand: "Maison Margiela", gender: "unisex" },
  { id: "replica-lazy-sunday-morning", name: "Lazy Sunday Morning", brand: "Maison Margiela", gender: "unisex" },
  { id: "replica-by-the-fireplace", name: "By the Fireplace", brand: "Maison Margiela", gender: "unisex" },
  { id: "replica-when-the-rain-stops", name: "When the Rain Stops", brand: "Maison Margiela", gender: "unisex" },
  { id: "replica-beach-walk", name: "Beach Walk", brand: "Maison Margiela", gender: "unisex" },
  { id: "replica-autumn-vibes", name: "Autumn Vibes", brand: "Maison Margiela", gender: "unisex" }
].map((product) => ({
  ...product,
  family: "unclassified",
  size: "",
  price: null,
  origin: "",
  image: DEFAULT_PERFUME_IMAGE,
  notesImage: DEFAULT_NOTES_IMAGE,
  description: "",
  notes: { top: [], heart: [], base: [] }
}));

const BRANDS = [...new Set(PRODUCTS.map((product) => product.brand))];
const FAMILIES = [
  { id: "citrus", name: "Цитрус" },
  { id: "floral", name: "Цэцэг" },
  { id: "woody", name: "Модлог" },
  { id: "oriental", name: "Ориентал" },
  { id: "fresh", name: "Шинэхэн" }
];

