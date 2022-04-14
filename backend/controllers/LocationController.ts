import { Response, Request } from "express";

const LocationController = {
  async getLocations(req: Request, res: Response) {
    try {
      console.log(req.body.zoom, req.body.coordinates);
      return res.json("Back got data about zoom and coords!");
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default LocationController;
