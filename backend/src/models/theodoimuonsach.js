const mongoose = require("mongoose");
const sach = require("./sach");
const docgia = require("./docgia");
const nhanvien = require("./nhanvien");
const tacgia = require("./tacgia");

const theodoimuonsachSchema = new mongoose.Schema({
  sach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sach",
    require: true,
  },
  tacgia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tacgia",
    require: true,
  },
  docgia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "docgia",
    require: true,
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
    enum: ["Chờ duyệt", "Đã duyệt", "Đã trả"],
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
