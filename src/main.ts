import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw new Error("Database error");
  }
  app.listen(8080, () => console.log("listening on port 8080"));
};

start();
