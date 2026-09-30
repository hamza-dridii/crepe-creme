import data from "../../data/menu.json";

export interface MenuItem {
  name: string;
  description?: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  note?: string;
  items: MenuItem[];
}

export interface OpeningHours {
  days: string;
  time: string;
  /** schema.org openingHours, e.g. "Mo-Su 07:00-24:00" */
  schema: string;
}

export const shop = data.shop;
export const hours: OpeningHours[] = data.shop.hours;
export const categories: MenuCategory[] = data.categories;

// Catch editing mistakes in data/menu.json at build time instead of shipping a broken page.
// Category ids become page anchors (#cafes) and element ids, so they must be unique and not clash.
const reservedIds = new Set(["menu", "visit", "visite", "contact", "dish-name", "footer-about", "footer-hours"]);
const invalid = (message: string) => new Error(`data/menu.json: ${message}`);
if (categories.length === 0) throw invalid("add at least one category.");
const seenIds = new Set<string>();
for (const { id, items } of categories) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) throw invalid(`category id "${id}" may only use a–z, 0–9 and "-".`);
  if (seenIds.has(id) || reservedIds.has(id)) throw invalid(`category id "${id}" is already used on the page.`);
  seenIds.add(id);
  for (const { name, price, image } of items) {
    if (!name || !image) throw invalid(`every dish in "${id}" needs a name and an image path.`);
    if (!Number.isFinite(price) || price < 0) throw invalid(`"${name}" has an invalid price.`);
  }
}

// Like the printed menu: "9 DT", "14,5 DT" rather than "9,000 DT".
const priceFormat = new Intl.NumberFormat("fr-TN", {
  style: "currency",
  currency: shop.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export const formatPrice = (price: number) => priceFormat.format(price);
