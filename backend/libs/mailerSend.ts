const Recipient = require('mailersend').Recipient;
const EmailParams = require('mailersend').EmailParams;
const MailerSend = require('mailersend');

const mailersend = new MailerSend({
  api_key: process.env.MAILERSEND_API_KEY,
});

export const sendForgotPasswordMail = async (
  email: string,
  password: string,
  name: string
) => {
  const recipients = [new Recipient(email, name)];

  const message = `Your new password: ${password}`;

  const emailParams = new EmailParams()
    .setFrom('noreply@mapua.com.ua')
    .setFromName('MapUA')
    .setRecipients(recipients)
    .setSubject('New Password')
    .setText(message);

  const res = await mailersend.send(emailParams);
  console.log(res);
  console.log(email, password, name);
};
