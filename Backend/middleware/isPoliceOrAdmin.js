// Middleware to check if the user is a police officer or an admin
export const isPoliceOrAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'police' && role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only police or admin can perform this action.' });
  }
  next();
};