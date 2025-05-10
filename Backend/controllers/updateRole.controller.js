import { User } from '../models/user.models.js';

export const updateRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const validRoles = ['user', 'police', 'admin'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = newRole;
    await user.save();

    res.status(200).json({ message: `User role updated to ${newRole}`, user });
    console.log(`Admin ${req.user.id} changed role of ${user.email} to ${newRole}`);

  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};