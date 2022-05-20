import nodemailer from 'nodemailer';

const { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_AUTH_USER, MAILTRAP_AUTH_PASS } =
  process.env;

const options = {
  host: MAILTRAP_HOST,
  port: Number(MAILTRAP_PORT),
  auth: {
    user: MAILTRAP_AUTH_USER,
    pass: MAILTRAP_AUTH_PASS
  }
};

const transport = nodemailer.createTransport(options);

export const sendForgotPasswordMail = async (
  email: string,
  password: string
) => {
  try {
    const res = await transport.sendMail({
      from: 'MapUA <noreply@mapua.com.ua>',
      to: email,
      subject: 'New Password',
      text: `Your new password: ${password}`
    });
    return res;
  } catch (error) {
    return null;
  }
};
