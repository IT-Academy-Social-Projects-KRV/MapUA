import mongoose from "mongoose";

type ratingType = {
  likes: number;
  dislikes: number;
};

export interface ILocation extends Document {
  locationName: string;
  // coordinates: [number, number];
  photoSrc: string;
  description: string;
  // rating: ratingType;
}

const schema = new mongoose.Schema(
  {
    locationName: { type: String, required: true },
    // coordinates: [],
    photoSrc: { type: String },
    description: { type: String },
    // comments: [],
    // rating: {
    //   likes: { type: Number },
    //   dislikes: { type: Number },
    // },
  }
  // {
  //   timestamps: true,
  // }
);

export default mongoose.model<ILocation>("Location", schema);
