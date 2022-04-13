import { Response, Request } from "express";
import uploadFileOnAWSBucket from "../utils/uploadFileOnAWSBucket";

const FilesController = {
  async uploadImage(req: Request, res: Response) {
    try {
      uploadFileOnAWSBucket(req);
      return res.json("Working great!");
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default FilesController;
