function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email is required' };
  }
  if (!email.includes('@')) {
    return { valid: false, message: 'Email must contain @ symbol' };
  }
  const parts = email.split('@');
  if (!parts[1] || parts[1] === '') {
    return { valid: false, message: 'Email must contain a domain' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  if (email.length > 100) {
    return { valid: false, message: 'Email must be under 100 characters' };
  }
  return { valid: true, message: 'Valid email' };
}

function validatePassword(password) {
  if (!password || password.trim() === '') {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  if (password.length > 50) {
    return { valid: false, message: 'Password must be under 50 characters' };
  }
  if (!/[A-Za-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  if (/\s/.test(password)) {
    return { valid: false, message: 'Password must not contain spaces' };
  }
  return { valid: true, message: 'Valid password' };
}

function validateUsername(username) {
  if (!username || username.trim() === '') {
    return { valid: false, message: 'Username is required' };
  }
  if (username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters' };
  }
  if (username.length > 20) {
    return { valid: false, message: 'Username must be under 20 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  if (/^\d/.test(username)) {
    return { valid: false, message: 'Username must start with a letter' };
  }
  return { valid: true, message: 'Valid username' };
}

module.exports = { validateEmail, validatePassword, validateUsername };