const { expect } = require('chai');
const { validateEmail, validatePassword, validateUsername } = require('../../src/validators');

describe(' Email Validation', () => {
  it('should accept valid email', () => {
    expect(validateEmail('test@example.com').valid).to.be.true;
  });
  it('should reject email missing @', () => {
    expect(validateEmail('testexample.com').valid).to.be.false;
  });
  it('should reject email missing domain', () => {
    expect(validateEmail('test@').valid).to.be.false;
  });
  it('should reject empty email', () => {
    expect(validateEmail('').valid).to.be.false;
  });
  it('should reject email over 100 characters', () => {
    expect(validateEmail('a'.repeat(95) + '@x.com').valid).to.be.false;
  });
  it('should reject email with spaces', () => {
    expect(validateEmail('test @example.com').valid).to.be.false;
  });
  it('should reject email without dot in domain', () => {
    expect(validateEmail('test@examplecom').valid).to.be.false;
  });
});

describe(' Password Validation', () => {
  it('should accept valid password with letter + number', () => {
    expect(validatePassword('pass123').valid).to.be.true;
  });
  it('should reject short password (< 6 chars)', () => {
    expect(validatePassword('ab1').valid).to.be.false;
  });
  it('should reject empty password', () => {
    expect(validatePassword('').valid).to.be.false;
  });
  it('should reject password over 50 characters', () => {
    expect(validatePassword('a1' + 'b'.repeat(50)).valid).to.be.false;
  });
  it('should reject password with no letters', () => {
    expect(validatePassword('123456').valid).to.be.false;
  });
  it('should reject password with no numbers', () => {
    expect(validatePassword('abcdef').valid).to.be.false;
  });
  it('should reject password with spaces', () => {
    expect(validatePassword('pass 123').valid).to.be.false;
  });
  it('should accept password with special characters', () => {
    expect(validatePassword('p@ss1word').valid).to.be.true;
  });
  it('should accept exactly 6 character valid password', () => {
    expect(validatePassword('abc123').valid).to.be.true;
  });
});

describe(' Username Validation', () => {
  it('should accept valid username', () => {
    expect(validateUsername('john_doe').valid).to.be.true;
  });
  it('should reject short username (< 3 chars)', () => {
    expect(validateUsername('ab').valid).to.be.false;
  });
  it('should reject empty username', () => {
    expect(validateUsername('').valid).to.be.false;
  });
  it('should reject username over 20 characters', () => {
    expect(validateUsername('a'.repeat(21)).valid).to.be.false;
  });
  it('should reject username starting with number', () => {
    expect(validateUsername('1john').valid).to.be.false;
  });
  it('should reject username with special chars like @', () => {
    expect(validateUsername('john@doe').valid).to.be.false;
  });
  it('should reject username with spaces', () => {
    expect(validateUsername('john doe').valid).to.be.false;
  });
  it('should accept username with underscore', () => {
    expect(validateUsername('john_123').valid).to.be.true;
  });
  it('should accept exactly 3 character username', () => {
    expect(validateUsername('abc').valid).to.be.true;
  });
});