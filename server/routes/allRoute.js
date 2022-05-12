const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const allController = require('../controller/articleController');
const sessions = require('express-session');


router.get('/', allController.homepages);
router.get('/:cate/:id', allController.newsx);
router.get('/:cat', allController.categoryNews);
router.get('/admin/user/pussyedit/:id', allController.editNews);
router.post('/admin/user/updatefuckingnews', allController.updateFuckingNews);
//router.get('/test.html', allController.hellYeah);

router.get('/admin/user/ass_login', allController.adminLogin);

router.post('/admin/user/authcheck', allController.authAdmin);

//Register Page//
router.get('/admin/user/signup', allController.signupAdmin);

//Register Checker
router.post('/admin/user/register', allController.resgiterAdmin);

//Dashboard on Session

router.get('/admin/user/dashboard', allController.dashBoard);

router.get('/admin/user/fucknews', allController.upNews);

router.get('/admin/user/allmedia', allController.mediaAdmin);

router.post('/admin/user/postimage', allController.upImage);

router.get('/admin/user/uploadx', allController.fileImage);

router.get('/admin/user/subscriber', allController.mailPage);

router.post('/admin/user/follower', allController.allSubscriber);

router.post('/admin/user/postnews', allController.upPost);

router.get('/en/in/404', allController.erPage);




//router.get('/bitch/that/data', allController.authAdmin);
module.exports = router;
