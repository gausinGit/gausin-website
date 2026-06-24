const nodemailer = require('nodemailer');

// Lazy-initialise transporter so missing env vars don't crash at startup
let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;
  _transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout:   10000,
    socketTimeout:     15000,
    tls: {
      // GoDaddy / cPanel mail servers use shared SSL certs that don't match
      // the custom domain — this allows the connection without rejecting it
      rejectUnauthorized: false,
    },
  });
  return _transporter;
}

/**
 * Send a single email.
 * @param {Object} opts  - to, subject, html, attachments (optional)
 */
async function sendMail({ to, subject, html, attachments }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  SMTP credentials not set — skipping email send');
    return;
  }
  const info = await getTransporter().sendMail({
    from: `"Gausin International Engineers" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
  console.log(`📧 Email sent: ${info.messageId}`);
  return info;
}

/** Send mail without failing the HTTP request if SMTP errors out. */
async function safeSendMail(opts) {
  try {
    return await sendMail(opts);
  } catch (err) {
    console.error('📧 Email send failed:', err.message);
    return null;
  }
}

module.exports = { sendMail, safeSendMail };
