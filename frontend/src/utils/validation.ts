import i18next from 'i18next';

export const emailValidation = {
  required: i18next.t('utils.vaidation.emailCanNotBeEmpty'),
  validate: (value: string) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!re.test(String(value).toLowerCase())) {
      return i18next.t('utils.vaidation.wrongEmail');
    }
    return true;
  }
};
export const passwordValidation = {
  required: i18next.t('utils.vaidation.passwordCanNotBeEmpty'),
  validate: (value: string) => {
    if (value.length < 3 || value.length > 36) {
      return i18next.t('utils.vaidation.passwordErrorLength');
    }
    return true;
  }
};
