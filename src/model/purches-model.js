// models/Purchase.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cource',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  isPurchased: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const purches= mongoose.models.purches|| mongoose.model("purches", purchaseSchema);

export default purches;
