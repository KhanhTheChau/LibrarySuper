const AuthService = require("../services/auth.service");
const ApiError = require("../api-error");

class AuthController {
  // Dang ky tai khoan
  async signUp(req, res) {
    try {
      const data = req.body;

      const newUser = await AuthService.signUp(data);

      res.status(201).json({
        message: "User sign-up successfully",
        success: true,
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message,
        success: false,
      });
    }
  }

  // Dang nhap
  async signIn(req, res) {
    try {
      const data = req.body;
      const result = await AuthService.signIn(data);

      res.status(200).json({
        message: "Login successful!",
        success: true,
        user: result,
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message,
        success: false,
      });
    }
  }
}

module.exports = new AuthController();
