const express = require("express");

const DocgiaController = require("../controllers/docgia.controller");

const DocgiaRouter = express.Router();


DocgiaRouter.post("/", DocgiaController.createDocgia);
DocgiaRouter.get("/:id", DocgiaController.getDocgia);
DocgiaRouter.put("/:id", DocgiaController.updateDocgia);
DocgiaRouter.delete("/:id", DocgiaController.deleteDocgia);

DocgiaRouter.put("/change-password/:id", DocgiaController.changePassword);




module.exports = DocgiaRouter;
