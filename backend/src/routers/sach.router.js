const express = require("express");

const SachController = require("../controllers/sach.controller");

const SachRouter = express.Router();


SachRouter.post("/", SachController.createSach);
SachRouter.get("/:id", SachController.getSach);
SachRouter.put("/:id", SachController.updateSach);
SachRouter.delete("/:id", SachController.deleteSach);


SachRouter.get("/", SachController.getAllSach);

module.exports = SachRouter;
