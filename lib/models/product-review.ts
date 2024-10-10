import { Schema, model, models } from "mongoose";

const replySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  comment: { type: String, required: true },
});

const productReviewSchema = new Schema({
  orderItemId: { type: Schema.Types.ObjectId, required: true },

  // userId: { type: Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  reply: [{ type: replySchema }],
});

export const ProductReviewModel =
  models.ProductReview || model("ProductReview", productReviewSchema);
