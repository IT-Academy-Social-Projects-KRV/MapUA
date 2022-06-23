import mongoose, { Schema } from 'mongoose';

type ratingType = {
  likes: string[];
  dislikes: string[];
};

type Status = 'verified' | 'unverified' | 'waiting';
export interface ILocation extends Document {
  locationName: string;
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  rating: ratingType;
  filters: string[];
  author: mongoose.Types.ObjectId;
  verificationStatus: Status;
}

const schema = new mongoose.Schema(
  {
    locationName: { type: String, required: true },
    coordinates: [],
    arrayPhotos: { type: Array, required: false },
    description: { type: String },
    rating: {
      likes: { type: Array, default: [] },
      dislikes: { type: Array, default: [] }
    },
    filters: { type: Array, default: [] },
    verificationStatus: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ILocation>('Location', schema);
