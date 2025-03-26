const SachService = require("../services/sach.service");

class SachController {
  async createSach(req, res) {
    try {
      const data = req.body;

      const newSach = await SachService.createSach(data);

      res.status(201).json({
        message: "Sach created successfully",
        success: true,
        sach: newSach,
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message,
        success: false,
      });
    }
  }

  async getSach(req, res) {
    try {
      const sachId = req.params.id;
      const sach = await SachService.findSach(sachId);

      res.status(200).send({
        message: "Get sach successfully",
        success: true,
        sach,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Faild to get sach",
        success: false,
      });
    }
  }

  async getAllSach(req, res) {
    try {
      // const sachId = req.params.id;
      const sach = await SachService.findAllSach();

      res.status(200).send({
        message: "Get sach successfully",
        success: true,
        sach,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Faild to get sach",
        success: false,
      });
    }
  }

  async updateSach(req, res) {
    const masach = req.params.id;
    const data = req.body;

    try {
      const updatedSach = await SachService.updateSach(masach, data);
      res.status(200).json({
        message: "Update sach successfully",
        success: true,
        data: updatedSach,
      });
    } catch (error) {
      res.status(500).json({
        message: "Update sach failed",
        success: false,
      });
    }
  }
  async deleteSach(req, res) {
    const masach = req.params.id;

    try {
      const deletedSach = await SachService.deleteSach(masach);
      res.status(200).send({
        message: "Delete sach successfully",
        success: true,
        sach: deletedSach,
      });
    } catch (error) {
      res.status(500).json({
        message: "Faild to delete sach",
        success: false,
      });
    }
  }
}

module.exports = new SachController();
