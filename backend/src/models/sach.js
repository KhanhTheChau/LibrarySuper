const mongoose = require("mongoose");
const nhaxuatban = require("./nhaxuatban");

const sachSchema = new mongoose.Schema({
  tensach: {
    type: String,
    required: true,
  },
  nhaxuatban: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nhaxuatban", // Tham chiếu tới bảng nhaxuatban
    required: true,
  },
  dongia: {
    type: Number,
    required: true,
  },
  soquyen: {
    type: Number,
    default: 0,
  },
  ngayxuatban: {
    type: Date,
    required: false,
    default: Date.now,
  },
  image: {
    type: String,
    require: true,
  },
  mota: {
    type: String,
    default: "",
  },
  ngaytao: {
    type: Date,
    default: Date.now,
  },
  ngaycapnhat: {
    type: Date,
    default: Date.now,
  },
  nguongoc: {
    type: String,
  },

});

const sach = mongoose.model("sach", sachSchema);
module.exports = sach;
