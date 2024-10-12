const mongoose = require('mongoose');
const sigSchema = new mongoose.Schema({
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
    sigHead:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
 club:{
     type: mongoose.Schema.Types.ObjectId, ref: 'Club'
 },
    rounds: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Round'
    }],
    recruiting: {
        type: Boolean,
        default: false,
    },
    Start: {
        type: Date,
        default: ""
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    member: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    waitlist: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
});
module.exports = mongoose.model('Sig', sigSchema);
