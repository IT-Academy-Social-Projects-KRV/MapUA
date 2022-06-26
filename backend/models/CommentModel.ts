import mongoose, { Schema } from 'mongoose';

interface IComment {
  _id?: mongoose.Types.ObjectId;
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
      ref: 'Comments',
      default: null
    }
  },
  { timestamps: true }
);
schema.pre('deleteOne', { document: true }, async function (next) {
  try {
    const comment: IComment = this;

    const comments = await Comment.find({ parentComment: comment._id });
    for (const el of comments) {
      await el.deleteOne();
    }
  } catch (e) {
  } finally {
    next();
  }
});
const Comment = mongoose.model<IComment>('Comments', schema);

export default Comment;
