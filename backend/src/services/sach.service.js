const models = require("../models/index");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class SachService {
  async createSach(data) {
    try {
      const newSach = new models.sach({
        tensach: data.tensach,
        nhaxuatban: data.nhaxuatban,
        theloai: data.theloai, // Bổ sung thể loại
        dongia: data.dongia,
        soquyen: data.soquyen,
        ngayxuatban: data.ngayxuatban,
        hinhanh: data.hinhanh,
        mota: data.mota,
        nguongoc: data.nguongoc,
        ngonngu: data.ngonngu, // Bổ sung ngôn ngữ
        danhgia: {
          trungbinh: data.danhgia?.trungbinh || 0,
          soluong: data.danhgia?.soluong || 0,
        },
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

  async findSach(idBook) {
    if (!idBook)
      throw new Error("The book's id is require and cannot be empty");
    const bookObjId = new mongoose.Types.ObjectId(idBook);
    const books = await models.sach.findOne({ _id: bookObjId })
      .populate("nhaxuatban") 

    // const author = await model.Author.find();
    if (!books) throw new Error("Not found");
    return books;
  }

  async findAllSach() {
    const sach = await models.sach.find().populate("nhaxuatban"); 

    if (!sach) throw new Error("Not found");
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
      theloai: data.theloai, // Bổ sung thể loại
      dongia: data.dongia,
      soquyen: data.soquyen,
      ngayxuatban: data.ngayxuatban,
      hinhanh: data.hinhanh,
      mota: data.mota,
      nguongoc: data.nguongoc,
      ngonngu: data.ngonngu, // Bổ sung ngôn ngữ
      danhgia: {
        trungbinh: data.danhgia?.trungbinh || 0,
        soluong: data.danhgia?.soluong || 0,
      },
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
