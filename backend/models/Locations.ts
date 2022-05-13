import mongoose from "mongoose";

type ratingType = {
  likes: string[];
  dislikes: string[];
};

type comentType = {
  author: string;
  text: string;
  likes: string[];
  dislikes: string[];
};
export interface ILocation extends Document {
  locationName: string;
  coordinates: [number, number];
  photoSrc: string;
  description: string;
  rating: ratingType;
  comments?: comentType;
  filters: string[];
  author: string[];
}

const schema = new mongoose.Schema({
  locationName: { type: String, required: true },
  coordinates: [],
  photoSrc: { type: Array, required: false },
  description: { type: String },
  comments: { type: Object, default: {} },
  rating: {
    likes: { type: Array, default: [] },
    dislikes: { type: Array, default: [] },
  },
  filters: { type: Array, default: [] },
  author: { type: String, required: true },
});

export default mongoose.model<ILocation>("Location", schema);
