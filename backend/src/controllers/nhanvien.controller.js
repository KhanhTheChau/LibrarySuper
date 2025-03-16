const NhanVienService = require("../services/nhanvien.service");

class NhanVienController {
  // Tao user
  async createNhanVien(req, res) {
    try {
      const data = req.body;

      const newUser = await NhanVienService.createNhanVien(data);

      res.status(201).json({
        message: "Admin created successfully",
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
  async getNhanVien(req, res) {
    try {
      const userId = req.params.id;
      const user = await NhanVienService.getNhanVien(userId);

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
  async updateNhanVien(req, res) {
    const manhanvien = req.params.id;
    const data = req.body;

    try {
      const updatedNhanVien = await NhanVienService.updateNhanVien(
        manhanvien,
        data
      );
      res.status(200).json({
        message: "Update user successfully",
        success: true,
        data: updatedNhanVien,
      });
    } catch (error) {
      res.status(500).json({
        message: "Update user failed",
        success: false,
      });
    }
  }

  //   // Xoa user
  async deleteNhanVien(req, res) {
    const manhanvien = req.params.id;

    try {
      const deletedNhanVien = await NhanVienService.deleteNhanVien(manhanvien);
      res.status(200).send({
        message: "Delete user successfully",
        success: true,
        user: deletedNhanVien,
      });
    } catch (error) {
      res.status(500).json({
        message: "Faild to delete user",
        success: false,
      });
    }
  }

  async changePassword(req, res) {
    const manhanvien = req.params.id;
    const data = req.body;

    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;

    try {
      const user = await NhanVienService.updatePassword(
        manhanvien,
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
        message: "Internal server error",
        success: false,
      });
    }
  }

  
}

module.exports = new NhanVienController();
