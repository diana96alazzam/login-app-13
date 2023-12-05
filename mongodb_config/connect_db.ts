import mongoose from "mongoose";

/**
 * Connect mongodb handler.
 */
const connectMongoDB = async () => {
  try {
    const db_uri = process.env.MONGODB_URI;
    if (!db_uri) throw Error("MONGODB_URI is not defined");
    await mongoose.connect(db_uri);
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
};

export default connectMongoDB;
