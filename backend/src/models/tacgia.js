const mongoose = require("mongoose");

const tacgiaSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
  },
  gioithieu: {
    type: String,
    default: "",
  },
  ngaysinh: {
    type: Date,
  },
  link: {
    type: String,
  },
  ngaytao: {
    type: Date,
    default: Date.now,
  },
  ngaycapnhat: {
    type: Date,
    default: Date.now,
  },
  hinhanh: {
    type: String,
    default: "",
  },
});

authorSchema.pre("save", function (next) {
  this.updateAt = Date.now();
  next();
});

const tacgia = mongoose.model("tacgia", tacgiaSchema);
module.exports = tacgia;
