
const { expression } = require('joi');
const Product = require('./models/product');
const { productSchema, reviewSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.originalUrl);//previous page url, useful for going to requested page after logging in
    
    // console.log(req.returnUrl);
    // console.log(req.xhr);// return true for ajax request
   

    if(req.xhr && !req.isAuthenticated()){

        //this if condition is not necessary, just in case
        if(req.session.returnUrl){
            delete req.session.returnUrl;
        }
        return res.status(401).json({msg : 'You need to login first'});
    }
   
    req.session.returnUrl = req.originalUrl;

    if(!req.isAuthenticated()){
            
        req.flash('error', 'You need to login first to do that !!');
        return res.redirect('/login');
 
    }

    next();
    
};


module.exports.validateProduct = (req, res, next) => {
    const { name, price, img, desc } = req.body;

    const { error } = productSchema.validate({ name, price, img, desc });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        console.log(msg);
        return res.render('error', { err: msg });
    }
    next();
}


module.exports.validateReview = (req, res, next) => {

    const { rating, comment } = req.body;

    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {

        const msg = error.details.map((err) => err.message).join(',');
        // console.log(msg);
        return res.render('error', { err: msg });
    }
    next();
}

module.exports.isSeller = (req, res, next) => {

    if(!(req.user.role && req.user.role === 'seller')){
        req.flash('error', 'You are not having permissions to do that!!!');
        return res.redirect('/products');
    }
    next();
}

module.exports.isProductAuthor = async(req, res, next) => {

    //Getting a product id
    const {id} = req.params;

    const product = await Product.findById(id);

    if(!product.author.equals(req.user._id)){
        req.flash('error', 'You dont have permissions to do that!!!');
        return res.redirect(`/products/${id}`);
    }

    next();
}
