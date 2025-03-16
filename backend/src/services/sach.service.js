const models = require("../models/index");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class SachService {
  async createSach(data) {
    try {
      
      const newSach = new models.sach({
        tensach: data.tensach,
        nhaxuatban: data.nhaxuatban,
        dongia: data.dongia,
        soquyen: data.soquyen,
        ngayxuatban: data.ngayxuatban,
        image: data.image,
        mota: data.mota,
        ngaytao: data.ngaytao,
        ngaycapnhat: data.ngaycapnhat,
        nguongoc: data.nguongoc,
      });

      await newSach.save();
      // Cập nhật tất cả bản ghi, thêm trường madocgia = _id
      await models.sach.updateMany({}, [{ $set: { masach: "$_id" } }]);

      console.log("newSach: ", newSach);
      return newSach;
    } catch (error) {
      throw new ApiError(500, "Lỗi khi tạo Sach", error);
    }
  }
  async getSach(masach) {
    const SachObjId = new mongoose.Types.ObjectId(masach);
    const sach = await models.sach.findOne({ masach: SachObjId });

    if (!sach) throw new Error("Not found any sach to given id");

    return sach;
  }

  async updateSach(masach, data) {
    // Kiểm tra id
    if (!masach) throw new Error("id is empty");

    // Kiểm tra data
    if (!data) throw new Error("data is empty");

    const dataUpdate = {
      tensach: data.tensach,
      nhaxuatban: data.nhaxuatban,
      dongia: data.dongia,
      soquyen: data.soquyen,
      ngayxuatban: data.ngayxuatban,
      image: data.image,
      mota: data.mota,
      ngaytao: data.ngaytao,
      ngaycapnhat: data.ngaycapnhat,
      nguongoc: data.nguongoc,
    };

    // console.log("dataUpdate: ", dataUpdate);
    const updatedSach = await models.sach.findByIdAndUpdate(
      masach,
      dataUpdate,
      {
        new: true, // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
      }
    );

    
    if (!updatedSach) throw new Error("update sach failed");

    return updatedSach;
  }
  async deleteSach(masach) {
    if (!masach)
      throw new Error("The sach's ID is require and cannot be empty");

    const sachObjId = new mongoose.Types.ObjectId(masach);
    const deletedSach = await models.docgia.findByIdAndDelete(sachObjId);

    if (!deletedSach) throw new Error("Faild to delete sach");

    return deletedSach;
  }
}

module.exports = new SachService();
