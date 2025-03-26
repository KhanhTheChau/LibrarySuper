const DocgiaService = require("../services/docgia.service");

class DocgiaController {
  // Tao user
  async createDocgia(req, res) {
    try {
      const data = req.body;

      const newUser = await DocgiaService.createDocgia(data);

      res.status(201).json({
        message: "User created successfully",
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

  // Lay thong tin cua User
  async getDocgia(req, res) {
    try {
      const userId = req.params.id;
      // console.log(userId);
      const user = await DocgiaService.getDocgia(userId);

      res.status(200).send({
        message: "Get user successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Faild to get user",
        success: false,
      });
    }
  }

  //   // Cap nhat thong tin user
  async updateDocgia(req, res) {
    const madocgia = req.params.id;
    const data = req.body;

    try {
      const updatedDocgia = await DocgiaService.updateDocgia(madocgia, data);
      res.status(200).json({
        message: "Update user successfully",
        success: true,
        data: updatedDocgia,
      });
    } catch (error) {
      res.status(500).json({
        message: "Update user failed",
        success: false,
      });
    }
  }

  //   // Xoa user
  async deleteDocgia(req, res) {
    const madocgia = req.params.id;

    try {
      const deletedDocgia = await DocgiaService.deleteDocgia(madocgia);
      res.status(200).send({
        message: "Delete user successfully",
        success: true,
        user: deletedDocgia,
      });
    } catch (error) {
      res.status(500).json({
        message: "Faild to delete user",
        success: false,
      });
    }
  }

  async changePassword(req, res) {
    const madocgia = req.params.id;
    const data = req.body;

    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;

    try {
      const user = await DocgiaService.updatePassword(
        madocgia,
        currentPassword,
        newPassword
      );

      res.status(200).json({
        message: "Change Password successfully",
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }

  async getAllDocgia(req, res) {
    try {
      const users = await DocgiaService.getAllDocgia();
      res.status(200).json({
        message: "Get all user successfully",
        success: true,
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Faild to get all user",
        success: false,
      });
  }
  }
}

module.exports = new DocgiaController();
