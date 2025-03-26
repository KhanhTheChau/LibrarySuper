const mongoose = require("mongoose");
const nhaxuatban = require("./nhaxuatban");

const sachSchema = new mongoose.Schema({
  tensach: {
    type: String,
    required: true,
  },

  nhaxuatban: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nhaxuatban", // Tham chiếu đến bảng nhà xuất bản
    required: false,
  },
  theloai: {
    type: String,
    enum: ["Classic", "Trending", "SGK", "TRUYEN", "THIEUNHI", "KHAC"],
    required: true,
  },
  ngayxuatban: {
    type: Date,
    default: Date.now,
  },
  dongia: {
    type: Number,
    required: true,
  },
  hinhanh: {
    type: String,
    required: true,
  },
  soquyen: {
    type: Number,
    default: 0,
  },
  mota: {
    type: String,
    default: "",
  },
  danhgia: {
    trungbinh: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    soluong: {
      type: Number,
      default: 0,
    },
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
  ngonngu: {
    type: String,
  },
  label: { type: String, default: "" },
});



const sach = mongoose.model("sach", sachSchema);
module.exports = sach;
