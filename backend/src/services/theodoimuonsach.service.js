const models = require("../models/index");
const ApiError = require("../api-error");
const mongoose = require("mongoose");

class TheoDoiMuonSachService {
  async createPhieuTheoDoi(data) {
    try {
      const phieutheodoi = new models.theodoimuonsach({
        sach: data.sach,
        docgia: data.docgia,
        nguoipheduyet: data.nguoipheduyet,
        ngaymuon: data.ngaymuon,
        ngaytra: data.ngaytra,
        ngaypheduyet: data.ngaypheduyet,
        trangthai: data.trangthai,
        soluong: data.soluong,
      });

      await phieutheodoi.save();

      console.log("phieutheodoi: ", phieutheodoi);
      return phieutheodoi;
    } catch (error) {
      throw new ApiError(500, "Lỗi khi tạo Phieu", error);
    }
  }
  async getPhieuTheoDoi(id) {
    const PhieuObjId = new mongoose.Types.ObjectId(id);
    const Phieu = await models.theodoimuonsach.findOne({ _id: PhieuObjId });

    if (!Phieu) throw new Error("Not found any Phieu to given id");

    return Phieu;
  }

  async updatePhieuTheoDoi(id, data) {
    // Kiểm tra id
    if (!id) throw new Error("id is empty");

    // Kiểm tra data
    if (!data) throw new Error("data is empty");

    const dataUpdate = {
        sach: data.sach,
        docgia: data.docgia,
        nguoipheduyet: data.nguoipheduyet,
        ngaymuon: data.ngaymuon,
        ngaytra: data.ngaytra,
        ngaypheduyet: data.ngaypheduyet,
        trangthai: data.trangthai,
        soluong: data.soluong,
    };

    const updatedPhieu = await models.theodoimuonsach.findByIdAndUpdate(
      id,
      dataUpdate,
      {
        new: true, // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
      }
    );

    if (!updatedPhieu) throw new Error("update Phieu failed");

    return updatedPhieu;
  }
  async deletePhieuTheoDoi(id) {
    if (!id)
      throw new Error("The Phieu's ID is require and cannot be empty");

    const PhieuObjId = new mongoose.Types.ObjectId(id);
    const deletedPhieu = await models.theodoimuonsach.findByIdAndDelete(
      PhieuObjId
    );

    if (!deletedPhieu) throw new Error("Faild to delete Phieu");

    return deletedPhieu;
  }
}

module.exports = new TheoDoiMuonSachService();
