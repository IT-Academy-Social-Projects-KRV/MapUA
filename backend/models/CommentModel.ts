import mongoose, { Schema } from 'mongoose';

interface IComment {
  author: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  text: string;
  likes: string[];
  dislikes: string[];
  parentComment: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    locationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    likes: {
      type: Array,
      default: []
    },
    dislikes: {
      type: Array,
      default: []
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model<IComment>('Comments', schema);
