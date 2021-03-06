import { body, check } from 'express-validator';

export const userLoginSchema = [
  body('email')
    .isEmail()
    .withMessage((value, { req, location, path }) => {
      return req.t('auth.invalid_email', { value, location, path });
    }),
  body('password')
    .isLength({ min: 6, max: 50 })
    .withMessage((value, { req, location, path }) => {
      return req.t('auth.invalid_password_length', { value, location, path });
    })
];

export const userRegistrationSchema = [
  body('displayName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage((value, { req, location, path }) => {
      return req.t('user_profile.change_user_info_error_name', {
        value,
        location,
        path
      });
    }),
  body('email')
    .isEmail()
    .withMessage((value, { req, location, path }) => {
      return req.t('auth.invalid_email', { value, location, path });
    }),
  body('password')
    .isLength({ min: 6, max: 50 })
    .withMessage((value, { req, location, path }) => {
      return req.t('auth.invalid_password_length', { value, location, path });
    })
];

export const forgotPasswordSchema = [
  body('email')
    .isEmail()
    .withMessage((value, { req, location, path }) => {
      return req.t('auth.invalid_email', { value, location, path });
    })
];

export const CommentSchema = [
  body('comment').isObject().withMessage('Invalid format data'),
  body('comment.author')
    .isString()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.locationId')
    .isString()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.text')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_length_error', {
        value,
        location,
        path
      });
    }),
  body('comment.likes')
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.dislikes')
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.parentComment')
    .optional({ nullable: true })
    .isString()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    })
];

export const UpdateCommentRatingSchema = [
  body('comment').isObject().withMessage('Invalid format data'),
  body('comment.likes')
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.dislikes')
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    })
];

export const SendCommentSchema = [
  body('comment').isObject().withMessage('Invalid format data'),
  body('comment.author')
    .isString()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.locationId')
    .isString()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('comment.text')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_length_error', {
        value,
        location,
        path
      });
    })
];

export const updateLocationLikesSchema = [
  check('id').exists({ checkFalsy: true }).withMessage('Invalid id'),
  body('rating').isObject().withMessage('Invalid data format'),
  body('rating.likes')
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('rating.dislikes')
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('location_comments.comment_not_have_properties', {
        value,
        location,
        path
      });
    }),
  body('verificationStatus').isString().withMessage('Invalid data format')
];

export const postPersonalLocationSchema = [
  body('locationName')
    .isString()
    .isLength({ min: 5, max: 50 })
    .withMessage((value, { req, location, path }) => {
      return req.t('add_location.add_location_name_error', {
        value,
        location,
        path
      });
    }),
  body('description')
    .isString()
    .isLength({ min: 10, max: 1000 })
    .withMessage((value, { req, location, path }) => {
      return req.t('add_location.add_location_description_error', {
        value,
        location,
        path
      });
    }),
  body('coordinates')
    .exists({ checkFalsy: true })
    .isArray()
    .withMessage((value, { req, location, path }) => {
      return req.t('add_location.add_location_coordinates_error', {
        value,
        location,
        path
      });
    })
];

export const userDataSchema = [
  body('id').exists({ checkFalsy: true }).withMessage('Invalid id'),
  body('displayName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage((value, { req, location, path }) => {
      return req.t('user_profile.change_user_info_error_name', {
        value,
        location,
        path
      });
    }),
  body('description')
    .isString()
    .isLength({ min: 5, max: 300 })
    .withMessage((value, { req, location, path }) => {
      return req.t('user_profile.change_user_info_error_description', {
        value,
        location,
        path
      });
    })
];
