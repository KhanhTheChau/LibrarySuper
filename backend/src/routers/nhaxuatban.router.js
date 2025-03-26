const express = require("express");

const NhaXuatBanController = require("../controllers/nhaxuatban.controller");

const NhaXuatBanRouter = express.Router();


NhaXuatBanRouter.post("/", NhaXuatBanController.createNhaXuatBan);
NhaXuatBanRouter.get("/:id", NhaXuatBanController.getNhaXuatBan);
NhaXuatBanRouter.put("/:id", NhaXuatBanController.updateNhaXuatBan);
NhaXuatBanRouter.delete("/:id", NhaXuatBanController.deleteNhaXuatBan);

NhaXuatBanRouter.get("/", NhaXuatBanController.getAllNhaXuatBan);


module.exports = NhaXuatBanRouter;
