const express = require("express");

const TheoDoiMuonSachController = require("../controllers/theodoimuonsach.controller");

const TheoDoiMuonSachRouter = express.Router();


TheoDoiMuonSachRouter.post("/", TheoDoiMuonSachController.createPhieuTheoDoi);
TheoDoiMuonSachRouter.get("/:id", TheoDoiMuonSachController.getPhieuTheoDoi);
TheoDoiMuonSachRouter.put("/:id", TheoDoiMuonSachController.updatePhieuTheoDoi);
TheoDoiMuonSachRouter.delete("/:id", TheoDoiMuonSachController.deletePhieuTheoDoi);




module.exports = TheoDoiMuonSachRouter;
