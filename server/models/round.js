const mongoose = require('mongoose');
const roundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true 
    },
    type: {
        type: String,
        required: true
    },
    roundStart:
    {
        type: Date,

    },
    roundEnd:
    {
        type: Date,

    },
    test:
    {
        type: String
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    cleared:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
  sig:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Sig'
  }
});
module.exports = mongoose.model('Round', roundSchema);
