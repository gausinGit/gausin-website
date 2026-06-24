const router   = require('express').Router();
const rateLimit = require('express-rate-limit');
const Inquiry   = require('../models/Inquiry');
const { safeSendMail } = require('../utils/mailer');

const CONTACT_INBOX = process.env.CONTACT_EMAIL || process.env.COMPANY_EMAIL || 'info@gausin.in';

const formLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });

router.post('/', formLimit, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, capacity, message, industry, product, inquiryType, productCategory } = req.body;
    const industrySector = industry || inquiryType || null;
    const productInterest = product || productCategory || null;

    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required.' });
    }

    // Save to MongoDB
    const inquiry = await Inquiry.create({
      source: 'contact_page',
      firstName, lastName, email, phone, company, capacity, message,
      product: [industrySector, productInterest].filter(Boolean).join(' — ') || null,
    });

    // Email to company
    await safeSendMail({
      to: CONTACT_INBOX,
      subject: `New Contact Inquiry — ${firstName || ''} ${lastName || ''} (${company || 'N/A'})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2 style="color:#1e3a8a;">New Contact Form Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:140px;">Name</td><td style="padding:8px;">${firstName || ''} ${lastName || ''}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${company || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Industry</td><td style="padding:8px;">${industrySector || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Product / Service</td><td style="padding:8px;">${productInterest || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Capacity</td><td style="padding:8px;">${capacity || '—'}</td></tr>
          </table>
          <h3 style="color:#1e3a8a;margin-top:20px;">Message</h3>
          <p style="background:#f8fafc;padding:16px;border-left:4px solid #3b82f6;">${message}</p>
          <p style="color:#6b7280;font-size:12px;">Inquiry ID: ${inquiry._id} | Received: ${new Date().toLocaleString('en-IN')}</p>
        </div>
      `,
    });

    // Auto-reply to client
    await safeSendMail({
      to: email,
      subject: 'Thank you for contacting Gausin International Engineers',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2 style="color:#1e3a8a;">Thank You, ${firstName || 'there'}!</h2>
          <p>We have received your inquiry and our team will get back to you within <strong>24–48 business hours</strong>.</p>
          <p>Your inquiry reference: <strong>#${inquiry._id.toString().slice(-6).toUpperCase()}</strong></p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
          <p style="color:#6b7280;font-size:13px;">
            Gausin International Engineers Pvt. Ltd.<br>
            Meerut, Uttar Pradesh, India<br>
            <a href="mailto:info@gausin.in">info@gausin.in</a> | +91 7060 737 480
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Inquiry submitted successfully.', id: inquiry._id });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
