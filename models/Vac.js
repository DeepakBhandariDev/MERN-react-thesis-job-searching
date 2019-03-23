const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VacSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vac = mongoose.model('vac', VacSchema);
