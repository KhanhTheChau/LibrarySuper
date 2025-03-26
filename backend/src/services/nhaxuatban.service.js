const models = require("../models/index");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class NhaXuaBanService {
  async createNhaXuatBan(data) {
    try {
      const { tennxb, diachi } = data;
      const newNXB = new models.nhaxuatban({
        tennxb,
        diachi,
      });

      // Lưu vào DB
      await newNXB.save();

      // Cập nhật tất cả bản ghi, thêm trường manxb = _id
      await models.nhaxuatban.updateMany({}, [{ $set: { manxb: "$_id" } }]);

      console.log("newNXB: ", newNXB);
      return newNXB;
    } catch (error) {
      throw new ApiError(500, "Lỗi khi tạo NXB", error);
    }
  }

  // Lay thong tin cua nxb
  async getNhaXuatBan(manxb) {
    const manxbObjId = new mongoose.Types.ObjectId(manxb);
    const nxb = await models.nhaxuatban.findOne({ manxb: manxbObjId });

    if (!nxb) throw new Error("Not found any nxb to given id");

    return nxb;
  }

  // Cap nhat thong tin nxb
  async updateNhaXuatBan(manxb, data) {
    // Kiểm tra id
    if (!manxb) throw new Error("id is empty");

    // Kiểm tra data
    if (!data) throw new Error("data is empty");

    const dataUpdate = {
      tennxb: data.tennxb,
      diachi: data.diachi,
    };

    const updatedNXB = await models.nhaxuatban.findByIdAndUpdate(
      manxb,
      dataUpdate,
      {
        new: true, // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
      }
    );

    if (!updatedNXB) throw new Error("update NXB failed");

    return updatedNXB;
  }

  //  Xoa nxb
  async deleteNhaXuatBan(manxb) {
    if (!manxb) throw new Error("The nxb's ID is require and cannot be empty");

    const nxbObjId = new mongoose.Types.ObjectId(manxb);
    const deletedNXB = await models.nhaxuatban.findByIdAndDelete(nxbObjId);

    if (!deletedNXB) throw new Error("Faild to delete NXB");

    return deletedNXB;
  }

  async getAllNhaXuatBan() {
    const listNXB = await models.nhaxuatban.find({});
    return listNXB;
  }
}

module.exports = new NhaXuaBanService();
