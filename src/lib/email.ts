import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    // Check .env variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const emailFrom = process.env.EMAIL_FROM;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !emailFrom) {
      console.error('SMTP settings are missing or incorrect.');
      return { success: false, error: 'SMTP settings are missing or incorrect.' };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"Plant Hire" <${emailFrom}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Error sending email.' };
  }
}

export function createContactNotificationEmail(contact: {
  fullName: string;
  email: string;
  phone?: string | null;
  equipment?: string | null;
  message: string;
}) {
  const text = `
New Contact Form Submission
---------------------------
Full Name: ${contact.fullName}
Email: ${contact.email}
Phone: ${contact.phone || 'Not provided'}
Equipment: ${contact.equipment || 'Not provided'}

Message:
${contact.message}
`;

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Full Name:</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${contact.fullName}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${contact.email}</td>
    </tr>
    ${contact.phone ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${contact.phone}</td>
    </tr>
    ` : ''}
    ${contact.equipment ? `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Equipment:</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${contact.equipment}</td>
    </tr>
    ` : ''}
  </table>
  
  <div>
    <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${contact.message}</div>
  </div>
  
  <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
    This email was sent automatically from the Plant Hire website contact form.
  </div>
</div>
`;

  return { text, html };
} 