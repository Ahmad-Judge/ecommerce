const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin access only" });
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
