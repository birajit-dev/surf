require('../model/database');
const topStories = require('../model/topStories');
const adminData =  require('../model/loginAdmin');
const singleUp = require('../model/imageUp');
const followers = require('../model/subscriber');
const allPost = require('../model/newsUp');
const allKey = require('../model/keywordC');
const teerKey = require('../model/teerModel');
const counterTeer = require('../model/teerUpdate');
const engDic = require('../model/dictionaryModel');

const { request } = require('express');
var express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const multer = require('multer');
const { resolve } = require('path');
const { rejects } = require('assert');
const { all } = require('express/lib/application');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
var rss = require('rss');



const event = new Date();

const options = {  year: 'numeric', month: 'short', day: 'numeric' };

const newDate = event.toLocaleDateString('en-US', options);


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const fuckn = getRandomInt(9999);


/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/allimages/')
    },
    filename: function (req, file, cb) {
        const fuckn = getRandomInt(9999);
      cb(null, fuckn +file.originalname)
    }
  })
   
var upload = multer({ 
    storage: storage }).single('myFile');

*/

const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId:'NE3PLL73DAKV4JCDMIJ6',
  secretAccessKey:'LckPCSCXWERze1XwhvB/GGICWfRcz0WoiYy0LicyYxY'
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nesurf',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, fuckn +file.originalname);
    }
  })
}).single('myFile', 1);

//ImageUp//
exports.upImage = async(req, res) =>{
    upload(req, res, function(err){
        if(err){
            res.send('Fuck You Bitch');
        }else{
            //console.log(req.file);
            res.send('test');
            const file = req.file.filename;
                let savePussy = new singleUp({
                    image_path: file
                });
            savePussy.save();
        }
    });
}

//Subscriber//
exports.allSubscriber = async(req, res) =>{
    const {mail_user} = req.body;
    let allMail = new followers({
        mail_user: mail_user
    });
    await allMail.save();
    res.redirect('/en/in/mailsubscribe');
}

//Thank You//
exports.thankYou = async(req, res)=>{
    res.render('pages/thankyou');
}


exports.homepages = async(req, res) => {
    try{
        //Top News//
        const oneTripura = await allPost.find({post_category:'tripura'}).sort({news_id:-1}).limit('1');
        const oneTrending = await allPost.find({post_topic:'trending'}).sort({news_id:-1}).limit('3');
        const oneNational = await allPost.find({post_category:'national'}).sort({news_id:-1}).limit('4');

        //Editor Pick//̀
        const editorPick = await allPost.find({post_editor:'yes'}).sort({news_id:-1}).limit('1');

        //Tripura News//
        const tripuraNews = await allPost.find({post_category:'tripura'}).sort({news_id:-1}).skip(1).limit('6');

        //Surf Insight//
        const surfInsight = await allPost.find({ne_insight:'yes'}).sort({news_id:-1}).limit('2');

        //Business//
        const headlineNow = await allPost.find({post_category:'business'}).sort({news_id:-1}).limit('4');

        //Moset Recent//
        const recentNews = await allPost.find({}).sort({news_id:-1}).limit('15');

        //Internationa//
        const internationalNews = await allPost.find({post_category:'international'}).sort({news_id:-1}).limit('10');

        res.render('pages/index',{title:'North East Surf', oneTripura,oneTrending,oneNational,editorPick,tripuraNews,surfInsight,headlineNow,recentNews,internationalNews});
    }
    catch{
        res.status(500).send({message: error.message || "Error in Homepage"});
    }
}

exports.newsx = async(req, res) =>{
    try{
        let nUrl = req.params.id;
        let catD = req.params.cate;
        const newsUrl = await allPost.findOne({post_category:catD,post_url:nUrl});
        const rNews = await allPost.find({}).sort({news_id:-1}).limit('3');
        res.render('pages/details',{newsUrl,rNews});

    }
    catch{
        res.status(500).send({message: error.message || "Error in Homepage"});
    }
}


