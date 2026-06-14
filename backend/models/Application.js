const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  role:       { type: String, required: true, trim: true },
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, trim: true, lowercase: true },
  phone:      { type: String, trim: true },
  experience: { type: String, trim: true },
  coverLetter:{ type: String, trim: true },

  // Resume file details
  resumeFile: {
    originalName: String,
    filename:     String,   // stored filename on disk
    path:         String,   // relative path for download
    mimetype:     String,
    size:         Number,
  },

  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'rejected'],
    default: 'new',
  },
  adminNote: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
