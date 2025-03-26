const mongoose = require("mongoose");
const { Schema } = mongoose;
const docgia = require("./docgia");
const nhanvienSchema = new Schema({
  docgia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "docgia", // 
    required: true,
  },
  chucvu: {
    type: String,
    enum: ["nhanvien", "quanli", "admin", "khac"],
    default: "nhanvien",
  },
  luong: {
    type: Number,
    default: 0,
  },
  ngaytuyen: {
    type: Date,
    default: Date.now,
  },
  ngaytao: {
    type: Date,
    default: Date.now,
  },
  ngaycapnhat: {
    type: Date,
    default: Date.now,
  },
});



const nhanvien = mongoose.model("nhanvien", nhanvienSchema);
module.exports = nhanvien;
