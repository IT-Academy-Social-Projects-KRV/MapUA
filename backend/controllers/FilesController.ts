import { Response, Request } from "express";
import uploadFileOnAWSBucket from "../utils/uploadFileOnAWSBucket";

const FilesController = {
  async uploadImage(req: Request, res: Response) {
    try {
      const location = await uploadFileOnAWSBucket(req);
      return res.json({ url: location });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default FilesController;
