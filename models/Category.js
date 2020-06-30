const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);