import * as yup from 'yup';

export const AuthFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('utils.validation.wrongEmail')
    .required('utils.validation.emailCanNotBeEmpty'),
  password: yup
    .string()
    .min(6, 'utils.validation.passwordErrorLength')
    .max(36, 'utils.validation.passwordErrorLength')
    .required('utils.validation.passwordCanNotBeEmpty')
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('utils.validation.wrongEmail')
    .required('utils.validation.emailCanNotBeEmpty')
});
