const mongoose = require("mongoose");
const sach = require("./sach");
const docgia = require("./docgia");
const nhanvien = require("./nhanvien");

const theodoimuonsachSchema = new mongoose.Schema({
  sach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sach",
    require: true,
  },
  docgia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "docgia",
    require: true,
  },
  nguoipheduyet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nhanvien",
  },
  ngaymuon: {
    type: Date,
    require: true,
  },
  ngaytra: {
    type: Date,
  },
  ngaypheduyet: {
    type: Date,
  },
  trangthai: {
    type: String,
    enum: ["Chờ duyệt", "Đã duyệt", "Đang mượn", "Đã trả"],
    default: "Chờ duyệt",
  },
  soluong: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const theodoimuonsach = mongoose.model(
  "theodoimuonsach",
  theodoimuonsachSchema
);
module.exports = theodoimuonsach;
