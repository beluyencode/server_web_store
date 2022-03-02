const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');
const veryfyToken = require('../middleware/verify');
const verifyChangePassword = require('../middleware/verifyChangePassword');

router.post('/getCart', veryfyToken, User.getCart);
router.post('/removeProductFromCart', veryfyToken, User.removeProductFromCart);
router.post('/', veryfyToken, User.getUser);
router.post('/login', User.login);
router.post('/signin', User.signin);
router.post('/addProductToCart', veryfyToken, User.addProductToCart);
router.post('/order', veryfyToken, User.order);
router.post('/getOrder', veryfyToken, User.getOrder);
router.post("/forgetPassword", User.forgetPassword);
router.post("/verifyCode", User.verifyCode);
router.post("/changePassword", verifyChangePassword, User.changePassword);

module.exports = router;