const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const allController = require('../controller/articleController');
const sessions = require('express-session');

// CLIENT SIDE NEWS//
router.get('/', allController.homepages); // HOMEPAGE
router.get('/:cate/:id', allController.newsx); // NEWS PAGE
router.get('/:cat', allController.categoryNews); // CATEGORY PAGE

//ADMIN DASHBOARD PAGE//
router.get('/admin/user/user_login', allController.adminLogin); //ADMIN LOGIN
router.get('/admin/user/addnews', allController.upNews); //ADD NEWS
router.get('/admin/user/newsedit/:id', allController.editNews); //EDIT NEWS
router.get('/admin/user/dashboard', allController.dashBoard); // ADMIN DASHBOARD ALL NEWS//

//ADMIN API/FUNCTION //
router.post('/admin/user/authcheck', allController.authAdmin); //AUTHENTICATION OF ADMIN PANEL LOGIN
router.post('/admin/user/postnews', allController.upPost); // ADD NEWS
router.post('/admin/user/updatenews', allController.updateNews); // EDIT NEWS
router.post('/admin/user/postimage', allController.upImage); // IMAGE UPLOADER


//ADMIN FIRST REGISTER//
router.post('/admin/user/register', allController.resgiterAdmin); // API FOR REGISTER ADMIN
router.get('/admin/user/signup', allController.signupAdmin); // ADMIN REGISTER PAGE

//SUBSCRIBER AND OTHER//
router.get('/en/in/404', allController.erPage); // 404 ERROR PAGE
router.post('/mail/user/subscribe', allController.allSubscriber); // MAIL SUBSCRIBER

module.exports = router;
