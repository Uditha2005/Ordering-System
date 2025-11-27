const Preorder = require('../models/Preorder');

// Create a new preorder
exports.createPreorder = async (req, res) => {
  try {
    const preorder = new Preorder(req.body);
    await preorder.save();
    res.status(201).json(preorder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all preorders
exports.getAllPreorders = async (req, res) => {
  try {
    const preorders = await Preorder.find().sort({ orderDate: -1 });
    res.json(preorders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get preorders by username
exports.getPreordersByUsername = async (req, res) => {
  try {
    const preorders = await Preorder.find({ username: req.params.username })
      .sort({ orderDate: -1 });
    res.json(preorders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get preorder by ID
exports.getPreorderById = async (req, res) => {
  try {
    const preorder = await Preorder.findById(req.params.id);
    if (!preorder) {
      return res.status(404).json({ message: 'Preorder not found' });
    }
    res.json(preorder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update preorder
exports.updatePreorder = async (req, res) => {
  try {
    const preorder = await Preorder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!preorder) {
      return res.status(404).json({ message: 'Preorder not found' });
    }
    res.json(preorder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete preorder
exports.deletePreorder = async (req, res) => {
  try {
    const preorder = await Preorder.findByIdAndDelete(req.params.id);
    if (!preorder) {
      return res.status(404).json({ message: 'Preorder not found' });
    }
    res.json({ message: 'Preorder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 