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

  async getAllPhieuTheoDoi(req, res) {
    try {
      const phieus = await TheoDoiMuonSachService.getAllPhieuTheoDoi();
      res.status(200).send(phieus);
    } catch (error) {
      console.log(error);
      res.status(500
      ).send(error);
    }
  }

  async updatePhieuTheoDoi(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
      const updatedPhieu = await TheoDoiMuonSachService.updatePhieuTheoDoi(
        id,
        data
      );
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

  async confirmRecord(req, res) {
    try {
      const idTrackBook = req.params.id;
      const { quantity } = req.body;
      console.log("quantity", quantity);
      const confirmRecord = await TheoDoiMuonSachService.confirmBook(
        idTrackBook,
        quantity
      );
      console.log(confirmRecord);
      res.status(200).send(confirmRecord);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async approveRecord(req, res) {
    try {
      const idTrackBook = req.params.id;
      const nguoipheduyet = req.body.nguoipheduyet;
      const approvedTrackBook = await TheoDoiMuonSachService.approveBook(
        idTrackBook,
        nguoipheduyet
      );
      res.status(200).send(approvedTrackBook);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async confirmReturn(req, res) {
    try {
      const recordID = req.params.id;
      console.log(recordID);
      const deletedRecord = await TheoDoiMuonSachService.returnBook(recordID);
      res.status(200).send(deletedRecord);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getRecordByUserId(req, res) {
    try {
      const userId = req.params.id;
      const trackings = await TheoDoiMuonSachService.getTrackOfUser(userId);
      res.status(200).send(trackings);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }
}

module.exports = new TheoDoiMuonSachController();
