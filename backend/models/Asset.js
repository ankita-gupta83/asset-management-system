import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: true,
      trim: true
    },
    assetType: {
      type: String,
      required: true
    },
    serialNumber: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ["available", "assigned"],
      default: "available"
    },
    condition: {
      type: String,
      enum: ["working", "damaged", "unavailable"],
      default: "working"
    },
    assignedTo: {
      type: String,
      default: null
    },
    purchaseDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
