const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  parkId: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  description: { type: String, required: true },
  allowOthersToJoin: { type: Boolean, default: false },
  additionalDetails: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Reservations', reservationSchema);