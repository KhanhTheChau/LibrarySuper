const models = require("../models/index");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class AuthService {
  // Mã hóa mật khẩu
  async encryptPassword(plainPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(plainPassword, salt);
  }

  // Kiểm tra mật khẩu
  decryptPassword(hash, passwordUser) {
    return bcrypt.compareSync(passwordUser, hash);
  }

  // Tạo user mới
  async signUp(data) {
    try {
      const { email, matkhau } = data;

      // Kiểm tra email đã tồn tại chưa
      const existingDOCGIA = await models.docgia.findOne({ email });

      if (existingDOCGIA) throw new ApiError(400, "Email đã được sử dụng");

      // Mã hóa mật khẩu
      const hashedPassword = await this.encryptPassword(matkhau);

      // Tạo user
      const newUser = new models.docgia({
        email,
        matkhau: hashedPassword,
      });
      console.log("newUser: ", newUser);
      // Lưu vào DB

      // Cập nhật tất cả bản ghi, thêm trường madocgia = _id
      await models.docgia.updateMany({}, [{ $set: { madocgia: "$_id" } }]);
      await newUser.save();

      return newUser;
    } catch (error) {
      console.log("error: ", error);
      throw new ApiError(500, "Lỗi khi tạo user", error);
    }
  }

  async signIn(data) {
    const { email, matkhau } = data;

    if (!email) throw new Error("Email is required");
    if (!matkhau) throw new Error("Password is required");

    // Kiểm tra trong bảng NHANVIEN (Admin hoặc Nhân viên)
    const adminLogin = await models.nhanvien.findOne({ email });
    const userLogin = await models.docgia.findOne({ email });
    if (adminLogin && userLogin) {
      const isMatch = await this.decryptPassword(adminLogin.matkhau, matkhau);
      if (!isMatch) throw new Error("Password is incorrect");
      return { role: adminLogin.chucvu, data: userLogin };
    }
    
    if (adminLogin) {
      const isMatch = await this.decryptPassword(adminLogin.matkhau, matkhau);
      if (!isMatch) throw new Error("Password is incorrect");
      return { role: adminLogin.chucvu, data: adminLogin };
    }

    // Kiểm tra trong bảng DOCGIA (User)
    // const userLogin = await models.docgia.findOne({ email });
    if (userLogin) {
      const isMatch = await this.decryptPassword(userLogin.matkhau, matkhau);
      if (!isMatch) throw new Error("Password is incorrect");
      return { role: "user", data: userLogin };
    }

    // Không tìm thấy tài khoản
    throw new Error("User not found");
  }
}

module.exports = new AuthService();
