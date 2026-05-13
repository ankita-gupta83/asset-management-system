import Asset from "../models/Asset.js";

// @desc    Add new asset
// @route   POST /api/assets
// @access  Public (for now)
export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all assets
// @route   GET /api/assets
// @access  Public (for now)
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign asset to employee
// @route   PUT /api/assets/:id/assign
export const assignAsset = async (req, res) => {
  const { assignedTo } = req.body;

  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    // BLOCK DAMAGED ASSETS
    if (asset.condition === "damaged") {
      return res.status(400).json({
        message: "Damaged assets cannot be assigned",
      });
    }

    asset.assignedTo = assignedTo;
    asset.status = "assigned";

    await asset.save();
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: "Assign failed" });
  }
};



// UPDATE asset
export const updateAsset = async (req, res) => {
  try {
    const { condition } = req.body;

    let updateData = { ...req.body };

    if (condition === "damaged") {
      updateData.status = "unavailable";
      updateData.assignedTo = "";
    }

    if (condition === "working") {
      updateData.status = "available";
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedAsset);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE asset
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

