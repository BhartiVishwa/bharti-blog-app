import mongoose from "mongoose";    

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bhartivish02_db_user:bharti%40123@cluster0.yuirsx9.mongodb.net/BLOG-APP"
    );
    console.log(" Connected with MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
};
