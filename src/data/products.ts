import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import p11 from "@/assets/p11.jpg";
import p12 from "@/assets/p12.jpg";

/**
 * BUSINESS DETAILS — edit here to update the whole site.
 */
export const BUSINESS = {
  name: "Xandra's Bag Haven",
  slogan: "Carry Confidence. Carry Style.",
  location: "Abuja, Nigeria",
  delivery: "Nationwide Delivery",
  phone: "09055094723",
  whatsappDisplay: "09012777526",
  whatsappIntl: "2349012777526",
  email: "Njokuesther923@gmail.com",
} as const;

/**
 * CATEGORIES — add a new category name here and use it on a product below.
 */
export const CATEGORIES = [
  "Handbags",
  "Shoulder Bags",
  "Tote Bags",
  "Crossbody Bags",
  "Mini Bags",
  "Backpacks",
  "Travel Bags",
  "Clutch & Evening Bags",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  price: number; // in Naira — change freely
  category: Category;
  image: string;
  short: string;
  description: string;
  colours: string[];
};

/**
 * PRODUCTS — add, remove, re-price or swap images here.
 * To add a new bag: copy a block, give it a new id, and import its image above.
 */
export const PRODUCTS: Product[] = [
  {
    id: "classic-luxe-handbag",
    name: "Classic Luxe Handbag",
    price: 35000,
    category: "Handbags",
    image: p1,
    short: "Structured everyday luxury with polished gold hardware.",
    description:
      "A timeless structured handbag in rich grained leather finish, with sturdy top handles and a detachable shoulder strap. Roomy enough for your daily essentials while keeping a clean, polished silhouette — perfect for work, church and outings.",
    colours: ["Chocolate Brown", "Black", "Cream"],
  },
  {
    id: "elegant-lady-shoulder-bag",
    name: "Elegant Lady Shoulder Bag",
    price: 28000,
    category: "Shoulder Bags",
    image: p2,
    short: "Quilted finish with a delicate gold chain strap.",
    description:
      "Softly quilted with a slim gold chain strap that can be worn single or doubled. A refined, feminine piece that lifts simple outfits instantly — ideal for dinners, owambe and weekend brunch.",
    colours: ["Champagne Beige", "Blush Pink", "Black"],
  },
  {
    id: "everyday-tote-bag",
    name: "Everyday Tote Bag",
    price: 25000,
    category: "Tote Bags",
    image: p3,
    short: "Soft, roomy and easy to carry all day.",
    description:
      "A relaxed slouchy tote with long shoulder straps and a spacious lined interior. Fits a tablet, notebook, purse and more — your reliable companion for market runs, lectures and busy days.",
    colours: ["Taupe", "Chocolate Brown", "Camel"],
  },
  {
    id: "chic-crossbody-bag",
    name: "Chic Crossbody Bag",
    price: 22000,
    category: "Crossbody Bags",
    image: p4,
    short: "Hands-free elegance with a smooth adjustable strap.",
    description:
      "A neat crossbody with a fold-over flap, gold clasp and adjustable strap so you can wear it high or low. Compact but thoughtfully organised for your phone, cards and lipstick.",
    colours: ["Caramel Tan", "Off-White", "Black"],
  },
  {
    id: "mini-pearl-bag",
    name: "Mini Pearl Bag",
    price: 18000,
    category: "Mini Bags",
    image: p5,
    short: "A tiny statement piece with a pearl handle.",
    description:
      "Delicate and dressy, finished with a hand-set pearl top handle and gold turn-lock. The perfect finishing touch for weddings, birthdays and evening events.",
    colours: ["Ivory", "Pearl White", "Champagne"],
  },
  {
    id: "executive-office-tote",
    name: "Executive Office Tote",
    price: 32000,
    category: "Tote Bags",
    image: p6,
    short: "Laptop-friendly and quietly commanding.",
    description:
      "A structured office tote with a padded laptop sleeve, side zip pocket and reinforced base. Keeps documents crease-free and looks sharp in every boardroom.",
    colours: ["Deep Chocolate", "Black", "Navy"],
  },
  {
    id: "soft-leather-handbag",
    name: "Soft Leather Handbag",
    price: 40000,
    category: "Handbags",
    image: p7,
    short: "Buttery pebbled leather feel with a relaxed drape.",
    description:
      "Generously sized with a soft slouch, gold top zip and comfortable shoulder handle. A premium everyday piece that only gets more beautiful with wear.",
    colours: ["Champagne Beige", "Chocolate Brown", "Grey"],
  },
  {
    id: "city-girl-crossbody",
    name: "City Girl Crossbody",
    price: 20000,
    category: "Crossbody Bags",
    image: p8,
    short: "Braided strap, easy attitude, goes with everything.",
    description:
      "A modern bucket-style crossbody with a chunky braided strap and gold clip hardware. Light, casual and effortless for daily movement around town.",
    colours: ["Black", "Chocolate Brown", "Cream"],
  },
  {
    id: "elegant-evening-clutch",
    name: "Elegant Evening Clutch",
    price: 17000,
    category: "Clutch & Evening Bags",
    image: p9,
    short: "Pleated satin with a crystal brooch clasp.",
    description:
      "A softly pleated satin clutch with a sparkling crystal centrepiece and hidden chain, so you can carry it or wear it. Made for weddings, galas and evening dinners.",
    colours: ["Champagne Gold", "Ivory", "Black"],
  },
  {
    id: "travel-weekender-bag",
    name: "Travel Weekender Bag",
    price: 38000,
    category: "Travel Bags",
    image: p10,
    short: "Canvas and leather trim built for short trips.",
    description:
      "A spacious weekender with leather-trimmed handles, detachable shoulder strap and wide zip opening. Enough room for two or three days away without checking luggage.",
    colours: ["Sand & Tan", "Chocolate Brown", "Black"],
  },
  {
    id: "stylish-everyday-backpack",
    name: "Stylish Everyday Backpack",
    price: 27000,
    category: "Backpacks",
    image: p11,
    short: "Smart, comfortable and gently structured.",
    description:
      "A minimal leather-look backpack with padded adjustable straps, side pockets and a smooth gold zip. Comfortable for school, work or travel days.",
    colours: ["Mocha Brown", "Black", "Tan"],
  },
  {
    id: "luxury-statement-bag",
    name: "Luxury Statement Bag",
    price: 45000,
    category: "Handbags",
    image: p12,
    short: "Sculptural hardware and a crisp, confident shape.",
    description:
      "Our most refined silhouette: a crisply structured frame, gold plaque closure and rolled top handle. The kind of bag people compliment before they greet you.",
    colours: ["Cream", "Chocolate Brown", "Powder Blue"],
  },
];

export const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsappIntl}?text=${encodeURIComponent(message)}`;
