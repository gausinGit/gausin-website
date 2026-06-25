const fs = require('fs');
const nodemailer = require('nodemailer');

const EMAIL_FROM = process.env.EMAIL_FROM || 'Gausin International Engineers <info@gausin.in>';

let _transporter = null;

function useResend() {
  return !!process.env.RESEND_API_KEY;
}

function smtpProfiles() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true';

  const profiles = [
    { label: 'env', host, port, secure },
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
    connectionTimeout: 10000,
    greetingTimeout:   8000,
    socketTimeout:     10000,
    tls: { rejectUnauthorized: false },
  });
}

async function sendViaResend({ to, subject, html, attachments }) {
  const payload = {
    from: EMAIL_FROM,
    to:   [to],
    subject,
    html,
  };

  if (attachments?.length) {
    payload.attachments = attachments.map((a) => ({
      filename: a.filename,
      content:  fs.readFileSync(a.path).toString('base64'),
    }));
  }

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || data.error || JSON.stringify(data);
    throw new Error(msg);
  }

  console.log(`📧 Email sent via Resend: ${data.id} → ${to}`);
  return data;
}

async function sendViaSmtp({ to, subject, html, attachments }) {
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
      const info = await buildTransport(profile).sendMail(mail);
      if (profile.label !== 'env') {
        console.log(`📧 Email sent via fallback SMTP (${profile.label})`);
      }
      console.log(`📧 Email sent: ${info.messageId} → ${to}`);
      return info;
    } catch (err) {
      lastErr = err;
      console.warn(`📧 SMTP attempt failed (${profile.label}):`, err.message);
    }
  }

  throw lastErr;
}

async function sendMail(opts) {
  if (useResend()) return sendViaResend(opts);
  return sendViaSmtp(opts);
}

async function safeSendMail(opts) {
  try {
    return await sendMail(opts);
  } catch (err) {
    console.error('📧 Email send failed:', err.message);
    return null;
  }
}

function logMailProvider() {
  if (useResend()) {
    console.log('📧 Email provider: Resend (HTTPS)');
  } else if (process.env.SMTP_USER) {
    console.log('📧 Email provider: SMTP (local/dev fallback)');
  } else {
    console.warn('⚠️  No email provider configured (set RESEND_API_KEY or SMTP_*)');
  }
}

module.exports = { sendMail, safeSendMail, logMailProvider };
