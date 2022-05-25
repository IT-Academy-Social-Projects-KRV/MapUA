import i18next from 'i18next';
// import i18n from '../i18n';

export const emailValidation = {
  required: i18next.t('utils.validation.emailCanNotBeEmpty'),
  validate: (value: string) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!re.test(String(value).toLowerCase())) {
      return i18next.t('utils.validation.wrongEmail');
    }
    return true;
  }
};
export const passwordValidation = {
  required: "i18n.t('utils.validation.passwordCanNotBeEmpty')",
  validate: (value: string) => {
    if (value.length < 3 || value.length > 36) {
      return i18next.t('utils.validation.passwordErrorLength');
    }
    return true;
  }
};
