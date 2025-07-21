// auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.models.cjs');

// Register routes
router.get('/auth/register', (req, res) => {
  res.render('auth/register', { error: null });
});


router.post('/auth/register', async (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with this email');
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create and save new user
    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered successfully:", username);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Registration error:', error);
    res.render('auth/register', { 
      error: error.message,
      values: req.body 
    });
  }
});

// Login routes
router.get('/auth/login', (req, res) => {
  res.render('auth/login', { error: null });
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isApproved) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Set session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.render('auth/login', { error: 'Login failed', email: req.body.email });
  }
});

router.get('/auth/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ user: null });
  }
  res.json({ user: req.session.user });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          console.error('Error logging out:', err);
          return res.redirect('/'); // Redirect to home page if there's an error
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('/auth/login'); // Redirect to login page
  });
});


module.exports = router;