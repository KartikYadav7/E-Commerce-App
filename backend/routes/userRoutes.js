import express from 'express';
import User from '../models/user.js';
import Category from '../models/category.js';
import {verifyToken} from '../middleware/authMiddleware.js'
const router = express.Router();

// GET /api/user/interests

router.get('/categories',async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    const total = await Category.countDocuments();
    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ name: 1 }); // optional sorting

    res.json({ categories, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/interests',verifyToken,async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('selectedCategories');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return category names (or entire category objects if you want)
    res.json({ interests: user.selectedCategories.map(cat => cat.name) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user's selected categories by category names
router.post('/interests',verifyToken,async (req, res) => {
  try {
    const { interests } = req.body; // interests: array of category names
    if (!Array.isArray(interests)) {
      return res.status(400).json({ message: 'Interests must be an array of category names' });
    }

    // Find categories by names
    const categories = await Category.find({ name: { $in: interests } });

    // Update user's selectedCategories with their ObjectIds
    await User.findByIdAndUpdate(req.user.id, {
      selectedCategories: categories.map(cat => cat._id),
    });

    res.json({ message: 'Interests updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
