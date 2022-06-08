const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const englishModel = new mongoose.Schema({
    kokborok_word:{
        type: String,
    },
    part_of_speech:{
        type:String
    },
    english_word:{
        type:String
    },
    pronounc:{
        type:String
    }
});


module.exports = mongoose.model('dictionary', englishModel, 'dictionary');