import mongoose from "mongoose";

type ratingType = {
  likes: string[];
  dislikes: string[];
};

export interface ILocation extends Document {
  locationName: string;
  coordinates: [number, number];
  photoSrc: string;
  description: string;
  rating: ratingType;
  comments?: string[];
  filters: {
    favorite: string[];
    visited: string[];
    author: string;
    cost: "free" | "paid";
  };
}

const schema = new mongoose.Schema({
  locationName: { type: String, required: true },
  coordinates: [],
  photoSrc: { type: String, required: false },
  description: { type: String },
  comments: { type: Array, default: [] },
  rating: {
    likes: { type: Array, default: [] },
    dislikes: { type: Array, default: [] },
  },
  filters: {
    type: {
      favorite: {
        type: Array,
        default: [],
      },
      visited: {
        type: Array,
        default: [],
      },
      author: String,
      cost: String,
    },
  },
});

export default mongoose.model<ILocation>("Location", schema);
