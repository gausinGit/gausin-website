const nodemailer = require('nodemailer');

let _transporter = null;

function smtpProfiles() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true';

  const profiles = [
    { label: 'env', host, port, secure },
    // GoDaddy relay — cPanel hostname often times out from cloud hosts (Render)
    { label: 'godaddy-relay-587', host: 'smtpout.secureserver.net', port: 587, secure: false },
    { label: 'godaddy-relay-465', host: 'smtpout.secureserver.net', port: 465, secure: true },
  ];

  const seen = new Set();
  return profiles.filter((p) => {
    const key = `${p.host}:${p.port}:${p.secure}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildTransport({ host, port, secure }) {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout:   20000,
    socketTimeout:     30000,
    tls: { rejectUnauthorized: false },
  });
}

function getTransporter() {
  if (_transporter) return _transporter;
  const primary = smtpProfiles()[0];
  _transporter = buildTransport(primary);
  return _transporter;
}

async function sendMail({ to, subject, html, attachments }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  SMTP credentials not set — skipping email send');
    return;
  }

  const mail = {
    from: `"Gausin International Engineers" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments,
  };

  let lastErr;
  for (const profile of smtpProfiles()) {
    try {
      const transport = buildTransport(profile);
      const info = await transport.sendMail(mail);
      if (profile.label !== 'env') {
        console.log(`📧 Email sent via fallback SMTP (${profile.label})`);
      }
      console.log(`📧 Email sent: ${info.messageId}`);
      return info;
    } catch (err) {
      lastErr = err;
      console.warn(`📧 SMTP attempt failed (${profile.label}):`, err.message);
    }
  }

  throw lastErr;
}

async function safeSendMail(opts) {
  try {
    return await sendMail(opts);
  } catch (err) {
    console.error('📧 Email send failed:', err.message);
    return null;
  }
}

module.exports = { sendMail, safeSendMail };
