require('dotenv').config();
const { sendMail } = require('./utils/mailer');

const CONTACT = process.env.CONTACT_EMAIL || 'info@gausin.in';
const CAREER  = process.env.CAREER_EMAIL  || 'gaurav.singhal@gausin.in';

async function main() {
  if (!process.env.RESEND_API_KEY) {
    console.error('Set RESEND_API_KEY in .env or Render Environment first.');
    process.exit(1);
  }

  console.log('Sending Resend test emails...');
  console.log('Contact inbox:', CONTACT);
  console.log('Career inbox:', CAREER);

  await sendMail({
    to: CONTACT,
    subject: 'Gausin Resend Test — Contact (info@gausin.in)',
    html: '<p>Contact form emails will arrive at <strong>info@gausin.in</strong>.</p>',
  });

  await sendMail({
    to: CAREER,
    subject: 'Gausin Resend Test — Career (gaurav.singhal@gausin.in)',
    html: '<p>Career form emails will arrive at <strong>gaurav.singhal@gausin.in</strong>.</p>',
  });

  console.log('Done — check both inboxes.');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
