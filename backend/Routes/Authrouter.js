const router = require('express').Router();
const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginvalidation } = require('../middleware/AuthValidation');


router.post('/login',loginvalidation,login)
router.post('/signup',signupValidation,signup)

module.exports=router;
