import { Criminal } from '../models/criminal.models.js';
import { Police } from '../models/police.models.js';


// Get all criminals
export const getCriminals = async (req, res) => {
  try {
    const criminals = await Criminal.find().populate('addedBy', 'fullname role');
    res.status(200).json(criminals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add criminal
export const addCriminal = async (req, res) => {
  try {
    const newCriminal = new Criminal({
      ...req.body,
      addedBy: req.user.id,
      lastUpdatedBy: {
        name: req.user.fullname,
        badgeNumber: req.user.role === 'police' ? req.user.badgeNumber : null
      }
    });

    await newCriminal.save();
    res.status(201).json({ message: 'Criminal added successfully', newCriminal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update criminal
export const updateCriminal = async (req, res) => {
  try {
    const { criminalId } = req.params;
    const criminal = await Criminal.findById(criminalId);
    if (!criminal) return res.status(404).json({ message: 'Criminal not found' });

    if (req.user.role === 'user') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedData = {
      ...req.body,
      lastUpdatedBy: {
        name: req.user.fullname,
        badgeNumber: req.user.role === 'police' ? req.user.badgeNumber : null
      }
    };

    const updated = await Criminal.findByIdAndUpdate(criminalId, updatedData, { new: true });
    res.status(200).json({ message: 'Criminal updated', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete criminal (Admin only)
export const deleteCriminal = async (req, res) => {
  try {
    const { criminalId } = req.params;
    const criminal = await Criminal.findById(criminalId);
    if (!criminal) return res.status(404).json({ message: 'Criminal not found' });

    await criminal.deleteOne();
    res.status(200).json({ message: 'Criminal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
