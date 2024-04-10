import { Resend } from "resend";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

// RESEND
export const sendVerificationEmailResend = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}" target="_blank">here</a> to confirm your email.</p>`,
  });
};

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

// MAILERSEND
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const sentFrom = new Sender(
    "info@trial-3zxk54vnw0xljy6v.mlsender.net",
    "Paytm Verify",
  );
  const recipients = [new Recipient(email, email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Verify your email")
    .setHtml(
      `<p>Click <a href="${confirmLink}" target="_blank">here</a> to confirm your email.</p>`,
    );

  await mailerSend.email.send(emailParams);
};
