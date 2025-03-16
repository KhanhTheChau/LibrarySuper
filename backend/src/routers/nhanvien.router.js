const express = require("express");

const NhanVienController = require("../controllers/nhanvien.controller");

const NhanVienRouter = express.Router();


NhanVienRouter.post("/", NhanVienController.createNhanVien);
NhanVienRouter.get("/:id", NhanVienController.getNhanVien);
NhanVienRouter.put("/:id", NhanVienController.updateNhanVien);
NhanVienRouter.delete("/:id", NhanVienController.deleteNhanVien);

NhanVienRouter.put("/change-password/:id", NhanVienController.changePassword);




module.exports = NhanVienRouter;
