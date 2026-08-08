import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined.");
    }

    await mongoose.connect(mongoURI);

    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" Failed to connect to MongoDB");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

export default connectDB;