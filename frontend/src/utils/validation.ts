import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
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

export const RegistrationFormSchema = yup.object().shape({
  displayName: yup
    .string()
    .min(2, 'utils.validation.DisplayNameMinLengthError')
    .max(50, 'utils.validation.DisplayNameMaxLengthError')
    .required('utils.validation.emptyDisplayNameError'),
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

export const EditProfileSchema = yup.object().shape({
  displayName: yup
    .string()
    .required('utils.validation.emptyProfileNameError')
    .min(2, 'utils.validation.profileNameMinLengthError')
    .max(50, 'utils.validation.profileNameMaxLengthError'),

  description: yup
    .string()
    .required('utils.validation.emptyDescriptionProfileError')
    .min(5, 'utils.validation.descriptionProfileMinLengthError')
    .max(300, 'utils.validation.descriptionProfileMaxLengthError')
});

export const CreatingLocationSchema = yup.object().shape({
  locationName: yup
    .string()
    .min(5, 'utils.validation.locationNameMinLengthError')
    .max(50, 'utils.validation.locationNameMaxLengthError')
    .required('utils.validation.emptyLocationNameError'),
  locationDescription: yup
    .string()
    .min(10, 'utils.validation.locationDescriptionMinLengthError')
    .max(1000, 'utils.validation.locationDescriptionMaxLengthError')
    .required('utils.validation.emptyLocationDescriptionError')
});

export const CommentSectionSchema = yup.object().shape({
  commentText: yup
    .string()
    .required('utils.validation.emptyCommentTextError')
    .min(5, 'utils.validation.commentTextMinLengthError')
    .max(500, 'utils.validation.commentTextMaxLengthError')
});
