
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({

  type: {
    type: String,  
  },
  released:{
    type:Boolean,
    default:false
  }
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);
