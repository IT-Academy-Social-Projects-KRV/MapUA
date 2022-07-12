import { Response, Request } from 'express';
import Comment from '../models/CommentModel';
import { rightsChecker } from '../utils/rightsChecker';

const CommentsController = {
  async getLocationComments(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const  {commentId, commentCount } = req.query;

      let comments = [];

      const topComments = await Comment.find({ locationId: locationId, parentComment: null })
        .sort({ createdAt: -1 })
        .limit(Number(commentCount))
        .populate({
          path: 'author',
          select: 'displayName imageUrl role'
        });
    

        if(commentId){
          const replyComments = await Comment.find({ locationId: locationId, parentComment: commentId })
          .sort({ createdAt: -1 })
          .populate({
            path: 'author',
            select: 'displayName imageUrl role'
          });
          comments = [...replyComments, ...topComments];
        } else {
          comments = [...topComments];
        }

      return res.json(comments);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },

  async createLocationComment(req: Request, res: Response) {
    try {
      const { comment: commentBody } = req.body;
      const newComment = new Comment(commentBody);
      const { _id: newCommentId, parentComment: parentCommentId  } = await newComment.save();

      if (parentCommentId){
        await Comment.findOneAndUpdate(
          { _id: parentCommentId },
          {
            $set: {
                "hasReplies": true
            }
        }
        ).populate({
          path: 'author',
          select: 'displayName imageUrl role'
        });
      }

      const comment = await Comment.findById(newCommentId).populate({
        path: 'author',
        select: 'displayName imageUrl role'
      });

      const parentComment = await Comment.findById(parentCommentId).populate({
        path: 'author',
        select: 'displayName imageUrl role'
      });
      
      const comments = {addedComent: comment, parentComment: parentComment};

      return res.status(200).json({
        message: req.t('location_comments.comment_add_success'),
        // comment
        comments
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
        select: 'displayName imageUrl role'
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
      const comment = await Comment.findById({ _id: req.params.id }).populate({
        path: 'author',
        select: 'displayName imageUrl role'
      });

      if (!comment) {
        return res
          .status(400)
          .json({ error: req.t('location_comments.comment_not_found') });
      }
      const { _id: userId, role } = req.user;
      const isUserHasRights = rightsChecker(userId, role, comment.author._id);

      if (!isUserHasRights) {
        return res.status(403).json({ error: req.t('forbidden_role_action') });
      }

      const comments = await Comment.find({ parentComment: comment._id });

      if (comments.length) {
        comment.deleted = true;
        await comment.save();
      } else {
          await comment.deleteOne();
          const parentComments = await Comment.find({ parentComment: comment.parentComment });

          if (!parentComments.length){
              await Comment.findOneAndUpdate(
            { _id: comment.parentComment },
            {
              $set: {
                  "hasReplies": false
              }
          }
          ).populate({
            path: 'author',
            select: 'displayName imageUrl role'
          })
        }
      }

      return res.status(200).json({
        message: req.t('location_comments.comment_deleted_successfully'),
        comment
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },

  async updateLocationCommentRatingById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { comment: commentBody } = req.body;

      const comment = await Comment.findOneAndUpdate({ _id: id }, commentBody, {
        new: true
      }).populate({
        path: 'author',
        select: 'displayName imageUrl role'
      });

      res.status(200).json({
        message: req.t('location_comments.edit_comment_success'),
        comment
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default CommentsController;
