import mongoose from "mongoose";

async function db_connect(url) {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database already connected");
      return;
    }

    await mongoose.connect(url);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error.message || error);
  }
}

export default db_connect;

