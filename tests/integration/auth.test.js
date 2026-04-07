const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const LoginPage  = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');

const loginPage  = new LoginPage(request, app);
const signupPage = new SignupPage(request, app);

// ─── SIGNUP TESTS ────────────────────────────────────────────────
describe('📝 Signup Integration Tests', () => {

  it('should register user with valid data', async () => {
    const res = await signupPage.submitSignup('john123', 'john@example.com', 'pass123');
    expect(signupPage.isSuccess(res)).to.be.true;
    expect(signupPage.getMessage(res)).to.equal('User registered successfully');
  });

  it('should reject duplicate email registration', async () => {
    await signupPage.submitSignup('john123', 'duplicate@example.com', 'pass123');
    const res = await signupPage.submitSignup('john123', 'duplicate@example.com', 'pass123');
    expect(signupPage.isValidationError(res)).to.be.true;
    expect(signupPage.getMessage(res)).to.equal('User already exists');
  });

  it('should reject signup with empty form', async () => {
    const res = await signupPage.submitEmptyForm();
    expect(signupPage.isValidationError(res)).to.be.true;
  });

  it('should reject signup with invalid email', async () => {
    const res = await signupPage.submitSignup('validuser', 'not-an-email', 'pass123');
    expect(signupPage.isValidationError(res)).to.be.true;
  });

  it('should reject signup with short password', async () => {
    const res = await signupPage.submitSignup('validuser', 'user@example.com', '123');
    expect(signupPage.isValidationError(res)).to.be.true;
    expect(signupPage.getMessage(res)).to.include('6');
  });

  it('should reject signup with short username', async () => {
    const res = await signupPage.submitSignup('ab', 'user@example.com', 'pass123');
    expect(signupPage.isValidationError(res)).to.be.true;
    expect(signupPage.getMessage(res)).to.include('3');
  });

  it('should reject signup with missing username field', async () => {
    const res = await signupPage.submitWithMissingField({ email: 'user@example.com', password: 'pass123' });
    expect(signupPage.isValidationError(res)).to.be.true;
  });

  it('should accept username with exactly 3 characters (boundary)', async () => {
    const res = await signupPage.submitSignup('abc', 'boundary@example.com', 'pass123');
    expect(signupPage.isSuccess(res)).to.be.true;
  });

  it('should reject special characters causing invalid email', async () => {
    const res = await signupPage.submitSignup('user1', 'user@@domain..com', 'pass123');
    expect(signupPage.isValidationError(res)).to.be.true;
  });

  it('should handle rapid multiple signups (same data)', async () => {
    await signupPage.submitSignup('spammer', 'spam@example.com', 'pass123');
    const res = await signupPage.submitSignup('spammer', 'spam@example.com', 'pass123');
    expect(signupPage.isValidationError(res)).to.be.true;
  });
});

// ─── LOGIN TESTS ─────────────────────────────────────────────────
describe('🔐 Login Integration Tests', () => {

  before(async () => {
    await signupPage.submitSignup('loginuser', 'login@example.com', 'mypass123');
  });

  it('should login with valid credentials', async () => {
    const res = await loginPage.submitLogin('login@example.com', 'mypass123');
    expect(loginPage.isSuccess(res)).to.be.true;
    expect(loginPage.getMessage(res)).to.equal('Login successful');
  });

  it('should reject login with wrong password', async () => {
    const res = await loginPage.submitLogin('login@example.com', 'wrongpass');
    expect(loginPage.isInvalidPassword(res)).to.be.true;
    expect(loginPage.getMessage(res)).to.equal('Invalid password');
  });

  it('should reject login with non-existing user', async () => {
    const res = await loginPage.submitLogin('ghost@example.com', 'pass123');
    expect(loginPage.isUserNotFound(res)).to.be.true;
    expect(loginPage.getMessage(res)).to.equal('User not found');
  });

  it('should reject login with empty form', async () => {
    const res = await loginPage.submitEmptyForm();
    expect(loginPage.isValidationError(res)).to.be.true;
  });

  it('should reject login with invalid email format', async () => {
    const res = await loginPage.submitLogin('not-valid-email', 'pass123');
    expect(loginPage.isValidationError(res)).to.be.true;
  });

  it('should reject login with empty password', async () => {
    const res = await loginPage.submitLogin('login@example.com', '');
    expect(loginPage.isValidationError(res)).to.be.true;
  });

  it('should reject login with special chars in email', async () => {
    const res = await loginPage.submitLogin('user@@bad..com', 'pass123');
    expect(loginPage.isValidationError(res)).to.be.true;
  });

  it('should handle very long email input (boundary)', async () => {
    const longEmail = 'a'.repeat(100) + '@example.com';
    const res = await loginPage.submitLogin(longEmail, 'pass123');
    expect(loginPage.isValidationError(res)).to.be.true;
  });
});