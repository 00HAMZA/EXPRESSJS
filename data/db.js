const mongoose = require("mongoose");
    console.log("typeof process :", typeof process.env.MONGO_URI);

const connectDB = async () => {
  try {
    console.log("process :", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;