const models = require("../models/index");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class DocgiaService {
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
  async createDocgia(data) {
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

      // Lưu vào DB
      await newUser.save();
      // Cập nhật tất cả bản ghi, thêm trường madocgia = _id
      await models.docgia.updateMany({}, [{ $set: { madocgia: "$_id" } }]);

      console.log("newUser: ", newUser);
      return newUser;
    } catch (error) {
      throw new ApiError(500, "Lỗi khi tạo user", error);
    }
  }

  // Lay thong tin cua User
  async getDocgia(madocgia) {
    // if (!userId || typeof userId !== "string" || userId.length !== 24)
    //   throw new Error(
    //     "Invalid userId format: The user's ID is required and must be a 24-character hex string"
    //   );

    // Chuyển userId từ string sang ObjectId
    const userObjId = new mongoose.Types.ObjectId(madocgia);
    const user = await models.docgia.findOne({ madocgia: userObjId });

    if (!user) throw new Error("Not found any user to given id");

    return user;
  }

  // Cap nhat thong tin user
  async updateDocgia(madocgia, data) {
    // Kiểm tra id
    if (!madocgia) throw new Error("id is empty");

    // Kiểm tra data
    if (!data) throw new Error("data is empty");

    // Kiểm tra id có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(madocgia))
      throw new Error("Invalid user ID");

    const dataUpdate = {
      holot: data.holot,
      ten: data.ten,
      ngaysinh: data.ngaysinh,
      phai: data.phai,
      diachi: data.diachi,
      sodienthoai: data.sodienthoai,
      // ngaycapnhat: Date.now,
    };

    // console.log("dataUpdate: ", dataUpdate);
    const updatedDocgia = await models.docgia.findByIdAndUpdate(
      madocgia,
      dataUpdate,
      {
        new: true, // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
      }
    );
    
    // console.log("dataUpdate: ", updatedDocgia);
    if (!updatedDocgia) throw new Error("update user failed");

    return updatedDocgia;
  }

  //   // Xoa user
  async deleteDocgia(madocgia) {
    if (!madocgia)
      throw new Error("The user's ID is require and cannot be empty");

    const userObjId = new mongoose.Types.ObjectId(madocgia);
    const deletedDocgia = await models.docgia.findByIdAndDelete(userObjId);

    if (!deletedDocgia) throw new Error("Faild to delete user");

    return deletedDocgia;
  }

  // Thay đổi mật khẩu
  async updatePassword(madocgia, currentPassword, newPassword) {
    const user = await models.docgia.findById(madocgia);

    if (!user) throw Error("User not found");

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await this.decryptPassword(user.matkhau, currentPassword);

    if (!isMatch) throw Error("Current password is incorrect");

    const hashedPwrd = await this.encryptPassword(newPassword);
    user.matkhau = hashedPwrd;

    await user.save();
    return user;
  }

 
}

module.exports = new DocgiaService();
