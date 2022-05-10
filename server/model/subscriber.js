const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const followUser = new mongoose.Schema({
    mail_id:{
        type: Number,
    },
    mail_user:{
        type: String,
        required: 'Yes'
    }
});


followUser.plugin(AutoIncrement, {id:'mail_seq',inc_field: 'mail_id'});


module.exports = mongoose.model('allSubscribers', followUser, 'allSubscriber');