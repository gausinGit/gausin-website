const router   = require('express').Router();
const rateLimit = require('express-rate-limit');
const Inquiry   = require('../models/Inquiry');
const { sendMail } = require('../utils/mailer');

const formLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 20 });

// POST /api/inquiry  — product sidebar "Get a Quote" form
router.post('/', formLimit, async (req, res) => {
  try {
    const { name, company, email, phone, capacity, message, product } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const inquiry = await Inquiry.create({
      source: 'product_sidebar',
      product: product || 'Unknown Product',
      name, company, email, phone, capacity, message,
    });

    await sendMail({
      to: process.env.COMPANY_EMAIL || 'info@gausin.in',
      subject: `Product Inquiry — ${product || 'Unknown'} from ${name || email}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2 style="color:#1e3a8a;">Product Inquiry — ${product || 'N/A'}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:130px;">Name</td><td style="padding:8px;">${name || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${company || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Capacity</td><td style="padding:8px;">${capacity || '—'}</td></tr>
          </table>
          <h3 style="color:#1e3a8a;margin-top:20px;">Requirements</h3>
          <p style="background:#f8fafc;padding:16px;border-left:4px solid #3b82f6;">${message || '—'}</p>
          <p style="color:#6b7280;font-size:12px;">Inquiry ID: ${inquiry._id} | Received: ${new Date().toLocaleString('en-IN')}</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Inquiry submitted.', id: inquiry._id });
  } catch (err) {
    console.error('Inquiry route error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
