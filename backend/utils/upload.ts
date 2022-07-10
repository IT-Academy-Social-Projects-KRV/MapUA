import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import path from 'path';

AWS.config.update({ region: 'eu-central-1' });

export const upload = multer({
  storage: multerS3({
    s3: new AWS.S3({
      apiVersion: 'latest',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_SECRET_ACCESS_ID
    }),
    bucket: 'mapua-storage',
    key: (_, file, cb) => {
      cb(null, `files/${Date.now().toString()}-${file.originalname}`);
    }
  }),
  fileFilter: (_, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg|/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: Not allowed mime-type!'));
  }
});
