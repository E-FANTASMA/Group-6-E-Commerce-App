import type { Address, CartItemType, ProductType, PromoCode, ShippingOption } from "../types";

import clothesImg from "../../assets/clothes.jpg";
import leavesImg from "../../assets/leaves.jpg";
import textingImg from "../../assets/texting.jpg";
import homepagePhone from "../../assets/homepage phone.jpg";

export const cartItems: CartItemType[] = [
  {
    id: 1,
    name: "Graphic Sweatshirt",
    price: 40000,
    quantity: 1,
    image: clothesImg,
    color: "Black",
    category: "Fashion",
    description: "Premium heavy cotton graphic sweatshirt.",
  },
  {
    id: 2,
    name: "Wall Stickers Set",
    price: 12000,
    quantity: 2,
    image: leavesImg,
    color: "Green",
    category: "Home",
    description: "Minimal wall sticker set for modern interiors.",
  },
];

export const recommendedProducts: ProductType[] = [
  {
    id: 10,
    name: "Coffee Grinder",
    price: 32000,
    image: homepagePhone,
    category: "Home",
    description: "Stainless grinder with precision settings.",
    rating: 4.6,
    sold: 1200,
  },
  {
    id: 11,
    name: "Classic T-Shirt",
    price: 18000,
    image: textingImg,
    category: "Fashion",
    description: "Soft premium cotton tee.",
    rating: 4.8,
    sold: 5600,
  },
];

export const recentlyViewed: ProductType[] = [
  {
    id: 15,
    name: "Decor Lamp",
    price: 25000,
    image: leavesImg,
    category: "Home",
    description: "Warm ambient lighting for your space.",
    rating: 4.5,
    sold: 980,
  },
];

export const SAVED_ADDRESSES: Address[] = [
  {
    id: "addr_1",
    fullName: "Vale Customer",
    phone: "08000000000",
    street: "12 Example Street",
    city: "Lagos",
    state: "Lagos",
    zipCode: "100001",
  },
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "standard", name: "Standard Delivery", eta: "3–5 days", price: 2500 },
  { id: "express", name: "Express Delivery", eta: "1–2 days", price: 6000 },
];

export const PROMO_CODES: PromoCode[] = [
  { code: "VALE20", description: "20% off orders above ₦50,000", discountType: "percentage", value: 20, minSpend: 50000 },
  { code: "SHIPFREE", description: "₦2,500 off shipping", discountType: "flat", value: 2500, minSpend: 30000 },
];

