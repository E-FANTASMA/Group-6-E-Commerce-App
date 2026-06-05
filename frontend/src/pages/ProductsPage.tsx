import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  uploadProductImage,
  type Product,
  type ProductPayload,
} from "../api/products";

const emptyForm: ProductPayload = {
  name: "",
  description: "",
  category: "",
  price: 0,
  image_url: "",
  stock_quantity: 0,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductPayload>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const result = await fetchProducts();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: Number(product.price),
      image_url: product.image_url || "",
      stock_quantity: Number(product.stock_quantity),
    });
    setImageFile(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Product name is required.");
      return;
    }
    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }
    if (Number(form.price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    try {
      setSaving(true);
      let imageUrl = form.image_url?.trim() || "";

      if (imageFile) {
        const uploadResult = await uploadProductImage(imageFile);
        if (uploadResult.success) {
          imageUrl = uploadResult.data.publicUrl;
        }
      }

      const payload: ProductPayload = {
        name: form.name.trim(),
        description: form.description?.trim() || "",
        category: form.category.trim(),
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity) || 0,
        ...(imageUrl ? { image_url: imageUrl } : {}),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        alert("Product updated successfully.");
      } else {
        await createProduct(payload);
        alert("Product created successfully.");
      }

      closeForm();
      await loadProducts();
    } catch (error: any) {
      alert(error?.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(`Delete "${product.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      alert("Product deleted.");
      await loadProducts();
    } catch (error: any) {
      alert(error?.message || "Failed to delete product.");
    }
  }

  return (
    <AdminLayout
      title="Products"
      subtitle="Upload items for sale, manage inventory, and keep your storefront up to date."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#5f5952]">
          {products.length} product{products.length === 1 ? "" : "s"} listed
        </p>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f4d34]"
        >
          <Plus size={18} />
          Add product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[#5f5952]">Loading products...</p>
      ) : products.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#d8ccc0] bg-white/60 p-10 text-center">
          <p className="text-[#5f5952]">No products yet. Add your first item for sale.</p>
          <button
            type="button"
            onClick={openCreateForm}
            className="mt-4 rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white"
          >
            Add product
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[24px] border border-[#e7dbd0] bg-white/80 shadow-sm"
            >
              <div className="aspect-[4/3] bg-[#f0ebe4]">
                <img
                  src={product.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    (event.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d8178]">
                  {product.category}
                </p>
                <h3 className="mt-1 font-['Cormorant_Garamond'] text-2xl font-bold text-[#1f1b18]">
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#5f5952]">
                  {product.description || "No description"}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-[#1f1b18]">
                      ₦{Number(product.price).toLocaleString()}
                    </p>
                    <p className="text-xs text-[#8d8178]">
                      Stock: {product.stock_quantity}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                      className="rounded-xl border border-[#e7dbd0] bg-white p-2.5 text-[#2d7a4f] hover:bg-[#f5f2ec]"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="rounded-xl border border-[#f2d6d6] bg-[#fff5f5] p-2.5 text-[#b71c1c] hover:bg-[#ffebee]"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={closeForm}
          role="presentation"
        >
          <form
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-[#f5f2ec] p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f1b18]">
                {editingId ? "Edit product" : "Add product"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-[#e7dbd0] bg-white p-2"
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#444]">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66]"
                  placeholder="e.g. Linen Summer Shirt"
                  required
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#444]">Category</span>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66]"
                  placeholder="e.g. Fashion"
                  required
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#444]">Description</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="min-h-[96px] w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66]"
                  placeholder="Short product description"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-[#444]">Price (₦)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66]"
                    required
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-[#444]">Stock quantity</span>
                  <input
                    type="number"
                    min="0"
                    value={form.stock_quantity}
                    onChange={(e) =>
                      setForm({ ...form, stock_quantity: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66]"
                    required
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#444]">Image URL (optional)</span>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm outline-none focus:border-[#4E8A66]"
                  placeholder="https://..."
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#444]">
                  Upload image (optional)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-[#e6e1db] bg-white px-4 py-3 text-sm"
                />
                <span className="mt-1 block text-xs text-[#8d8178]">
                  JPEG, PNG, WebP or GIF — max 5MB
                </span>
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="flex-1 rounded-full border border-[#e7dbd0] bg-white px-5 py-3 text-sm font-semibold text-[#5f5952]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-full bg-[#2d7a4f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1f4d34] disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update product" : "Create product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
