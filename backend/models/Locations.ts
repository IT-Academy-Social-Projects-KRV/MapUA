import mongoose, { Schema } from 'mongoose';

type ratingType = {
  likes: string[];
  dislikes: string[];
};

type commentType = {
  author: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt: Date;
  updatedAt: Date;
};
export interface ILocation extends Document {
  locationName: string;
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  rating: ratingType;
  comments: commentType[];
  filters: string[];
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema({
  locationName: { type: String, required: true },
  coordinates: [],
  arrayPhotos: { type: Array, required: false },
  description: { type: String },
  comments: { type: Array, default: [] },
  rating: {
    likes: { type: Array, default: [] },
    dislikes: { type: Array, default: [] }
  },
  filters: { type: Array, default: [] },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

export default mongoose.model<ILocation>('Location', schema);
