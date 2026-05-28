import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { CheckoutStep, CartItemType, ShippingOption, PromoCode, Address } from "../commerce/types";
import { cartItems as INITIAL_CART_ITEMS, PROMO_CODES, SAVED_ADDRESSES, SHIPPING_OPTIONS } from "../commerce/data/mockData";

export default function CartPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [items, setItems] = useState<CartItemType[]>(() => INITIAL_CART_ITEMS);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [activePromo, setActivePromo] = useState<PromoCode | null>(null);
  const [selectedAddress] = useState<Address>(SAVED_ADDRESSES[0]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const discount = useMemo(() => {
    if (!activePromo) return 0;
    if (activePromo.discountType === "percentage") return Math.floor((subtotal * activePromo.value) / 100);
    return Math.min(activePromo.value, subtotal);
  }, [activePromo, subtotal]);
  const total = Math.max(0, subtotal - discount + selectedShipping.price);

  function next() {
    setStep((s) => (s === "cart" ? "shipping-payment" : s === "shipping-payment" ? "payment-selection" : "success"));
  }
  function back() {
    setStep((s) => (s === "success" ? "payment-selection" : s === "payment-selection" ? "shipping-payment" : "cart"));
  }

  function updateQty(id: number, quantity: number) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }
  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#4B433D]">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
        <button type="button" onClick={() => (step === "cart" ? navigate("/dashboard") : back())} className="text-sm font-bold text-[#214F34] flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {step === "cart" ? "Back" : "Previous"}
        </button>
        <div className="text-center">
          <div className="text-xs font-extrabold tracking-widest text-[#8D8178] uppercase">Vale</div>
          <div className="text-lg font-bold font-cormorant text-[#214F34] tracking-tight">
            {step === "cart" ? "Your Cart" : step === "shipping-payment" ? "Shipping" : step === "payment-selection" ? "Payment" : "Confirmed"}
          </div>
        </div>
        <div className="w-[64px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === "cart" && (
              <motion.div key="cart" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-white/80 border border-[#E7DBD0] rounded-[2rem] p-5 md:p-6 shadow-[0_15px_40px_rgba(75,67,61,0.04)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-cormorant text-[#214F34]">Items</h2>
                  <span className="text-xs text-[#8D8178]">{items.length} item(s)</span>
                </div>
                <div className="mt-5 space-y-4">
                  {items.length === 0 ? (
                    <div className="text-sm text-[#8D8178]">Your cart is empty.</div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-white/70 border border-[#E7DBD0]/70 rounded-2xl p-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-[#E7DBD0]/70" />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-sm truncate">{item.name}</div>
                          <div className="text-[11px] text-[#8D8178] mt-0.5">₦ {item.price.toLocaleString()} • {item.color || "Default"}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <button type="button" className="w-8 h-8 rounded-full border border-[#E7DBD0] bg-white" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button type="button" className="w-8 h-8 rounded-full border border-[#E7DBD0] bg-white" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                            <button type="button" className="ml-auto text-[11px] font-bold text-rose-600" onClick={() => removeItem(item.id)}>Remove</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {step === "shipping-payment" && (
              <motion.div key="ship" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-white/80 border border-[#E7DBD0] rounded-[2rem] p-5 md:p-6 shadow-[0_15px_40px_rgba(75,67,61,0.04)]">
                <h2 className="text-xl font-bold font-cormorant text-[#214F34]">Shipping</h2>
                <p className="text-xs text-[#8D8178] mt-1">Choose address and delivery speed.</p>

                <div className="mt-5 grid gap-4">
                  <div className="bg-white/70 border border-[#E7DBD0]/70 rounded-2xl p-4">
                    <div className="text-[10px] font-extrabold tracking-widest text-[#8D8178] uppercase">Address</div>
                    <div className="mt-2 text-sm font-bold">{selectedAddress.fullName}</div>
                    <div className="text-xs text-[#8D8178] mt-1">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}</div>
                  </div>

                  <div className="bg-white/70 border border-[#E7DBD0]/70 rounded-2xl p-4">
                    <div className="text-[10px] font-extrabold tracking-widest text-[#8D8178] uppercase">Delivery</div>
                    <div className="mt-3 grid gap-2">
                      {SHIPPING_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedShipping(opt)}
                          className={`text-left rounded-2xl border p-4 transition ${
                            selectedShipping.id === opt.id ? "bg-[#214F34]/5 border-[#214F34]/30" : "bg-white/70 border-[#E7DBD0]/70 hover:bg-white"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-sm">{opt.name}</div>
                              <div className="text-xs text-[#8D8178]">{opt.eta}</div>
                            </div>
                            <div className="font-extrabold text-sm">₦ {opt.price.toLocaleString()}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "payment-selection" && (
              <motion.div key="pay" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-white/80 border border-[#E7DBD0] rounded-[2rem] p-5 md:p-6 shadow-[0_15px_40px_rgba(75,67,61,0.04)]">
                <h2 className="text-xl font-bold font-cormorant text-[#214F34]">Payment</h2>
                <p className="text-xs text-[#8D8178] mt-1">This is a UI demo. Integrate payment gateway later.</p>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-[#E7DBD0]/70 bg-white/70 p-4">
                    <div className="font-bold text-sm">Pay on delivery</div>
                    <div className="text-xs text-[#8D8178] mt-1">Confirm order and pay when it arrives.</div>
                  </div>
                  <button type="button" onClick={next} className="w-full rounded-full bg-[#214F34] hover:bg-[#39644A] text-white font-bold py-3.5 text-sm transition-all flex items-center justify-center gap-2">
                    Confirm payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-white/80 border border-[#E7DBD0] rounded-[2rem] p-6 shadow-[0_15px_40px_rgba(75,67,61,0.04)] text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#5F8A5E]/10 border border-[#5F8A5E]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#214F34]" />
                </div>
                <h2 className="mt-4 text-2xl font-bold font-cormorant text-[#214F34] tracking-tight">Order Confirmed</h2>
                <p className="mt-2 text-xs text-[#8D8178]">Thanks for your order. This is the confirmation screen.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button type="button" onClick={() => navigate("/dashboard")} className="rounded-full bg-[#214F34] hover:bg-[#39644A] text-white font-bold py-3 px-5 text-sm">
                    Continue shopping
                  </button>
                  <button type="button" onClick={() => setStep("cart")} className="rounded-full border border-[#E7DBD0] bg-white/80 py-3 px-5 text-sm font-bold text-[#214F34]">
                    Back to cart
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/80 border border-[#E7DBD0] rounded-[2rem] p-5 md:p-6 shadow-[0_15px_40px_rgba(75,67,61,0.04)] sticky top-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#214F34]" />
              <h3 className="text-lg font-bold font-cormorant text-[#214F34]">Order summary</h3>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#8D8178]">
                <span>Subtotal</span>
                <span className="font-bold text-[#4B433D]">₦ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8D8178]">
                <span>Discount</span>
                <span className="font-bold text-[#4B433D]">- ₦ {discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8D8178]">
                <span>Delivery</span>
                <span className="font-bold text-[#4B433D]">₦ {selectedShipping.price.toLocaleString()}</span>
              </div>
              <div className="border-t border-[#E7DBD0]/70 pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-extrabold text-[#16914A]">₦ {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-extrabold tracking-widest text-[#8D8178] uppercase">Promo</div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {PROMO_CODES.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setActivePromo(p)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition ${
                      activePromo?.code === p.code ? "bg-[#214F34] text-white border-[#214F34]" : "bg-white/70 border-[#E7DBD0] text-[#4B433D] hover:bg-white"
                    }`}
                  >
                    {p.code}
                  </button>
                ))}
                {activePromo && (
                  <button type="button" onClick={() => setActivePromo(null)} className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-rose-200 text-rose-600 bg-rose-50">
                    Remove
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={next}
              disabled={items.length === 0 || step === "success"}
              className="mt-6 w-full rounded-full bg-[#214F34] hover:bg-[#39644A] disabled:opacity-50 text-white font-bold py-3.5 text-sm transition-all flex items-center justify-center gap-2"
            >
              {step === "cart" ? "Go to shipping" : step === "shipping-payment" ? "Go to payment" : step === "payment-selection" ? "Confirm" : "Done"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
