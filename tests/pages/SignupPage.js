// Page Object Model - Signup Page
class SignupPage {
  constructor(request, app) {
    this.request = request;
    this.app = app;
    this.endpoint = '/auth/signup';
  }

  // Actions
  async submitSignup(username, email, password) {
    return await this.request(this.app)
      .post(this.endpoint)
      .send({ username, email, password })
      .set('Content-Type', 'application/json');
  }

  async submitEmptyForm() {
    return await this.submitSignup('', '', '');
  }

  async submitWithMissingField(data) {
    return await this.request(this.app)
      .post(this.endpoint)
      .send(data)
      .set('Content-Type', 'application/json');
  }

  // Validations
  isSuccess(response) {
    return response.status === 201 && response.body.success === true;
  }

  isValidationError(response) {
    return response.status === 400;
  }

  isUserExists(response) {
    return response.status === 400 && response.body.message === 'User already exists';
  }

  getMessage(response) {
    return response.body.message;
  }
}

module.exports = SignupPage;