exports.mailCapmgpain = async(req, res) =>{
    
}

exports.categoryNews = async(req, res) => {
    try{
    let catName = req.params.cat;
    const catFetch = await allPost.find({post_category:catName}).sort({news_id:-1});
    const pk = await allKey.findOne({page_category:catName});
    res.render('pages/category',{title:'North East Surf', catFetch,catName,pk});
    }
    catch{

    }
}








//----------------------------ADMIN AREA----------------------------------------------------------------//

//User Login Session//
exports.adminLogin = async(req, res) => {
    try{
        res.render('pages/fuckingpanel/login');
    }
    catch{
        
    }
}


//handle auth::
exports.authAdmin = async(req, res) => {
    const { username, password } = req.body;
    const user = await adminData.findOne({username});
    if(!user){
        return res.redirect('/fuckingdick');
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if(!matchPass){
        return res.send("alert('Password does not match motherfucker')");
    }else{
        var sex = req.session;
        sex.userid = username;
        //req.session.authA = username;
        //var fuckingA = req.session.authA;
        //session.userid=user.username;
        res.redirect('/admin/user/fucknews');
    }
}

//Session Checker Page Demo//
exports.dashBoard = async(req, res) => {
    sex=req.session;
    if(!sex.userid){
        res.redirect('/admin/user/panel_login');
    }
    else{
        res.render('pages/fuckingpanel/dashboard');
    }
}


//Register Bcrypt Password for Admin Panel
exports.resgiterAdmin = async(req, res) =>{
    const {username, password} = req.body;
    const hashPass = await bcrypt.hash(password, 12);
    let user = new adminData({
        username,
        password: hashPass
    });
    await user.save();
    res.redirect('/fuck_register');
}

//Sign Up Page//
exports.signupAdmin = async(req, res) => {
    res.render('pages/fuckingpanel/register');
}


//Add News & Image//
exports.upNews = async(req, res) => {
    sex = req.session;
    if(!sex.userid){
        res.redirect('/admin/user/panel_login');
    }
    else{
        //const {postname, postsummary, content, keyword, metatags, category, type, topic, topstory, videourl, } = req.body;
        res.render('pages/fuckingpanel/addnews');
    }
}

//GALLERY MANAGEMENT//
exports.mediaAdmin = async(req, res) => {
    sex = req.session;
    if(!sex.userid){
        res.redirect('/admin/user/panel_login');
    }else{
        res.render('pages/fuckingpanel/media');
    }
}


//Upload News Post Method//
exports.upPost = async(req, res)=>{
    upload(req, res, function(err){
        if(err){
            res.send('Fuck You Bitch');
        }else{
            //console.log(req.file);
            const filex = req.file.originalname;
            const nFile = fuckn +filex;
            const urlp = "https://media.northeastsurf.com/";
            const aFile = urlp +nFile;

            const {name, url, summary, mytextarea, keyword, description, category, tags, topics, editor, insight, author } = req.body;
            let upallNews = new allPost({
                post_name: name,
                post_url: url,
                post_summary: summary,
                post_content:mytextarea,
                post_keyword:keyword,
                meta_description:description,
                post_category:category,
                post_image:aFile,
                meta_tags:tags,
                post_topic:topics,
                post_editor:editor,
                ne_insight:insight,
                author:author,
                update_date:newDate
            });
            upallNews.save();
            res.send('test');
        }
    });    
}

exports.editNews = async(req, res)=>{
    try{
        let newsId = req.params.id;
        const newsE = await allPost.findOne({news_id:newsId});
        res.render('pages/fuckingpanel/editnews',{newsE});
    }
    catch{
        res.status(500).send({message: error.message || "Error in Homepage"});
    }
}

exports.updateFuckingNews = async(req, res)=>{
    //const file = req.file.filename;
    const {id, name, url, summary, mytextarea, keyword, description, category, tags, topics, editor, insight, author } = req.body;
    /*
    db.inventory.updateOne(
    { "item" : "paper" }, // specifies the document to update
    {
      $set: {  "size.uom" : "cm",  "status" : "P" },
      $currentDate: { "lastModified": true }
    }
    )
    */
    allPost.findByIdAndUpdate(id, 
        {   post_name: name,
            post_url: url,
            post_summary: summary,
            post_content:mytextarea,
            post_keyword:keyword,
            meta_description:description,
            post_category:category,
            meta_tags:tags,
            post_topic:topics,
            post_editor:editor,
            ne_insight:insight,
            author:author,
            update_date:newDate
        }, function(err, data) {
        if(err){
            res.send('Lui Thor d Gada.');
        }
        else{
            res.send('samwng cakha gada.');
        }
        });
}

exports.erPage = async(req, res)=>{
    res.render('pages/error');
}


//--------------------------- RSS Feed ---------------------//
    
exports.kokDictionary = async(req, res)=>{
    res.render('pages/kokborok');
}


//Result Update Post Method//
exports.teerUpload  = async(req, res)=>{

            const {teer_name, url, mytextarea, teer_description, teer_keyword, teer_tags, teer_category} = req.body;
            let teerUp = new teerKey({
                teer_name: teer_name,
                teer_permalink: url,
                teer_content: mytextarea,
                teer_description: teer_description,
                teer_keyword:teer_keyword,
                teer_tags:teer_tags,
                teer_category:teer_category,
                teer_date:newDate,
            });
            await teerUp.save();
            res.send('Teer Result Update');
}

exports.teerDashboard = async(req, res)=>{
    sex = req.session;
    if(!sex.userid){
        res.redirect('/admin/user/ass_login');
    }else{
        res.render('pages/fuckingpanel/teerdashboard');
    }   
}
exports.teerDetails = async(req, res)=>{
    try{
        let nUrl = req.params.id;
        const teerdata = await teerKey.findOne({teer_permalink:nUrl});
        const teerRelated = await teerKey.find({}).sort({teer_id:-1}).limit('3');
        res.render('pages/teerdetails',{teerdata,teerRelated});

    }
    catch{
        res.status(500).send({message: error.message || "Error in Homepage"});
    }
}
exports.teerCategory = async(req, res)=>{
    try{
        const tcFetch = await teerKey.find({}).sort({teer_id:-1});
        const resultDay = await counterTeer.findOne({counter_id:1});
        res.render('pages/teercategory',{title:'North East Surf', tcFetch, resultDay});
        }
        catch{
            
        }
}


exports.counterUp = async(req, res)=>{
    const {id,counter_date, shillong_first, shillong_second, khanapara_first, khanapara_second} = req.body;
    counterTeer.findByIdAndUpdate(id,{
        counter_date: counter_date,
        shillong_first: shillong_first,
        shillong_second: shillong_second,
        khanapara_first: khanapara_first,
        khanapara_second: khanapara_second
    }, function(err, data){
        if(err){
            res.send('Something Went Wrong');
        }
        else{
            res.redirect('/admin/user/teer/counter/edit/teer/1');
        }
    });
}


exports.counterPage = async(req, res)=>{
        let counterId = req.params.id;
        const cdT = await counterTeer.findOne({counter_id:counterId});
        res.render('pages/fuckingpanel/counterupdate',{cdT});
}



exports.englishWord = async(req, res)=>{
        try{
        let enName = req.params.en;
        const dicR = await engDic.findOne({english_word:enName});
        res.render('pages/kokborok',{title:'English to Kokborok Dictionary: Northeast Surf', dicR});
        }
        catch{
    
        }   
}

exports.validDic = async(req, res)=>{
    const {engword} = req.body;
    res.redirect('/en/'+ engword +'');
}

exports.indexDictionary = async(req, res)=>{
    res.render('pages/englishdictionary');
}