const router      = require('express').Router();
const bcrypt      = require('bcryptjs');
const jwt         = require('jsonwebtoken');
const rateLimit   = require('express-rate-limit');
const path        = require('path');
const Inquiry     = require('../models/Inquiry');
const Application = require('../models/Application');
const adminAuth   = require('../middleware/adminAuth');

const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

// ── POST /api/admin/login ─────────────────────────────────────────────────────
router.post('/login', loginLimit, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      !bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH)
    ) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── POST /api/admin/register ─────────────────────────────────────────────────
router.post('/register', loginLimit, async (req, res) => {
  try {
    const { username, password, confirmPassword, setupKey } = req.body;

    if (!username || !password || !setupKey)
      return res.status(400).json({ success: false, message: 'All fields are required.' });

    if (setupKey !== process.env.ADMIN_SETUP_KEY)
      return res.status(403).json({ success: false, message: 'Invalid Setup Key.' });

    if (password !== confirmPassword)
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });

    if (password.length < 8)
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });

    const hash = bcrypt.hashSync(password, 10);

    // Return the new credentials to be saved in .env manually
    // (for security, we don't auto-write to .env on server)
    res.json({
      success: true,
      message: 'Account created successfully! Save these details.',
      username,
      passwordHash: hash,
    });
  } catch (err) {
    console.error('Admin register error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── All routes below require admin JWT ───────────────────────────────────────

// GET /api/admin/inquiries
router.get('/inquiries', adminAuth, async (req, res) => {
  try {
    const { status, source, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Inquiry.countDocuments(filter),
    ]);

    res.json({ success: true, data: inquiries, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/inquiries/:id  — update status or add note
router.patch('/inquiries/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const update = {};
    if (status)    update.status    = status;
    if (adminNote !== undefined) update.adminNote = adminNote;

    const doc = await Inquiry.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/applications
router.get('/applications', adminAuth, async (req, res) => {
  try {
    const { status, role, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (role)   filter.role   = new RegExp(role, 'i');

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Application.countDocuments(filter),
    ]);

    res.json({ success: true, data: applications, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/applications/:id
router.patch('/applications/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const update = {};
    if (status)    update.status    = status;
    if (adminNote !== undefined) update.adminNote = adminNote;

    const doc = await Application.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [
      totalInquiries, newInquiries,
      totalApplications, newApplications,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'new' }),
    ]);

    res.json({
      success: true,
      data: { totalInquiries, newInquiries, totalApplications, newApplications },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
