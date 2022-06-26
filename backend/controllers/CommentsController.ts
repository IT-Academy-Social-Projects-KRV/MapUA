import { Response, Request } from 'express';
import Comment from '../models/CommentModel';
import { rightsChecker } from '../utils/rightsChecker';

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
      return res.status(500).json({ error: req.t('other.server_error'), err });
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
      return res.status(200).json({
        message: req.t('location_comments.comment_add_success'),
        comment
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async editLocationComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { comment: commentBody } = req.body;
      const { author } = commentBody;

      const comment = await Comment.findOneAndUpdate(
        { _id: id, author },
        commentBody,
        {
          new: true
        }
      ).populate({
        path: 'author',
        select: 'displayName imageUrl'
      });

      res.status(200).json({
        message: req.t('location_comments.edit_comment_success'),
        comment
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async deleteLocationComment(req: Request, res: Response) {
    try {
      const comment = await Comment.findById({ _id: req.params.id }).select(
        'author'
      );

      if (!comment) {
        return res
          .status(400)
          .json({ error: req.t('location_comments.comment_not_found') });
      }
      const { _id: userId, role } = req.user;

      const isUserHasRights = rightsChecker(userId, role, comment?.author!);

      if (!isUserHasRights) {
        return res.status(403).json({ error: req.t('forbidden_role_action') });
      }

      await comment.deleteOne();

      return res.status(200).json({
        message: req.t('location_comments.comment_deleted_successfully')
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default CommentsController;
