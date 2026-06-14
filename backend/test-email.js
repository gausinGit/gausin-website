require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }, // allow self-signed certs on custom domains
});

async function test() {
  console.log('Testing SMTP connection...');
  console.log(`Host: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
  console.log(`User: ${process.env.SMTP_USER}`);

  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    const info = await transporter.sendMail({
      from: `"Gausin Test" <${process.env.SMTP_USER}>`,
      to:   process.env.SMTP_USER,
      subject: 'Gausin Backend — Email Test',
      html: '<h2>Email is working!</h2><p>Backend se email successfully bheja gaya.</p>',
    });
    console.log('✅ Test email sent! Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.code) console.error('   Code:', err.code);
  }
  process.exit(0);
}

test();
