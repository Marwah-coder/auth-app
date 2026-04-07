// Page Object Model - Login Page
class LoginPage {
  constructor(request, app) {
    this.request = request;
    this.app = app;
    this.endpoint = '/auth/login';
  }

  // Actions
  async submitLogin(email, password) {
    return await this.request(this.app)
      .post(this.endpoint)
      .send({ email, password })
      .set('Content-Type', 'application/json');
  }

  async submitEmptyForm() {
    return await this.submitLogin('', '');
  }

  // Validations
  isSuccess(response) {
    return response.status === 200 && response.body.success === true;
  }

  isInvalidPassword(response) {
    return response.status === 401;
  }

  isUserNotFound(response) {
    return response.status === 404;
  }

  isValidationError(response) {
    return response.status === 400;
  }

  getMessage(response) {
    return response.body.message;
  }
}

module.exports = LoginPage;