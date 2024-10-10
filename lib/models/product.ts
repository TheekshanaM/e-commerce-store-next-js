import { Schema, model, models } from "mongoose";
import { IProductCard } from "../types/productsTypes";

const productColorSchema = new Schema({
  colorCode: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stockCount: { type: Number, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  // productCategory: { type: Schema.Types.ObjectId, required: true },
  // brand: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  description: { type: String, required: true },
  images: [{ type: productColorSchema, required: true }],

  createdUser: { type: String, required: true },
  createdDate: { type: Date, required: true },
});

export const ProductModel =
  models.Product || model<IProductCard>("Product", productSchema);
