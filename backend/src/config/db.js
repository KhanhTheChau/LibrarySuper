const mongoose = require("mongoose");

const databaseName = "CT449"; // Đặt tên database là CT449
const mongoURI = `mongodb://127.0.0.1:27017/${databaseName}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI); // Không cần các tùy chọn lỗi thời
    console.log(
      `✅ MongoDB connected to database: ${mongoose.connection.name}`
    );
  } 
  catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Thoát chương trình nếu kết nối thất bại
  }
};

module.exports = connectDB;
