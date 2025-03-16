const NhaXuatBanService = require("../services/nhaxuatban.service");

class NhaXuatBanController {
  async createNhaXuatBan(req, res) {
    try {
      const data = req.body;

      const newNXB = await NhaXuatBanService.createNhaXuatBan(data);

      res.status(201).json({
        message: "NXB created successfully",
        success: true,
        NXB: newNXB,
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message,
        success: false,
      });
    }
  }

  // Lay thong tin cua NXB
  async getNhaXuatBan(req, res) {
    try {
      const NXBId = req.params.id;
      const NXB = await NhaXuatBanService.getNhaXuatBan(NXBId);

      res.status(200).send({
        message: "Get NXB successfully",
        success: true,
        NXB,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Faild to get user",
        success: false,
      });
    }
  }

  async updateNhaXuatBan(req, res) {
    const manxb = req.params.id;
    const data = req.body;

    try {
      const updatedNXB = await NhaXuatBanService.updateNhaXuatBan(manxb, data);
      res.status(200).json({
        message: "Update user successfully",
        success: true,
        data: updatedNXB,
      });
    } catch (error) {
      res.status(500).json({
        message: "Update user failed",
        success: false,
      });
    }
  }
  async deleteNhaXuatBan(req, res) {
    const manxb = req.params.id;

    try {
      const deletedNXB = await NhaXuatBanService.deleteNhaXuatBan(manxb);
      res.status(200).send({
        message: "Delete NXB successfully",
        success: true,
        NXB: deletedNXB,
      });
    } catch (error) {
      res.status(500).json({
        message: "Faild to delete user",
        success: false,
      });
    }
  }
}

module.exports = new NhaXuatBanController();
