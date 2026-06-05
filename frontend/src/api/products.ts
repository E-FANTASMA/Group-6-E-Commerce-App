import { getAuthToken } from "./auth";
import { apiRequest } from "./http";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  stock_quantity: number;
};

export type ProductPayload = {
  name: string;
  description?: string;
  category: string;
  price: number;
  image_url?: string;
  stock_quantity: number;
};

type ProductsResponse = {
  success: boolean;
  data: Product[];
  message?: string;
};

type ProductResponse = {
  success: boolean;
  data: Product;
  message?: string;
};

type UploadImageResponse = {
  success: boolean;
  data: {
    publicUrl: string;
    path: string;
    bucket: string;
  };
  message?: string;
};

function token() {
  return getAuthToken();
}

export async function fetchProducts() {
  return apiRequest<ProductsResponse>("/api/products", { token: token() });
}

export async function fetchCategories() {
  return apiRequest<{ success: boolean; data: string[] }>(
    "/api/products/categories",
    { token: token() },
  );
}

export async function createProduct(payload: ProductPayload) {
  return apiRequest<ProductResponse>("/api/products", {
    method: "POST",
    token: token(),
    body: JSON.stringify(payload),
  });
}

export async function updateProduct(id: string, payload: Partial<ProductPayload>) {
  return apiRequest<ProductResponse>(`/api/products/${id}`, {
    method: "PUT",
    token: token(),
    body: JSON.stringify(payload),
  });
}

export async function deleteProduct(id: string) {
  return apiRequest<{ success: boolean; message?: string }>(
    `/api/products/${id}`,
    {
      method: "DELETE",
      token: token(),
    },
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadProductImage(file: File) {
  const imageBase64 = await fileToBase64(file);
  return apiRequest<UploadImageResponse>("/api/products/upload-image", {
    method: "POST",
    token: token(),
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      imageBase64,
      folder: "products",
    }),
  });
}
