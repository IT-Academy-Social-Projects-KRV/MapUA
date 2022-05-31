import * as yup from 'yup';

export const AuthFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('utils.validation.wrongEmailError')
    .required('utils.validation.emptyEmailError'),
  password: yup
    .string()
    .min(6, 'utils.validation.passwordMinLengthError')
    .max(36, 'utils.validation.passwordMaxLengthError')
    .required('utils.validation.emptyPasswordError')
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('utils.validation.wrongEmailError')
    .required('utils.validation.emptyEmailError')
});

export const EditDisplayNameSchema = yup.object().shape({
  displayName: yup.string().required('utils.validation.emptyProfileNameError')
});

export const CreatingLocationSchema = yup.object().shape({
  locationName: yup
    .string()
    .min(3, 'utils.validation.locationNameMinLengthError')
    .max(50, 'utils.validation.locationNameMaxLengthError')
    .required('utils.validation.emptyLocationNameError'),
  locationDescription: yup
    .string()
    .min(25, 'utils.validation.locationDescriptionMinLengthError')
    .required('utils.validation.emptyLocationDescriptionError'),
  locationFilters: yup.array().of(yup.string()).min(1)
});

export const CommentSectionSchema = yup.object().shape({
  commentText: yup
    .string()
    .min(3, 'utils.validation.commentTextMinLengthError')
    .required('utils.validation.emptyCommentTextError')
});
