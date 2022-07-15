const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { registerForm, registerNewUser, loginForm, loginUser,logoutUser } = require('../controllers/auth');



// router.get('/fakeuser', async(req, res) => {

//     const user = {
//         email : 'utkarsh@gmail.com',
//         username : 'utkarsh'
//     }

//     const newUser  = await User.register(user, 'sabeel123');
//     res.send(newUser);
// });
router.route('/register')
    .get(registerForm)
    .post(registerNewUser);

router.route('/login')
    .get(loginForm)
    .post(passport.authenticate('local', {//this middleware inturn call the User.authenticate method provided inside local strategy
        failureRedirect : '/login',
        failureFlash : true,
        keepSessionInfo : true
    }), loginUser);

router.get('/logout', logoutUser);

module.exports = router;