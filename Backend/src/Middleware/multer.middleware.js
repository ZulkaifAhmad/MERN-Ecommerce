import multer from "multer";

const storage = multer.memoryStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
console.log("Multer middleware loaded successfully");
export default upload;
