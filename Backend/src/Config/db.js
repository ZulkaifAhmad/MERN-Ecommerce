import mongoose from "mongoose";

async function db_connect(url) {
  try {
    await mongoose.connect(url);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}

export default db_connect