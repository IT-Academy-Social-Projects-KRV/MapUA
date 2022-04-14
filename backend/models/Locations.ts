import mongoose from "mongoose";

type ratingType = {
  likes: number;
  dislikes: number;
};

export interface ILocation {
  locationName: string;
  coordinates: [number, number];
  photoSrc: string;
  description: string;
  rating: ratingType;
}

const schema = new mongoose.Schema({
  locationName: { type: String, required: true },
  coordinates: [],
  photoSrc: { type: String, required: false },
  description: { type: String },
  comments: { type: Array, default: [] },
  rating: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
});

export default mongoose.model<ILocation>("Location", schema);
