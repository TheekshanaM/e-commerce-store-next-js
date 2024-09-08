import { Schema, model, models } from "mongoose";
import { IProductCard } from "../types/productsTypes";

const productSchema = new Schema<IProductCard>({
  // _id: number;
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  soldCount: { type: Number, required: true },
  rating: { type: Number, required: true },
});

export const ProductModel =
  models.Product || model<IProductCard>("Product", productSchema);
