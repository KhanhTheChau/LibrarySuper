const express = require("express");

const TheoDoiMuonSachController = require("../controllers/theodoimuonsach.controller");

const TheoDoiMuonSachRouter = express.Router();

TheoDoiMuonSachRouter.post("/", TheoDoiMuonSachController.createPhieuTheoDoi);
TheoDoiMuonSachRouter.get("/:id", TheoDoiMuonSachController.getPhieuTheoDoi);
TheoDoiMuonSachRouter.put("/:id", TheoDoiMuonSachController.updatePhieuTheoDoi);
TheoDoiMuonSachRouter.delete(
  "/:id",
  TheoDoiMuonSachController.deletePhieuTheoDoi
);

TheoDoiMuonSachRouter.put(
  "/confirm/:id",

  TheoDoiMuonSachController.confirmRecord
);
TheoDoiMuonSachRouter.put(
  "/approved/:id",

  TheoDoiMuonSachController.approveRecord
);
TheoDoiMuonSachRouter.put(
  "/returned/:id",

  TheoDoiMuonSachController.confirmReturn
);


TheoDoiMuonSachRouter.get(
  "/user/:id",

  TheoDoiMuonSachController.getRecordByUserId
);

TheoDoiMuonSachRouter.get("/", TheoDoiMuonSachController.getAllPhieuTheoDoi);

module.exports = TheoDoiMuonSachRouter;
