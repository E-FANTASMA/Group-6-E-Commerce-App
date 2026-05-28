export type CheckoutStep = "cart" | "shipping-payment" | "payment-selection" | "success";

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  category?: string;
  description?: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description: string;
  rating?: number;
  sold?: number;
  color?: string;
}

export type PromoCode = {
  code: string;
  description: string;
  discountType: "percentage" | "flat";
  value: number;
  minSpend?: number;
};

export type ShippingOption = {
  id: string;
  name: string;
  eta: string;
  price: number;
};

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type PaymentInfo = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
};

