import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../api/auth";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export default function ShopPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const token = getAuthToken();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((product) => product.category?.trim())
          .filter(Boolean)
      )
    );

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, search]);

  const featuredProduct = filteredProducts[0] || products[0];
  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock_quantity || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#2b1d18] px-4 py-6 sm:px-6 sm:py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background: #2b1d18;
        }
      `}</style>

      <div className="mx-auto max-w-6xl rounded-[32px] bg-[#f5f2ec] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#8d8178]">
              Vale Store
            </p>
            <h1 className="mt-2 font-['Cormorant_Garamond'] text-4xl font-bold text-[#1f1b18] sm:text-5xl">
              Shop the latest picks
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f5952] sm:text-base">
              Browse curated finds, open your cart, fund your wallet, or jump into
              your account without leaving the storefront.
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'Plaster', cursive",
              fontSize: "42px",
              lineHeight: "1",
            }}
          >
            <span style={{ color: "#4E8A66" }}>V</span>
            <span style={{ color: "#DCCFC0" }}>a</span>
            <span style={{ color: "#4E8A66" }}>l</span>
            <span style={{ color: "#DCCFC0" }}>e</span>
          </h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="overflow-hidden rounded-[30px] bg-gradient-to-br from-[#1f4d34] via-[#2d7a4f] to-[#8aa98b] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.34em] text-white/70">
              Featured
            </p>
            <h3 className="mt-3 max-w-md font-['Cormorant_Garamond'] text-4xl font-bold leading-none sm:text-5xl">
              {featuredProduct ? featuredProduct.name : "Fresh arrivals waiting"}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/80">
              {featuredProduct
                ? featuredProduct.description
                : "Your storefront will populate here as soon as products are available."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  featuredProduct &&
                  navigate(`/product/${featuredProduct.id}`, {
                    state: { product: featuredProduct },
                  })
                }
                disabled={!featuredProduct}
                className="rounded-full bg-[#f5f2ec] px-5 py-3 text-sm font-semibold text-[#1f4d34] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-white/50"
              >
                View Featured Product
              </button>
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Open Cart
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="rounded-[22px] bg-white/10 p-4 text-left transition-colors hover:bg-white/15"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-white/65">
                  Cart
                </div>
                <div className="mt-2 text-lg font-semibold">Review items</div>
              </button>
              <button
                type="button"
                onClick={() => navigate("/wallet/fund")}
                className="rounded-[22px] bg-white/10 p-4 text-left transition-colors hover:bg-white/15"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-white/65">
                  Wallet
                </div>
                <div className="mt-2 text-lg font-semibold">Fund balance</div>
              </button>
              <button
                type="button"
                onClick={() => navigate("/account")}
                className="rounded-[22px] bg-white/10 p-4 text-left transition-colors hover:bg-white/15"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-white/65">
                  Account
                </div>
                <div className="mt-2 text-lg font-semibold">Manage profile</div>
              </button>
            </div>
          </section>

          <section className="rounded-[30px] border border-[#e5dbcf] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8f877f]">
                  Store Snapshot
                </p>
                <h3 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f1b18]">
                  Browse with ease
                </h3>
              </div>
              <div className="rounded-full bg-[#eef4ef] px-4 py-2 text-sm font-semibold text-[#2d7a4f]">
                {loading ? "Syncing..." : `${filteredProducts.length} items`}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8f877f]">
                  Search
                </span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, category, or description"
                  className="h-12 w-full rounded-full border border-[#ddd2c6] bg-[#f9f5ef] px-5 text-sm text-[#1f1b18] outline-none transition-colors focus:border-[#2d7a4f]"
                />
              </label>

              <div>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8f877f]">
                  Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeCategory === category
                          ? "bg-[#2d7a4f] text-white"
                          : "border border-[#ddd2c6] bg-white text-[#5f5952] hover:border-[#2d7a4f] hover:text-[#2d7a4f]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] bg-[#f5f2ec] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8f877f]">
                    Collections
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#1f1b18]">
                    {Math.max(categories.length - 1, 0)}
                  </p>
                </div>
                <div className="rounded-[24px] bg-[#f5f2ec] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8f877f]">
                    Available Stock
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#1f1b18]">
                    {totalStock}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#8d8178]">
              All Products
            </p>
            <h2 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f1b18] sm:text-4xl">
              Discover your next pick
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/wallet/fund")}
              className="rounded-full border border-[#ddd2c6] bg-white px-4 py-2 text-sm font-semibold text-[#3e3a36] transition-colors hover:border-[#2d7a4f] hover:text-[#2d7a4f]"
            >
              Fund Wallet
            </button>
            <button
              type="button"
              onClick={() => navigate("/account")}
              className="rounded-full border border-[#ddd2c6] bg-white px-4 py-2 text-sm font-semibold text-[#3e3a36] transition-colors hover:border-[#2d7a4f] hover:text-[#2d7a4f]"
            >
              Account
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[28px] border border-[#e5dbcf] bg-white p-4"
              >
                <div className="h-56 animate-pulse rounded-[22px] bg-[#ece4da]" />
                <div className="mt-4 h-4 w-24 animate-pulse rounded-full bg-[#ece4da]" />
                <div className="mt-3 h-7 w-3/4 animate-pulse rounded-full bg-[#ece4da]" />
                <div className="mt-3 h-14 animate-pulse rounded-[18px] bg-[#f5f2ec]" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-6 rounded-[28px] border border-dashed border-[#d7c9ba] bg-white px-6 py-12 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-[#8f877f]">
              No Matches
            </p>
            <h3 className="mt-3 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f1b18]">
              Try a different search or category
            </h3>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24613f]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[28px] border border-[#e5dbcf] bg-white p-4 shadow-[0_18px_40px_rgba(43,29,24,0.06)] transition-transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#ede5da] via-[#f7f2eb] to-[#e3d8ca]">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-center">
                      <div>
                        <p className="text-base font-semibold text-[#3b342d]">
                          {product.name}
                        </p>
                        <p className="mt-2 text-sm text-[#8a8178]">
                          Image unavailable
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2d7a4f]">
                    {product.category}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#1f1b18]">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#8f877f]">
                        Stock: {product.stock_quantity}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-[#c04a3c]">
                      N{Number(product.price).toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5f5952]">
                    {product.description}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/product/${product.id}`, {
                          state: { product },
                        })
                      }
                      className="flex-1 rounded-full bg-[#2d7a4f] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24613f]"
                    >
                      View Product
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/cart")}
                      className="rounded-full border border-[#ddd2c6] px-4 py-3 text-sm font-semibold text-[#3e3a36] transition-colors hover:border-[#2d7a4f] hover:text-[#2d7a4f]"
                    >
                      Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[28px] bg-[#1f1b18] px-5 py-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Quick Navigation
            </p>
            <p className="mt-2 text-sm text-white/80">
              Move between your storefront, cart, wallet, and account from one
              place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1f1b18]"
            >
              Cart
            </button>
            <button
              type="button"
              onClick={() => navigate("/wallet/fund")}
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white"
            >
              Wallet
            </button>
            <button
              type="button"
              onClick={() => navigate("/account")}
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white"
            >
              Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
