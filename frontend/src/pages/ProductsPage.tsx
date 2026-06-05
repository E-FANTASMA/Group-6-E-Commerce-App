import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("token");

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

  return (
    <div style={{ padding: 24 }}>
      <h1>Products</h1>

      <button
        onClick={() => navigate("/admin/dashboard")}
        style={{ marginBottom: 20 }}
      >
        Back
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src =
                    "https://via.placeholder.com/300x180?text=Product";
                }}
              />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p>
                <strong>
                  ₦{product.price.toLocaleString()}
                </strong>
              </p>

              <button
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
