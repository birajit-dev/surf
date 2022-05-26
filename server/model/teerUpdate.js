const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const counterUpdate = new mongoose.Schema({
    counter_id:{
        type: Number,
    },
    counter_date:{
        type:String
    },
    shillong_first:{
        type:String
    },
    shillong_second:{
        type:String
    },
    khanapara_first:{
        type:String
    },
    khanapara_second:{
        type:String
    }
});


counterUpdate.plugin(AutoIncrement, {id:'counter_seq',inc_field: 'counter_id'});

module.exports = mongoose.model('teercounter', counterUpdate, 'teercounter');