const mongoose = require("mongoose");
const { Schema } = mongoose;

const nhanvienSchema = new Schema({
  hotennv: {
    type: String,
  },
  diachi: {
    type: String,
  },
  sodienthoai: {
    type: String,
    match: [
      /^0\d{9}$/,
      "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 số",
    ],
  },
  email: {
    type: String,
    required: true,
    match: [/^[^@]+@[^@]+$/, "Email không hợp lệ"], // Chỉ kiểm tra có '@'
  },
  matkhau: {
    type: String,
    required: true,
  },
  chucvu: {
    type: String,
    enum: ["nhanvien", "quanli", "khac"],
    default: "nhanvien",
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
