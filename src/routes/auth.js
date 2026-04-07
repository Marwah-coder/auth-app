const express = require('express');
const router = express.Router();
const { validateEmail, validatePassword, validateUsername } = require('../validators');

// In-memory users store
const users = [];

// Signup Route
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const usernameCheck = validateUsername(username);
  if (!usernameCheck.valid) {
    return res.status(400).json({ success: false, message: usernameCheck.message });
  }

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) {
    return res.status(400).json({ success: false, message: emailCheck.message });
  }

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) {
    return res.status(400).json({ success: false, message: passwordCheck.message });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  users.push({ username, email, password });
  return res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) {
    return res.status(400).json({ success: false, message: emailCheck.message });
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  return res.status(200).json({ success: true, message: 'Login successful' });
});

// Get users (for testing)
router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = { router, users };