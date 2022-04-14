import { Request } from "express";
import AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";

AWS.config.update({ region: "eu-central-1" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "latest" });
// In the future, this list will be extended with new ones
const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpeg", "image/gif"];

const uploadFileOnAWSBucket = async (req: Request) => {
  const uploadParams = { Bucket: "mapua-storage", Key: "", Body: "" };
  if (req.busboy) {
    req.pipe(req.busboy);

    const fileUploadPromise = new Promise<ManagedUpload.SendData>(
      (resolve, reject) => {
        req.busboy.on("file", (_, file, fileInfo) => {
          file.on("error", (err) => {
            reject(err);
          });

          if (!allowedMimeTypes.includes(fileInfo.mimeType)) {
            reject({ message: "Not allowed mime-type" });
          }

          uploadParams.Body = file as unknown as string;
          uploadParams.Key = `files/${fileInfo.filename}`;

          // call S3 to retrieve upload file to specified bucket
          s3.upload(
            uploadParams,
            (err: Error, data: ManagedUpload.SendData) => {
              if (err) reject(err);
              if (data) resolve(data);
            }
          );
        });
      }
    );
    const { Location } = await fileUploadPromise;
    return Location;
  }
};

export default uploadFileOnAWSBucket;
