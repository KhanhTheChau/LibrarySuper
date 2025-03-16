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
  ngaycapnhat: {
    type: Date,
    default: Date.now,
  },
});

const nhaxuatban = mongoose.model("nhaxuatban", nhaxuatbanSchema);
module.exports = nhaxuatban;
