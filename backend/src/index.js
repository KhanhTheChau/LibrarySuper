const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Import routes
const router = require("./routers/index");
// function run server
const runServer = async () => {
  try {
    // Kết nối database
    connectDB();

    // router
    app.use("/api/v1", router);

    // run server
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } 
  catch (error) {
    console.error("Error run server", error);
  }
};

runServer();
