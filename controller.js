var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var userModel = require('../models/userModel');


var userSchema = new mongoose.Schema({
    post_name: String,
    post_content:String
});
var userModel=mongoose.model('news_list',userSchema);
//module.exports = mongoose.model("news_list", userModel);
 
/* GET home page. */
router.get('/', function(req, res, next) {
      
    userModel.find((err, docs) => {
        if (!err) {
            res.render("partials/first-head", {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
 
});
module.exports = router;