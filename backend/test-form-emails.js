require('dotenv').config();
const nodemailer = require('nodemailer');

const CAREER_INBOX = process.env.CAREER_EMAIL || 'gaurav.singhal@gausin.in';
const CONTACT_INBOX = process.env.CONTACT_EMAIL || process.env.COMPANY_EMAIL || 'info@gausin.in';

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout:   10000,
  socketTimeout:     15000,
  tls: { rejectUnauthorized: false },
});

async function sendTest(to, label) {
  const info = await transporter.sendMail({
    from: `"Gausin International Engineers" <${process.env.SMTP_USER}>`,
    to,
    subject: `Gausin Test — ${label}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;">
        <h2 style="color:#1e3a8a;">Test Email — ${label}</h2>
        <p>Yeh ek test email hai. Agar aapko yeh mila, to website forms is inbox par emails bhej sakte hain.</p>
        <p><strong>Target inbox:</strong> ${to}</p>
        <p style="color:#6b7280;font-size:12px;">Sent: ${new Date().toLocaleString('en-IN')}</p>
      </div>
    `,
  });
  return info.messageId;
}

async function main() {
  console.log('SMTP host:', process.env.SMTP_HOST || '(missing)');
  console.log('SMTP user:', process.env.SMTP_USER || '(missing)');
  console.log('Contact inbox:', CONTACT_INBOX);
  console.log('Career inbox:', CAREER_INBOX);

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP credentials missing in .env');
    process.exit(1);
  }

  let lastErr;
  for (const { port, secure, label } of [
    { port: parseInt(process.env.SMTP_PORT || '465', 10), secure: process.env.SMTP_SECURE === 'true', label: 'env' },
    { port: 587, secure: false, label: '587 STARTTLS' },
    { port: 465, secure: true, label: '465 SSL' },
  ]) {
    try {
      transporter.options.port = port;
      transporter.options.secure = secure;
      await transporter.verify();
      console.log(`SMTP connection OK (${label}, port ${port})`);
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
      console.log(`SMTP failed (${label}):`, err.message);
    }
  }
  if (lastErr) throw lastErr;

  const contactId = await sendTest(CONTACT_INBOX, 'Contact Form (info@gausin.in)');
  console.log('Contact test sent:', contactId);

  const careerId = await sendTest(CAREER_INBOX, 'Career Form (gaurav.singhal@gausin.in)');
  console.log('Career test sent:', careerId);
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
