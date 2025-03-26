const models = require("../models/index");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class NhanVienService {
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
  async createNhanVien(data) {
    try {
      const { email, matkhau } = data;

      // Kiểm tra email đã tồn tại chưa
      const existingNhanVien = await models.nhanvien.findOne({ email });

      if (existingNhanVien) throw new ApiError(400, "Email đã được sử dụng");

      // Mã hóa mật khẩu
      const hashedPassword = await this.encryptPassword(matkhau);

      // Tạo user
      const newUser = new models.nhanvien({
        email,
        matkhau: hashedPassword,
      });

      const newDocgia = new models.docgia({
        email,
        matkhau: hashedPassword,
      });

      // Lưu vào DB
      await newUser.save();
      await newDocgia.save();
      // Cập nhật tất cả bản ghi, thêm trường madocgia = _id
      await models.nhanvien.updateMany({}, [{ $set: { manhanvien: "$_id" } }]);

      console.log("newUser: ", newUser);
      return newUser;
    } catch (error) {
      throw new ApiError(500, "Lỗi khi tạo user", error);
    }
  }

  // Lay thong tin cua User
  async getNhanVien(manhanvien) {
    const nvObjId = new mongoose.Types.ObjectId(manhanvien);
    const user = await models.nhanvien.findOne({ manhanvien: nvObjId });

    if (!user) throw new Error("Not found any user to given id");

    return user;
  }

  // Cap nhat thong tin user
  async updateNhanVien(manhanvien, data) {
    // Kiểm tra id
    if (!manhanvien) throw new Error("id is empty");

    // Kiểm tra data
    if (!data) throw new Error("data is empty");

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
    const updatedNhanVien = await models.nhanvien.findByIdAndUpdate(
      manhanvien,
      dataUpdate,
      {
        new: true, // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
      }
    );

    // await models.docgia.findByIdAndUpdate(
    //   manhanvien,
    //   dataUpdate,
    //   {
    //     new: true, // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
    //   }
    // );
    if (!updatedNhanVien) throw new Error("update user failed");

    return updatedNhanVien;
  }

  //   // Xoa user
  async deleteNhanVien(manhanvien) {
    if (!manhanvien)
      throw new Error("The user's ID is require and cannot be empty");

    const nvObjId = new mongoose.Types.ObjectId(manhanvien);
    const deletedNhanVien = await models.nhanvien.findByIdAndDelete(nvObjId);

    if (!deletedNhanVien) throw new Error("Faild to delete user");

    return deletedNhanVien;
  }

  // Thay đổi mật khẩu
  async updatePassword(manhanvien, currentPassword, newPassword) {
    const user = await models.nhanvien.findById(manhanvien);

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

module.exports = new NhanVienService();
