import nodemailer from "nodemailer";

type AdminOtpEmailArgs = {
  email: string;
  code: string;
  expiresAt: Date;
};

export async function sendAdminOtpEmail({
  email,
  code,
  expiresAt,
}: AdminOtpEmailArgs) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || process.env.ADMIN_EMAIL || "no-reply@example.com";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#18181b;max-width:560px;margin:0 auto;padding:24px;">
      <p style="font-size:14px;margin-bottom:8px;">Your admin login code is:</p>
      <div style="font-size:32px;font-weight:700;letter-spacing:6px;margin:16px 0;color:#4338ca;">
        ${code}
      </div>
      <p style="font-size:14px;margin:0;">This code expires at ${expiresAt.toLocaleString()}.</p>
      <p style="font-size:13px;color:#52525b;margin-top:16px;">If you did not request this code, you can ignore this email.</p>
    </div>
  `;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[admin-otp] OTP for ${email}: ${code} (expires ${expiresAt.toISOString()})`);
      return;
    }

    throw new Error("SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from,
    to: email,
    subject: "Your admin login code",
    text: `Your admin login code is ${code}. It expires at ${expiresAt.toLocaleString()}.`,
    html,
  });
}