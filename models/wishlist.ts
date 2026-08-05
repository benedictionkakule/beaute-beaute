import mongoose, { Schema, models } from "mongoose";

const WishlistSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    productId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);