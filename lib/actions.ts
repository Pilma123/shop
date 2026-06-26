"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export type ProductFormData = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  instagramUrl: string;
  phoneNumber: string;
  category: string;
  isAvailable: boolean;
  sortOrder: string;
};

function validate(data: ProductFormData) {
  if (!data.name.trim()) return "Product name is required.";
  const price = parseFloat(data.price);
  if (isNaN(price) || price < 0) return "Price must be a valid positive number.";
  return null;
}

export async function createProduct(data: ProductFormData) {
  const err = validate(data);
  if (err) return { error: err };

  await prisma.product.create({
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      price: parseFloat(data.price),
      imageUrl: data.imageUrl.trim(),
      instagramUrl: data.instagramUrl.trim(),
      phoneNumber: data.phoneNumber.trim(),
      category: data.category.trim() || "General",
      isAvailable: data.isAvailable,
      sortOrder: parseInt(data.sortOrder) || 0,
    },
  });

  revalidatePath("/products");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProduct(id: number, data: ProductFormData) {
  const err = validate(data);
  if (err) return { error: err };

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      price: parseFloat(data.price),
      imageUrl: data.imageUrl.trim(),
      instagramUrl: data.instagramUrl.trim(),
      phoneNumber: data.phoneNumber.trim(),
      category: data.category.trim() || "General",
      isAvailable: data.isAvailable,
      sortOrder: parseInt(data.sortOrder) || 0,
    },
  });

  revalidatePath("/products");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/admin");
  return { success: true };
}
