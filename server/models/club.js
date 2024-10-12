const mongoose = require('mongoose');
const clubSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    convenor:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    sig: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Sig'
    }],
    exclusive: {
        type: Boolean,
        default: false,
    },
     members: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
   
});
module.exports = mongoose.model('Club', clubSchema);
