import { Schema, model, models } from "mongoose";

const orderItemSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const orderSchema = new Schema({
  orderItem: [{ type: orderItemSchema, required: true }],

  createdUser: { type: String, required: true },
  createdDate: { type: Date, required: true },
});

export const OrderModel = models.Order || model("Order", orderSchema);
