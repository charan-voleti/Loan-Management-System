import multer from "multer";

import path from "path";


// ==============================
// STORAGE CONFIG
// ==============================

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "src/uploads/salary-slips"
    );
  },

  filename: (
    req,
    file,
    cb
  ) => {

    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;

    cb(null, uniqueName);
  },
});


// ==============================
// FILE FILTER
// ==============================

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {

  const allowedTypes =
    /jpeg|jpg|png|pdf/;

  const extName =
    allowedTypes.test(
      path.extname(
        file.originalname
      ).toLowerCase()
    );

  const mimeType =
    allowedTypes.test(file.mimetype);

  if (extName && mimeType) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF/JPG/PNG files allowed"
      )
    );
  }
};


// ==============================
// MULTER CONFIG
// ==============================

const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;