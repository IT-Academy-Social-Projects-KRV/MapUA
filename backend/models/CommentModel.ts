import mongoose, { Schema } from 'mongoose';

interface IComment {
  _id?: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  text: string;
  likes: string[];
  dislikes: string[];
  parentComment: mongoose.Types.ObjectId;
  deleted: boolean;
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
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },

  { timestamps: true }
);
schema.pre('deleteOne', { document: true }, async function (next) {
  const comment: IComment = this;

  try {
    const parentComment = await Comment.findById(comment.parentComment);
    if (parentComment && parentComment.deleted) {
      const childComments = await Comment.find({
        parentComment: parentComment._id
      }).exec();

      if (childComments.length === 1) await parentComment.deleteOne();
    }
  } catch (e) {
  } finally {
    next();
  }
});
const Comment = mongoose.model<IComment>('Comments', schema);

export default Comment;
