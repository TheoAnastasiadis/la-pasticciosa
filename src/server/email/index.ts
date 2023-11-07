import nodemailer from "nodemailer";
import appConfig from "../config/app.config";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: appConfig.getSentryDsn(),
  debug: false,
});

const transporter = nodemailer.createTransport({
  host: appConfig.getEmailServer(),
  port: 465,
  secure: true,
  auth: {
    user: appConfig.getSenderEmailAddress(),
    pass: appConfig.getEmailPassword(),
  },
});

export default async function sendMail(
  recipient: { email: string; name: string },
  email: { html: string; text?: string; subject: string },
): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"La Passticciosa - Notifications" <${appConfig.getSenderEmailAddress()}>`,
      to: `"${recipient.name}" <${recipient.email}>`,
      replyTo: `"La Passticciosa" <${appConfig.getReplyEmailAddress()}>`,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
  } catch (e) {
    Sentry.captureException(e);
  }
}
