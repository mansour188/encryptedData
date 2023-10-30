const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
    encryptedData: {
        iv: String,
        data: String,
      },
      createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Reclamation', reclamationSchema);
