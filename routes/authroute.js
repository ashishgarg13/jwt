const { Router } = require('express');
const authController = require('../controllers/auth');
const bookController = require('../controllers/bookcontrol');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
// router.get('/author/:id/createbook', bookController.createbook_get);
// router.post('/author/:id/createbook', bookController.createbook_post);
// router.get('/createauthor', bookController.createauthor_get);
// router.post('/createauthor', bookController.createauthor_post);
router.get('/author/:id', bookController.displayBook);
router.get('/', bookController.getauthor);
router.get('/products/:id', bookController.oneBook);

module.exports = router;
