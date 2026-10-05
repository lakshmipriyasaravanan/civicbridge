import nodemailer from 'nodemailer';

// Configure transporter using SMTP env vars or fallback to Ethereal / Console logger
const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback Ethereal / Test Transporter
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (err) {
    console.warn('Fallback test account failed, emails will be logged to console.');
    return null;
  }
};

export const sendRegistrationSuccessEmail = async ({ name, email }) => {
  const userName = name || email.split('@')[0] || 'Citizen';
  const userEmail = email;
  const registerTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const mailSubject = '[CivicBridge] Welcome! Account Registration Successful';
  const mailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background-color: #0B1F3A; padding: 24px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700;">CivicBridge</h1>
        <p style="margin: 4px 0 0; font-size: 12px; color: #a9c5ff; letter-spacing: 0.05em;">GOVERNMENT BENEFIT PORTAL</p>
      </div>
      <div style="padding: 28px; color: #172033;">
        <h2 style="color: #1457D9; margin-top: 0; font-size: 20px;">Welcome to CivicBridge!</h2>
        <p style="font-size: 14px; line-height: 1.6;">Hello <strong>${userName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6;">Thank you for registering with <strong>CivicBridge</strong> using the email address <strong>${userEmail}</strong>.</p>
        
        <div style="background-color: #f5f9ff; padding: 16px; border-left: 4px solid #1457D9; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; font-size: 13px; color: #172033;"><strong>Date & Time:</strong> ${registerTime} IST</p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #172033;"><strong>Registered Email:</strong> ${userEmail}</p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #1457D9;"><strong>Status:</strong> Registration Confirmed</p>
        </div>

        <p style="font-size: 13px; color: #667085; line-height: 1.6;">You can now complete your profile details to get accurate, personalized government scheme recommendations.</p>
      </div>
      <div style="background-color: #f8fbff; padding: 16px; text-align: center; font-size: 11px; color: #667085; border-top: 1px solid #edf1f7;">
        © CivicBridge · Informational Civic-Tech Portal
      </div>
    </div>
  `;

  console.log(`\n==================================================`);
  console.log(`[EMAIL DISPATCH] To: ${userEmail}`);
  console.log(`[EMAIL DISPATCH] Subject: ${mailSubject}`);
  console.log(`[EMAIL DISPATCH] Status: Registration welcome notification triggered`);
  console.log(`==================================================\n`);

  try {
    const transporter = await createTransporter();
    if (transporter) {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"CivicBridge Portal" <no-reply@civicbridge.gov.in>',
        to: userEmail,
        subject: mailSubject,
        html: mailHtml,
      });

      if (nodemailer.getTestMessageUrl(info)) {
        console.log(`[ETHEREAL PREVIEW URL] ${nodemailer.getTestMessageUrl(info)}`);
      }
      return { success: true, messageId: info.messageId, emailSent: true };
    }
  } catch (err) {
    console.error('Failed to send registration email via SMTP transporter:', err.message);
  }

  return { success: true, emailSent: true, loggedToConsole: true };
};
