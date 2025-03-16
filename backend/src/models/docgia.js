const mongoose = require("mongoose");
const { Schema } = mongoose;

const doccgiaSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    holot: {
      type: String,
    },
    ten: {
      type: String,
    },
    ngaysinh: {
      type: Date,
    },
    phai: {
      type: String,
      enum: ["NAM", "NU", "KHAC"],
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
    ngaytao: {
      type: Date,
      default: Date.now,
    },
    ngaycapnhat: {
      type: Date,
      default: Date.now,
    },
    anhdaidien: {
      type: String,
      default: "",
    },
  }
);



const docgia = mongoose.model("DOCGIA", doccgiaSchema);
module.exports = docgia;
