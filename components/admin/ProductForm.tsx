"use client";

import { useState, useRef } from "react";
import { createProduct, updateProduct, ProductFormData } from "@/lib/actions";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  instagramUrl: string;
  phoneNumber: string;
  category: string;
  isAvailable: boolean;
  sortOrder: number;
};

type Props = {
  product?: Product;
  onDone: () => void;
};

const EMPTY: ProductFormData = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  instagramUrl: "https://instagram.com/yourbusiness",
  phoneNumber: "+372 5555 5555",
  category: "General",
  isAvailable: true,
  sortOrder: "0",
};

export default function ProductForm({ product, onDone }: Props) {
  const [data, setData] = useState<ProductFormData>(
    product
      ? {
          name: product.name,
          description: product.description,
          price: String(product.price),
          imageUrl: product.imageUrl,
          instagramUrl: product.instagramUrl,
          phoneNumber: product.phoneNumber,
          category: product.category,
          isAvailable: product.isAvailable,
          sortOrder: String(product.sortOrder),
        }
      : EMPTY
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function set(key: keyof ProductFormData, value: string | boolean) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);
    if (json.url) {
      set("imageUrl", json.url);
    } else {
      setError(json.error || "Upload failed");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = product
      ? await updateProduct(product.id, data)
      : await createProduct(data);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      onDone();
    }
  }

  const field = (
    label: string,
    key: keyof ProductFormData,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type={type}
        value={data[key] as string}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        className="w-full border border-black px-2 py-1 text-sm font-mono"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
      {field("Product Name *", "name", "text", "e.g. Handmade Candle")}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide mb-1">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          className="w-full border border-black px-2 py-1 text-sm font-mono resize-y"
          placeholder="Short product description..."
        />
      </div>
      {field("Price (€) *", "price", "text", "e.g. 24.99")}
      {field("Category", "category", "text", "e.g. Home & Decor")}
      {field("Sort Order", "sortOrder", "number", "0")}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide mb-1">
          Image URL or Upload
        </label>
        <input
          type="text"
          value={data.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://... or leave blank and upload below"
          className="w-full border border-black px-2 py-1 text-sm font-mono mb-1"
        />
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="text-xs"
          />
          {uploading && <span className="text-xs">Uploading...</span>}
        </div>
        {/* NOTE: This uploads to /public/uploads/ — local dev only.
            For production, wire this up to Cloudinary, Supabase Storage, or S3. */}
      </div>

      {field("Instagram URL", "instagramUrl", "url", "https://instagram.com/...")}
      {field("Phone Number", "phoneNumber", "text", "+372 5555 5555")}

      <div className="flex items-center gap-2">
        <input
          id="available"
          type="checkbox"
          checked={data.isAvailable}
          onChange={(e) => set("isAvailable", e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="available" className="text-xs font-bold uppercase tracking-wide">
          Available (visible to customers)
        </label>
      </div>

      {error && (
        <p className="border border-black bg-gray-100 px-2 py-1 text-xs">{error}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-black text-white text-xs font-bold uppercase px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="border border-black text-xs font-bold uppercase px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
