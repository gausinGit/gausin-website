const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['contact_page', 'product_sidebar'],
    required: true,
  },
  product: {
    type: String,
    default: null, // filled for product sidebar inquiries
  },
  firstName:  { type: String, trim: true },
  lastName:   { type: String, trim: true },
  name:       { type: String, trim: true }, // used by sidebar (single name field)
  email:      { type: String, required: true, trim: true, lowercase: true },
  phone:      { type: String, trim: true },
  company:    { type: String, trim: true },
  capacity:   { type: String, trim: true },
  message:    { type: String, trim: true },

  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new',
  },
  adminNote: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
