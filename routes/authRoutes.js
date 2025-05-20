// routes/authRoutes.js - Authentication routes
const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @route GET /api/auth/google
 * @desc Authenticate with Google OAuth
 * @access Public
 */
router.get('/google',
  passport.authenticate('google', { 
    scope: [
      'profile', 
      'email', 
      'https://www.googleapis.com/auth/documents.readonly'
    ] 
  })
);

/**
 * @route GET /api/auth/google/callback
 * @desc Google OAuth callback
 * @access Public
 */
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 * @access Public
 */
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" });
    }
    res.json({ success: true });
  });
});

/**
 * @route GET /api/auth/status
 * @desc Get authentication status
 * @access Public
 */
router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user ? {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture
    } : null
  });
});

module.exports = router;
