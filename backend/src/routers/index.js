const express = require("express");


const DocgiaRouter = require("./docgia.router");
const authRouter = require("./auth.router");
const NhaXuatBanRouter = require("./nhaxuatban.router");
const NhanVienRouter = require("./nhanvien.router");
const SachRouter = require("./sach.router");
const TheoDoiMuonSachRouter = require("./theodoimuonsach.router");

const router = express.Router();


router.use("/docgia", DocgiaRouter);
router.use("/auth", authRouter);
router.use("/nhaxuatban", NhaXuatBanRouter);
router.use("/nhanvien", NhanVienRouter);
router.use("/sach", SachRouter);
router.use("/phieutheodoi", TheoDoiMuonSachRouter);


module.exports = router;
