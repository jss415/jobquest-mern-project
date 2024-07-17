import multer from "multer";
import { BadRequestError } from "../utils/customErrors.js";
import path from "path";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError("Not an image! Please upload only images", 400),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export default upload;
