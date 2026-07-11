const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    source: {
        type: String
    },
    status: {
        type: String,
        default: 'New', 
        enum: ['New', 'Contacted',  'Converted'] 
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);