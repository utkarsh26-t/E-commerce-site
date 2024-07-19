const User = require('../models/user');
const Product = require('../models/product');

module.exports.showCart=async (req, res) => {


    try{
        const user = await User.findById(req.user._id).populate('cart');
        const totalAmount = user.cart.reduce((acc, curr) => acc + curr.price, 0);
        const productInfo = user.cart.map((p) => p.desc).join(',');
    
        res.render('cart/cart', {user, totalAmount, productInfo});
    }
    catch(e){
        res.status(500).render('error', { err: e.message });
    }
}

module.exports.addToCart=async (req, res) => {

    try{
        const { productid } = req.params;
        const userid = req.user._id;
    
        const product = await Product.findById(productid);
        const user = await User.findById(userid);
    
        user.cart.push(product);
        await user.save();
    
        res.redirect('/user/cart');
    }
    catch(e){
        res.status(500).render('error', { err: e.message });
    }
  
}

module.exports.removeFromCart = async (req, res) => {

    const {productid} = req.params;
    const userid = req.user._id;

    req.user = await User.findByIdAndUpdate(
      userid,
      { ["$pull"]: { cart: productid } },
      { new: true }
    );

    req.flash('success', 'Item has been removed from your saved list');
    res.redirect('/user/cart');
};