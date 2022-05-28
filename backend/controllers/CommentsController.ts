import { Response, Request } from 'express';
import Comment from '../models/CommentModel';

const CommentsController = {
  async getLocationComments(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const comments = await Comment.find({ locationId: locationId }).populate({
        path: 'author',
        select: 'displayName email'
      });
      return res.json({ comments });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async createLocationComment(req: Request, res: Response) {
    try {
      const commentBody = req.body;
      const newComment = new Comment(commentBody);
      const result = await newComment.save();

      return res
        .status(200)
        .json({ message: req.t('"comment_add_success"'), result });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  }
};

export default CommentsController;
