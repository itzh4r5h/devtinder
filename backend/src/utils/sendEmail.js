import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ from, to, subject, htmlBody }) => {
  const { error } = await resend.emails.send({
    from: `Devtinder <${from}@devtinder.itzh4r5h.com>`,
    to,
    subject,
    html: htmlBody
  });

  if (error) {
    return error
  }

  return null

}


