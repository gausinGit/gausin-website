const path = require('path');
// Load .env from project root first, then backend/ as fallback
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config(); // fallback: backend/.env
const express = require('express');
const serveStatic = require('serve-static'); // v1 — stable static file serving
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Render / reverse-proxy — required for rate-limit + real client IP
app.set('trust proxy', 1);

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    // Also allow 'null' origin which comes from file:// protocol
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*') || allowedOrigins.includes('null')) {
      return cb(null, true);
    }
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Serve uploaded resumes ────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Block direct access to backend/ source files ─────────────────────────────
app.use('/backend', (req, res) => res.status(403).end());

// ── Serve frontend static files using serve-static v1 (Express 5 compatible) ─
app.use(serveStatic(path.join(__dirname, '..'), { index: ['index.html'] }));

// ── Global rate limit ─────────────────────────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
}));

// ── MongoDB connection ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB connection error:', err.message); process.exit(1); });

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact',  require('./routes/contact'));
app.use('/api/inquiry',  require('./routes/inquiry'));
app.use('/api/career',   require('./routes/career'));
app.use('/api/admin',    require('./routes/admin'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Gausin API running', timestamp: new Date() });
});

// ── 404 → serve custom 404 page ───────────────────────────────────────────────
app.use((req, res) => {
  // API routes return JSON 404
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found.' });
  }
  // Frontend routes return 404.html
  res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
