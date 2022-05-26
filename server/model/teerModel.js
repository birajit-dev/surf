const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const teerdatabase = new mongoose.Schema({
    teer_id:{
        type: Number,
    },
    teer_name:{
        type:String
    },
    teer_permalink:{
        type:String
    },
    teer_content:{
        type:String
    },
    teer_description:{
        type:String
    },
    teer_keyword:{
        type:String
    },
    teer_tags:{
        type:String
    },
    teer_category:{
        type:String
    },
    teer_date:{
        type:String
    }
});


teerdatabase.plugin(AutoIncrement, {id:'teer_seq',inc_field: 'teer_id'});

module.exports = mongoose.model('teernotices', teerdatabase, 'teernotice');