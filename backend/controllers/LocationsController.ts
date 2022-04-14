import { Response, Request } from "express";

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      // todo add search by coordinates
      // todo find data, sort and send top 50 results to frontend
      console.log(req.params.zoom);
      return res.json("Backend got data about zoom and coords!");
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default LocationsController;
