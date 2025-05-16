// controllers/admin.controller.js
import { User } from '../models/user.models.js';
import { Criminal } from '../models/criminal.models.js';
import { Police } from '../models/police.models.js';
import AuditLog from '../models/auditLog.models.js';

// Create new admin
export const createAdmin = async (req, res) => {
  // Add admin creation logic (validate, hash password, etc.)
  res.status(201).json({ message: 'Admin created successfully' });
};

// Delete user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Assign badge number to a police officer
export const assignBadgeNumber = async (req, res) => {
  const { policeId, badgeNumber } = req.body;
  try {
    const officer = await Police.findById(policeId);
    if (!officer) return res.status(404).json({ message: 'Police officer not found' });

    officer.badgeNumber = badgeNumber;
    await officer.save();

    res.status(200).json({
      message: `Badge number ${badgeNumber} assigned to police officer ${policeId}`,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error assigning badge number',
      error: error.message,
    });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, 'fullname email');
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

// Get audit logs
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audit logs' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullname email dob address isVerified');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update user role
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
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};

// Get all police officers
export const getPolice = async (req, res) => {
  try {
    const officers = await Police.find({}, 'fullname email badgeNumber rank');
    res.status(200).json({ officers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching police officers', error: error.message });
  }
};

// Get all criminals
export const getCriminals = async (req, res) => {
  try {
    const criminals = await Criminal.find({}, 'fullname dob crimeDetails');
    res.status(200).json({ criminals });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching criminals', error: error.message });
  }
};

// Delete criminal by ID
export const deleteCriminal = async (req, res) => {
  const { criminalId } = req.params;
  try {
    const deleted = await Criminal.findByIdAndDelete(criminalId);
    if (!deleted) return res.status(404).json({ message: 'Criminal not found' });
    res.status(200).json({ message: 'Criminal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting criminal', error: error.message });
  }
};
