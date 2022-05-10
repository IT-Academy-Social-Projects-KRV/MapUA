export const emailValidation = {
  required: "Email can't be empty",
  validate: (value: string) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!re.test(String(value).toLowerCase())) {
      return 'Wrong email';
    }
    return true;
  }
};
export const passwordValidation = {
  required: "Password can't be empty",
  validate: (value: string) => {
    if (value.length < 3 || value.length > 36) {
      return 'password must be more then 3 and less or equal then 36';
    }
    return true;
  }
};
