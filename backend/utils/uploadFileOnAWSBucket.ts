import { Request } from "express";
import AWS from "aws-sdk";
import fs from "fs";

AWS.config.update({ region: "eu-central-1" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "latest" });

const uploadFileOnAWSBucket = (req: Request) => {
  const uploadParams = { Bucket: "mapua-storage", Key: "", Body: "" };
  if (req.busboy) {
    req.pipe(req.busboy);

    req.busboy.on("file", (_, file) => {
      file.on("error", (err) => {
        console.log("File Error", err);
      });

      uploadParams.Body = file as unknown as string;
      uploadParams.Key = "images/file.png";

      // call S3 to retrieve upload file to specified bucket
      s3.upload(uploadParams, (err: unknown, data: any) => {
        if (err) {
          console.log("Error", err);
        }
        if (data) {
          console.log("Upload Success", data.Location);
        }
      });
    });
  }
};

export default uploadFileOnAWSBucket;
