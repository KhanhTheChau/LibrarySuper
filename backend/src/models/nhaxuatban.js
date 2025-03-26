const mongoose = require("mongoose");

const nhaxuatbanSchema = new mongoose.Schema({
  tennxb: {
    type: String,
  },
  diachi: {
    type: String,
    default: "",
  },
  ngaytao: {
    type: Date,
    default: Date.now,
  },
  namthanhlap: {
    type: Number, // Năm thành lập nhà xuất bản
  },
  lienhe: {
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "email không hợp lệ"],
    },
    sodienthoai: String,
    website: String,
  },
  ngaycapnhat: {
    type: Date,
    default: Date.now,
  },
    hinhanh: {
    type: String,
  },
});

const nhaxuatban = mongoose.model("nhaxuatban", nhaxuatbanSchema);
module.exports = nhaxuatban;
