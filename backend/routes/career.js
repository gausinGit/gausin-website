const router      = require('express').Router();
const rateLimit   = require('express-rate-limit');
const multer      = require('multer');
const path        = require('path');
const fs          = require('fs');
const Application = require('../models/Application');
const { safeSendMail } = require('../utils/mailer');

const CAREER_INBOX = process.env.CAREER_EMAIL || 'gaurav.singhal@gausin.in';

// ── Multer setup — store resumes in backend/uploads/ ─────────────────────────
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) return cb(null, true);
    cb(new Error('Only PDF, DOC, or DOCX files are accepted.'));
  },
});

const formLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 });

// POST /api/career  — career application with optional resume
router.post('/', formLimit, upload.single('resume'), async (req, res) => {
  try {
    const { role, name, email, phone, experience, coverLetter } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: 'Name, email, and role are required.' });
    }

    const resumeFile = req.file ? {
      originalName: req.file.originalname,
      filename:     req.file.filename,
      path:         `uploads/${req.file.filename}`,
      mimetype:     req.file.mimetype,
      size:         req.file.size,
    } : null;

    const application = await Application.create({
      role, name, email, phone, experience, coverLetter, resumeFile,
    });

    // Email to company with resume attached
    const attachments = resumeFile ? [{
      filename: resumeFile.originalName,
      path:     path.join(uploadDir, resumeFile.filename),
    }] : [];

    await safeSendMail({
      to: CAREER_INBOX,
      subject: `Career Application — ${role} from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2 style="color:#1e3a8a;">New Career Application</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:130px;">Role Applied</td><td style="padding:8px;color:#1e3a8a;font-weight:bold;">${role}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Experience</td><td style="padding:8px;">${experience || '—'}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:8px;font-weight:bold;">Resume</td><td style="padding:8px;">${resumeFile ? `✅ ${resumeFile.originalName}` : 'Not uploaded'}</td></tr>
          </table>
          ${coverLetter ? `<h3 style="color:#1e3a8a;margin-top:20px;">Cover Letter</h3><p style="background:#f8fafc;padding:16px;border-left:4px solid #3b82f6;">${coverLetter}</p>` : ''}
          <p style="color:#6b7280;font-size:12px;">Application ID: ${application._id} | Received: ${new Date().toLocaleString('en-IN')}</p>
        </div>
      `,
      attachments,
    });

    // Auto-reply to applicant
    await safeSendMail({
      to: email,
      subject: `Application Received — ${role} | Gausin International Engineers`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2 style="color:#1e3a8a;">Application Received!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for applying for the <strong>${role}</strong> position at Gausin International Engineers Pvt. Ltd.</p>
          <p>We have received your application and our HR team will review it shortly. Shortlisted candidates will be contacted within <strong>7–10 working days</strong>.</p>
          <p>Application Reference: <strong>#${application._id.toString().slice(-6).toUpperCase()}</strong></p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
          <p style="color:#6b7280;font-size:13px;">
            Gausin International Engineers Pvt. Ltd.<br>
            Meerut, Uttar Pradesh, India<br>
            <a href="mailto:info@gausin.in">info@gausin.in</a>
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Application submitted successfully.', id: application._id });
  } catch (err) {
    console.error('Career route error:', err);
    if (err.message.includes('Only PDF')) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
