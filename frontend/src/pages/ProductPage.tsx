import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuthToken } from '../api/auth'

type Product = {
  id: string
  name: string
  description: string
  category: string
  price: number | string
  image_url?: string
  stock_quantity: number
}

function BrandLogo() {
  return (
    <h1 style={{ fontFamily: "'Plaster', cursive", fontSize: '32px', lineHeight: '1' }}>
      <span style={{ color: '#4E8A66' }}>V</span>
      <span style={{ color: '#DCCFC0' }}>a</span>
      <span style={{ color: '#4E8A66' }}>l</span>
      <span style={{ color: '#DCCFC0' }}>e</span>
    </h1>
  )
}

export default function ProductPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product as Product | undefined

  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#2b1d18] px-6 py-10 font-sans">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-[#f5f2ec] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8e857d]">Product details</p>
              <h2 className="mt-1 text-3xl font-bold text-[#1f1b18]">Product not found</h2>
            </div>
            <BrandLogo />
          </div>
          <p className="mb-6 max-w-lg text-base text-[#5f5952]">
            We could not load the item details from the previous page. Head back to the shop and choose a product again.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="rounded-full bg-[#2d7a4f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24613f]"
          >
            Back To Shop
          </button>
        </div>
      </div>
    )
  }

  const currentProduct = product
  const price = Number(currentProduct.price).toLocaleString()
  const inStock = currentProduct.stock_quantity > 0

  async function addToCart() {
    try {
      setLoading(true)

      const token = getAuthToken()

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: currentProduct.id,
          quantity,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('Product added to cart successfully')
      } else {
        alert(result.message || 'Failed to add product')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1))
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(currentProduct.stock_quantity || 1, current + 1))
  }

  return (
    <div className="min-h-screen bg-[#2b1d18] px-4 py-6 sm:px-6 sm:py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background: #2b1d18;
        }
      `}</style>

      <div className="mx-auto max-w-6xl rounded-[32px] bg-[#f5f2ec] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 rounded-full border border-[#ddd2c6] bg-white px-4 py-2 text-sm font-semibold text-[#3e3a36] transition-colors hover:border-[#2d7a4f] hover:text-[#2d7a4f]"
          >
            <span>←</span>
            <span>Back To Shop</span>
          </button>
          <BrandLogo />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[28px] border border-[#e5dbcf] bg-white">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#ede5da] via-[#f7f2eb] to-[#e3d8ca] p-6 sm:min-h-[500px]">
              {product.image_url ? (
                <img
                  src={currentProduct.image_url}
                  alt={currentProduct.name}
                  className="max-h-[460px] w-full rounded-[20px] object-contain"
                />
              ) : (
                <div className="flex h-full min-h-[260px] w-full items-center justify-center rounded-[20px] border border-dashed border-[#cfc1b2] bg-[#f8f4ef] text-center">
                  <div>
                    <p className="text-lg font-semibold text-[#3b342d]">{currentProduct.name}</p>
                    <p className="mt-2 text-sm text-[#8a8178]">Product image unavailable</p>
                  </div>
                </div>
              )}
              <div className="absolute left-5 top-5 rounded-full bg-[#2d7a4f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {currentProduct.category}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-[28px] border border-[#e5dbcf] bg-white p-6 sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#8f877f]">Product Details</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1f1b18] sm:text-4xl">{currentProduct.name}</h1>
              <p className="mt-4 text-base leading-7 text-[#5f5952]">{currentProduct.description}</p>

              <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-[#8f877f]">Price</p>
                  <p className="mt-1 text-3xl font-bold text-[#c04a3c]">₦{price}</p>
                </div>
                <div className="rounded-2xl bg-[#f5f2ec] px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8f877f]">Availability</p>
                  <p className={`mt-1 text-sm font-semibold ${inStock ? 'text-[#2d7a4f]' : 'text-[#c04a3c]'}`}>
                    {inStock ? `${currentProduct.stock_quantity} in stock` : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e5dbcf] bg-white p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#8f877f]">Purchase</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#1f1b18]">Choose quantity</h2>
                </div>
                <div className="rounded-full bg-[#eef4ef] px-4 py-2 text-sm font-semibold text-[#2d7a4f]">
                  Ready to cart
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-[#ddd2c6] bg-[#f9f5ef] p-1">
                  <button
                    onClick={decreaseQuantity}
                    disabled={!inStock || quantity <= 1}
                    className="h-11 w-11 rounded-full text-xl text-[#3b342d] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    -
                  </button>
                  <div className="min-w-[72px] text-center text-lg font-semibold text-[#1f1b18]">{quantity}</div>
                  <button
                    onClick={increaseQuantity}
                    disabled={!inStock || quantity >= currentProduct.stock_quantity}
                    className="h-11 w-11 rounded-full text-xl text-[#3b342d] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <input
                  type="number"
                  min={1}
                  max={Math.max(currentProduct.stock_quantity, 1)}
                  value={quantity}
                  onChange={(e) => {
                    const nextValue = Number(e.target.value)
                    if (Number.isNaN(nextValue)) return
                    setQuantity(Math.min(Math.max(nextValue, 1), Math.max(currentProduct.stock_quantity, 1)))
                  }}
                  className="h-12 w-28 rounded-full border border-[#ddd2c6] bg-white px-4 text-center text-base font-semibold text-[#1f1b18] outline-none focus:border-[#2d7a4f]"
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f5f2ec] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8f877f]">Category</p>
                  <p className="mt-2 text-sm font-semibold text-[#1f1b18]">{currentProduct.category}</p>
                </div>
                <div className="rounded-2xl bg-[#f5f2ec] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8f877f]">Selected Total</p>
                  <p className="mt-2 text-sm font-semibold text-[#1f1b18]">
                    ₦{(Number(currentProduct.price) * quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={addToCart}
                disabled={loading || !inStock}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2d7a4f] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#24613f] disabled:cursor-not-allowed disabled:bg-[#9ab7a5]"
              >
                <span>{loading ? 'Adding...' : 'Add To Cart'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
