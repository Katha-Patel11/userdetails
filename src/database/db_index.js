import mongoose from "mongoose";

const MONGO_DB_URL = "mongodb+srv://Katha:KATHA7434@katha.jmwxwlt.mongodb.net";
const DB_NAME = "MernTrain";

const connectDB = async () => {
  try {
    const connectInstacne = await mongoose.connect(
      `${MONGO_DB_URL}/${DB_NAME}`
    );

    console.log(`MongoDB Connected: ${connectInstacne.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
