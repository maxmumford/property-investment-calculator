module.exports = function isAuthenticated(req, res, next) {
  if (req.user)
      return next();
  res.status(403).json({"error": "Access denied", "message": "Must be logged in"});
}
