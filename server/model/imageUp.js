const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const mediaUp = new mongoose.Schema({
    image_id:{
        type: Number,
    },
    image_path:{
        type: String,
        required: 'Yes'
    }
});


mediaUp.plugin(AutoIncrement, {id:'image_seq',inc_field: 'image_id'});


module.exports = mongoose.model('mediaImages', mediaUp, 'mediaImage');