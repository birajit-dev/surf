require('../model/database');
const topStories = require('../model/topStories');
const adminData =  require('../model/loginAdmin');
const singleUp = require('../model/imageUp');
const followers = require('../model/subscriber');
const allPost = require('../model/newsUp');
const allKey = require('../model/keywordC');
const { request } = require('express');
var express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const multer = require('multer');
const { resolve } = require('path');
const { rejects } = require('assert');
const { all } = require('express/lib/application');
var rss = require('rss');

const event = new Date();
const options = {  year: 'numeric', month: 'short', day: 'numeric' };
const newDate = event.toLocaleDateString('en-US', options);

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    const ranDom = getRandomInt(9999);

    //HOMEPAGE CLIENT SIDE RENDER//
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

    // NEWS DETAILS//
    exports.newsx = async(req, res) =>{
        try{
            let nUrl = req.params.id;
            let catD = req.params.cate;
            const newsUrl = await allPost.findOne({post_category:catD,post_url:nUrl});
            const rNews = await allPost.find({}).sort({news_id:-1}).limit('3');
            res.render('pages/details',{newsUrl,rNews});
        }
        catch{
            res.status(500).send({message: error.message || "Error in News Details"});
        }
    }

    //CATEGORY PAGE//
    exports.categoryNews = async(req, res) => {
        try{
        let catName = req.params.cat;
        const catFetch = await allPost.find({post_category:catName}).sort({news_id:-1});
        const pk = await allKey.findOne({page_category:catName});
        res.render('pages/category',{title:'North East Surf', catFetch,catName,pk});
        }
        catch{
            res.status(500).send({message: error.message || "Error in Category Page"});
        }
    }




    //ADMIN RENDER PAGE//
    exports.thankYou = async(req, res)=>{
        res.render('pages/thankyou');
    }
    exports.signupAdmin = async(req, res) => {
        res.render('pages/adminpanel/register');
    }
    exports.erPage = async(req, res)=>{
        res.render('pages/error');
    }
    exports.adminLogin = async(req, res) => {
        res.render('pages/adminpanel/login');
    }
    exports.upNews = async(req, res) => {
        adminSession = req.session;
        if(!adminSession.userid){
            res.redirect('/admin/user/panel_login');
        }
        else{
            
            res.render('pages/adminpanel/addnews');
        }
    }  


    exports.dashBoard = async(req, res) => {
        adminSession=req.session;
        if(!adminSession.userid){
            res.redirect('/admin/user/panel_login');
        }
        else{
            const dashAllNews = await allPost.find({}).sort({news_id:-1});
            res.render('pages/adminpanel/dashboard',{title:'North East Surf', dashAllNews,});
        }
    }


    //API FOR ADMIN PANEL
    exports.resgiterAdmin = async(req, res) =>{
        const {username, password} = req.body;
        const hashPass = await bcrypt.hash(password, 12);
        let user = new adminData({
            username,
            password: hashPass
        });
        await user.save();
        res.redirect('/register_admin');
    }
    //HANDLE ADMIN auth::
    exports.authAdmin = async(req, res) => {
        const { username, password } = req.body;
        const user = await adminData.findOne({username});
        if(!user){
            return res.redirect('/error');
        }
        const matchPass = await bcrypt.compare(password, user.password);
        if(!matchPass){
            return res.send("alert('Password does not match motherfucker')");
        }else{
            var adminSession = req.session;
            adminSession.userid = username;
            //req.session.authA = username;
            //var fuckingA = req.session.authA;
            //session.userid=user.username;
            res.redirect('/admin/user/addnews');
        }
    }





















    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, './public/uploads/allimages/')
        },
        filename: function (req, file, cb) {
        cb(null, ranDom +file.originalname)
        }
    })
    
    var upload = multer({ 
        storage: storage }).single('myFile');


    //ImageUp//
    exports.upImage = async(req, res) =>{
        upload(req, res, function(err){
            if(err){
                res.send('Image Can not Upload.');
            }else{
                //console.log(req.file);
                res.send('Image Uploaded.');
                const file = req.file.filename;
                    let saveImage = new singleUp({
                        image_path: file
                    });
                saveImage.save();
            }
        });
    }






    


    




    //Upload News Post Method//
    exports.upPost = async(req, res)=>{
        upload(req, res, function(err){
            if(err){
                res.send('Something Went Wrong');
            }else{
                //console.log(req.file);
                const filex = req.file.originalname;
                const nFile = ranDom +filex;
                const urlp = "";
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
                res.send('News Uploaded Successfully.');
            }
        });    
    }

    exports.editNews = async(req, res)=>{
        try{
            let newsId = req.params.id;
            const newsE = await allPost.findOne({news_id:newsId});
            res.render('pages/adminpanel/editnews',{newsE});
        }
        catch{
            res.status(500).send({message: error.message || "Error in Homepage"});
        }
    }

    exports.updateNews = async(req, res)=>{
    const {id, name, url, summary, mytextarea, keyword, description, category, tags, topics, editor, insight, author } = req.body;
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
            res.send('Something Went Wrong');
        }
        else{
            res.send('News Update Successfully.');
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




















