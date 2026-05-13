import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createAsset,
  getAssets,
  assignAsset,
  updateAsset,
  deleteAsset
} from "../controllers/assetController.js";

const router = express.Router();


router.get("/", protect, getAssets);
router.post("/", protect, createAsset);
router.put("/:id", protect, updateAsset);
router.put("/:id/assign", protect, assignAsset);
router.delete("/:id", protect, deleteAsset);


export default router;
