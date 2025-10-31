import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountType: {
    type: String,
    enum: ["flat", "percent"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Promo = mongoose.model("Promo", promoSchema);
export default Promo;
