import { User } from '../models/user.models.js';

// Get all users (restricted fields for police)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullname email dob address isVerified'); // Restrict fields
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};