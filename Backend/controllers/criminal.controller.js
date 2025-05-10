import { Criminal } from '../models/criminal.models.js';

// Add a new criminal
export const addCriminal = async (req, res) => {
  const { fullname, dob, address, crimeDetails, arrestDate, status } = req.body;

  try {
    const newCriminal = new Criminal({
      fullname,
      dob,
      address,
      crimeDetails,
      arrestDate,
      status,
      addedBy: req.user.id, // ID of the user adding the criminal
    });

    await newCriminal.save();
    res.status(201).json({ message: 'Criminal added successfully', criminal: newCriminal });
  } catch (error) {
    res.status(500).json({ message: 'Error adding criminal', error: error.message });
  }
};

// Update a criminal record
export const updateCriminal = async (req, res) => {
  const { criminalId } = req.params;
  const updates = req.body;

  try {
    const updatedCriminal = await Criminal.findByIdAndUpdate(criminalId, updates, { new: true });
    if (!updatedCriminal) return res.status(404).json({ message: 'Criminal not found' });

    res.status(200).json({ message: 'Criminal updated successfully', criminal: updatedCriminal });
  } catch (error) {
    res.status(500).json({ message: 'Error updating criminal', error: error.message });
  }
};

// Get all criminals (read-only for users)
export const getCriminals = async (req, res) => {
  try {
    const criminals = await Criminal.find({}, 'fullname dob crimeDetails'); // Restrict fields
    res.status(200).json({ criminals });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching criminals', error: error.message });
  }
};