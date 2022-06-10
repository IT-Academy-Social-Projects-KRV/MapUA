import { Response, Request } from 'express';
import Comment from '../models/CommentModel';

const CommentsController = {
  async getLocationComments(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const comments = await Comment.find({ locationId: locationId })
        .sort({ createdAt: -1 })
        .populate({
          path: 'author',
          select: 'displayName imageUrl'
        });
      return res.json(comments);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async createLocationComment(req: Request, res: Response) {
    try {
      const { comment: commentBody } = req.body;
      const newComment = new Comment(commentBody);
      const { _id: newCommentId } = await newComment.save();
      const comment = await Comment.findById(newCommentId).populate({
        path: 'author',
        select: 'displayName imageUrl'
      });

      return res.status(200).json(comment);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  }
};

export default CommentsController;
