const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    namaBank: {
        type: String,
        required: true
    },
    nomorRekening: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bank', bankSchema);