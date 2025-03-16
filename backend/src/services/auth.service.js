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

    // if (email)
    //       throw new ApiError(400, "Email is required");

    // if (matkhau)
    //       throw new ApiError(400, "Password is required");

    const userLogin = await models.docgia.findOne({ email: email });

    if (!userLogin) {
      throw new ApiError(404, "User not found");
    }
    // Kiểm tra mật khẩu hiện tại
    const isMatch = await this.decryptPassword(userLogin.matkhau, matkhau);

    if (!isMatch) throw Error("Password is incorrect");

    return userLogin;
  }
}

module.exports = new AuthService();
