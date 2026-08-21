import express from "express";
import router from "./Router/auth.router.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

let app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", router);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Successfully created firt api in rest api",
  });
});

export default app;
