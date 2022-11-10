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





router.post('/admin/user/postnews', allController.upPost);

router.get('/admin/user/ass_teer', allController.teerDashboard);

//Teer Details//
router.get('/teer/result/2022/:id', allController.teerDetails);

router.post('/admin/user/teerupload', allController.teerUpload);


router.get('/teer/result/today/', allController.teerCategory);

router.get('/admin/user/teer/counter/edit/teer/:id', allController.counterPage);

router.post('/admin/user/teercounterupdate', allController.counterUp);


router.get('/en/in/404', allController.erPage);





//----- Kokborok Dictionary --//
//router.get('/', allController.indexDictionary);
// router.get('/en/:en', allController.englishWord);
// router.post('/en/dvalid', allController.validDic);

// router.post('/mail/user/subscribe', allController.allSubscriber);
// router.get('/en/in/mailsubscribe', allController.thankYou);





//router.get('/bitch/that/data', allController.authAdmin);
module.exports = router;
