const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    if (req.user) {
        return res.redirect('/products');
    }
    res.render('auth/signup');
}

module.exports.registerNewUser = async(req, res) => {

    try{
        const {username, email, password, role, phone} = req.body;

        const user = new User({username, email, role, phone});
    
        const newUser = await User.register(user, password);
    
        // if we want to login automatically after registering
        req.login(newUser, (err) => {
            if(err) return next(err);
    
            req.flash('success', 'Welcome,You are registered successfully!');
            return res.redirect('/products');
        });
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.loginForm = (req, res) => {

    // Check whether the user is already logged in or not
    if (req.user) {
        return res.redirect('/products');
    }
    res.render('auth/login');
};

module.exports.loginUser = (req, res) => {

    // // console.log(req.user);//we get logged in user details
    
    req.flash('success', `Welcome Back ${req.user.username} !!!`);
    
    let redirectUrl = req.session.returnUrl || '/products';
    
    
    
    // Removing review string from the url -> e.g = '/products/61a0dcdca41c19fe6bce6e02/review'
    // So that we can redirect to show page to add the review again!!
    if (redirectUrl && redirectUrl.indexOf('review') !== -1) {
        redirectUrl = redirectUrl.split('/');
        redirectUrl.pop();
        redirectUrl = redirectUrl.join('/');
    }
    
    delete req.session.returnUrl; 
    res.redirect(redirectUrl); 
    // console.log("Logged In Succesfully"); 
    // res.redirect('/products');        
}

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if(err) return next(err);

        //if error does not occur
        // if you're using express-flash
        req.flash('success', 'GoodBye!!');
        res.redirect('/products');
    }, {keepSessionInfo : true});
};


