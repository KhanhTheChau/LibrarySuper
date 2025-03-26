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
        soquyen: data.soquyen,
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
    // const Phieu = await models.theodoimuonsach.findOne({ _id: PhieuObjId });
    const Phieu = await models.theodoimuonsach
      .findById(PhieuObjId)
      .populate("sach")
      .populate("docgia")
      .populate("nguoipheduyet");

    if (!Phieu) throw new Error("Not found any Phieu to given id");

    return Phieu;
  }

  async getAllPhieuTheoDoi() {
    const Phieu = await models.theodoimuonsach
      .find()
      .populate("sach")
      .populate("docgia")
      .populate("nguoipheduyet");

    if (!Phieu) throw new Error("Not found any Phieu");
    console.log("Phieu: ", Phieu);
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
      soquyen: data.soquyen,
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
    if (!id) throw new Error("The Phieu's ID is require and cannot be empty");

    const PhieuObjId = new mongoose.Types.ObjectId(id);
    const deletedPhieu = await models.theodoimuonsach.findByIdAndDelete(
      PhieuObjId
    );

    if (!deletedPhieu) throw new Error("Faild to delete Phieu");

    return deletedPhieu;
  }

  async confirmBook(idTrackBook, quantityBook) {
    if (!idTrackBook) {
      throw new Error("The track's ID is required");
    }

    const recordBook = await models.theodoimuonsach
      .findById(idTrackBook)
      .populate("sach")
      .exec();
    console.log("recordBook", recordBook);
    if (!recordBook) {
      throw new Error("TrackBook not found");
    }

    if (recordBook.sach.soquyen < quantityBook) {
      throw new Error("Exceeded quantity of books available");
    }

    const dataUpdateRecord = {
      trangthai: "Chờ duyệt",
      ngaymuon: new Date(),
      soquyen: quantityBook,
    };

    const confirmedRecord = await models.theodoimuonsach.findByIdAndUpdate(
      idTrackBook,
      dataUpdateRecord,
      { new: true }
    );

    if (!confirmedRecord) {
      throw new Error("Failed to confirm book borrowing");
    }

    return confirmedRecord;
  }

  async approveBook(idTrackBook, idEmployee) {
    if (!idTrackBook) throw new Error("The track's ID is required");

    // Kiểm tra thông tin yêu cầu mượn sách
    const trackBook = await models.theodoimuonsach
      .findById(idTrackBook)
      .populate("sach");
    if (!trackBook) throw new Error("Track book record not found");

    const book = trackBook.sach;

    // Kiểm tra tồn kho
    if (book.soquyen < trackBook.soquyen) {
      throw new Error("Not enough books available for borrowing");
    }

    // Cập nhật số lượng sách (trừ đi số lượng mượn)
    const updatedBook = await models.sach.findByIdAndUpdate(
      book._id,

      // { $inc: { soquyen: -trackBook.soquyen } },
      { new: true }
    );

    if (!updatedBook) throw new Error("Failed to update book stock");

    // Cập nhật trạng thái yêu cầu mượn sách
    const date = new Date();
    const returnDate = new Date(date);
    returnDate.setDate(date.getDate() + 14); // Thời hạn trả sách là 14 ngày

    const dataUpdateTrackBook = {
      nguoipheduyet: idEmployee,
      ngaypheduyet: date,
      ngaytra: returnDate,
      trangthai: "Đã duyệt",
    };

    const approvedBook = await models.theodoimuonsach.findByIdAndUpdate(
      idTrackBook,
      dataUpdateTrackBook,
      { new: true }
    );

    if (!approvedBook)
      throw new Error("Failed to approve the book borrowing request");

    return approvedBook;
  }

  async returnBook(recordID) {
    if (!recordID) throw new Error("The track's ID is required");

    // Lấy thông tin yêu cầu mượn sách
    const trackBook = await models.theodoimuonsach
      .findById(recordID)
      .populate("sach");
    if (!trackBook) throw new Error("Track book record not found");

    const book = trackBook.sach;

    // Kiểm tra trạng thái xem sách đã được duyệt và đang mượn hay chưa
    // if (trackBook.trangthai !== "Đang mượn") {
    //   throw new Error("Book is not currently borrowed or already returned");
    // }

    // Cập nhật trạng thái yêu cầu mượn thành "Đã trả" và lưu ngày trả
    const date = new Date();
    const updatedData = {
      ngaytra: date,
      trangthai: "Đã trả",
    };

    const updatedTrackBook = await models.theodoimuonsach.findByIdAndUpdate(
      recordID,
      updatedData,
      { new: true }
    );

    if (!updatedTrackBook)
      throw new Error("Failed to update the track book record");

    // Tăng số lượng sách trong kho
    const updatedBook = await models.sach.findByIdAndUpdate(
      book._id,
      // { $inc: { soquyen: trackBook.soquyen } },
      { new: true }
    );

    if (!updatedBook) throw new Error("Failed to update book stock");

    // Trả về thông tin yêu cầu mượn đã cập nhật
    return updatedTrackBook;
  }

  async getTrackOfUser(userId) {
    if (!userId) {
      throw new Error("Failed to get user tracking records");
    }

    const trackings = await models.theodoimuonsach
      .find({ docgia: userId })
      .populate({
        path: "sach",
        populate: [
          { path: "nhaxuatban" }, // Populate chi tiết tác giả
        ],
      });
    // .populate({
    //   path: "sach",
    //   // select: "tensach theloai nhaxuatban",
    // })
    // .populate({
    //   path: "docgia",
    //   // select: "hotennv email",
    // })
    // .populate({
    //   path: "nguoipheduyet",
    //   // select: "hoten chucvu",
    // });

    if (!trackings || trackings.length === 0) {
      throw new Error("No tracking records found for this user");
    }

    return trackings;
  }
}

module.exports = new TheoDoiMuonSachService();
