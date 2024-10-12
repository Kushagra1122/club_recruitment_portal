const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
    announcement:
    {
        type: String,
       
    },
    sig:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'Sig'
    },
    role:
    {
        type: String,

    },
    name:
    {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Message"
    },
  date:{
    type:Date
  },
  club:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Club'
  }

}, {
    timestamps: true
});
module.exports = mongoose.model('Announcement', announcementSchema);
