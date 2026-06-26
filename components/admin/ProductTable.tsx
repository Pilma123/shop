"use client";

import { Fragment, useState } from "react";
import { deleteProduct } from "@/lib/actions";
import ProductForm from "./ProductForm";

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
  products: Product[];
};

export default function ProductTable({ products }: Props) {
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(id);
    await deleteProduct(id);
    setDeleting(null);
  }

  return (
    <div>
      {/* Add product panel */}
      {adding ? (
        <div className="border border-black p-4 mb-6">
          <h2 className="font-bold text-sm uppercase mb-3">Add New Product</h2>
          <ProductForm onDone={() => setAdding(false)} />
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="bg-black text-white text-xs font-bold uppercase px-4 py-2 mb-6 hover:bg-gray-800"
        >
          + Add Product
        </button>
      )}

      {/* Products table */}
      {products.length === 0 ? (
        <p className="text-sm text-gray-500">No products yet. Add one above.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border border-black">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-700 px-2 py-1 text-left">#</th>
                <th className="border border-gray-700 px-2 py-1 text-left">Name</th>
                <th className="border border-gray-700 px-2 py-1 text-left">Category</th>
                <th className="border border-gray-700 px-2 py-1 text-left">Price</th>
                <th className="border border-gray-700 px-2 py-1 text-left">Order</th>
                <th className="border border-gray-700 px-2 py-1 text-left">Available</th>
                <th className="border border-gray-700 px-2 py-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <Fragment key={p.id}>
                  <tr className="even:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1 font-mono">{p.id}</td>
                    <td className="border border-gray-300 px-2 py-1 font-semibold">{p.name}</td>
                    <td className="border border-gray-300 px-2 py-1">{p.category}</td>
                    <td className="border border-gray-300 px-2 py-1 font-mono">€{p.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-2 py-1 font-mono">{p.sortOrder}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      {p.isAvailable ? "✓ Yes" : "✗ No"}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditing(editing === p.id ? null : p.id)}
                          className="border border-black px-2 py-0.5 text-xs hover:bg-black hover:text-white"
                        >
                          {editing === p.id ? "Close" : "Edit"}
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="border border-black px-2 py-0.5 text-xs hover:bg-black hover:text-white disabled:opacity-50"
                        >
                          {deleting === p.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editing === p.id && (
                    <tr>
                      <td colSpan={7} className="border border-gray-300 px-4 py-3 bg-gray-50">
                        <ProductForm product={p} onDone={() => setEditing(null)} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
