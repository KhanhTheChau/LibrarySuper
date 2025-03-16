const TheoDoiMuonSachService = require("../services/theodoimuonsach.service");

class TheoDoiMuonSachController {
  async createPhieuTheoDoi(req, res) {
    try {
      const data = req.body;

      const newPhieu = await TheoDoiMuonSachService.createPhieuTheoDoi(data);

      res.status(201).json({
        message: "Phieu created successfully",
        success: true,
        phieu: newPhieu,
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message,
        success: false,
      });
    }
  }

  async getPhieuTheoDoi(req, res) {
    try {
      const PhieuId = req.params.id;
      const phieu = await TheoDoiMuonSachService.getPhieuTheoDoi(PhieuId);

      res.status(200).send({
        message: "Get Phieu successfully",
        success: true,
        phieu,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Faild to get Phieu",
        message: error,
        success: false,
      });
    }
  }

  async updatePhieuTheoDoi(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
      const updatedPhieu = await TheoDoiMuonSachService.updatePhieuTheoDoi(id, data);
      res.status(200).json({
        message: "Update Phieu successfully",
        success: true,
        phieu: updatedPhieu,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
        success: false,
      });
    }
  }
  async deletePhieuTheoDoi(req, res) {
    const id = req.params.id;

    try {
      const deletedPhieu = await TheoDoiMuonSachService.deletePhieuTheoDoi(id);
      res.status(200).send({
        message: "Delete Phieu successfully",
        success: true,
        phieu: deletedPhieu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Faild to delete Phieu",
        success: false,
      });
    }
  }
}

module.exports = new TheoDoiMuonSachController();
