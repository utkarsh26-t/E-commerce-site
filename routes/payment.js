const express = require('express');
const router = express.Router();
const request = require('request');
const jsSHA = require('jssha');
const { v4: uuid } = require('uuid');
const { isLoggedIn } = require('../middleware');
const Order = require('../models/order');
const User = require('../models/user')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get('/payment_gateway/stripe', isLoggedIn, async (req, res) => {
    
    try {
        const userid = req.user._id;
        const user = await User.findById(userid).populate("cart");

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: user.cart.map((item) => {
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
              },
              quantity: 1,
            };
          }),
          success_url:
            "https://rich-gold-vulture-tux.cyclic.app/payment/success",
          cancel_url: "https://rich-gold-vulture-tux.cyclic.app/payment/fail",
        });
        res.redirect(session.url);
    } 
    catch (e) {
        res.status(500).json({ error: e.message })
    }
    
});


router.get('/payment/success', async (req, res) => {

    // Getting the current User 
    const user = req.user;

    // Creating a new order and storing the whole cart into orderedProduct
    const order = new Order({txnid:uuid(), orderedProducts:[...user.cart]})
    
    // Pushing the new order into user's order array
    user.orders.push(order);

    // saving the new order in database
    await order.save();

    // removing everything from current user's cart
    user.cart.splice(0, req.user.cart.length);

    // saving the updated user in the database and assigning updated user to the req.user
    req.user = await user.save();

    req.flash('success', 'Order paced successfully');
    res.redirect('/user/myorders');
});

router.get('/payment/fail', (req, res) => {
    req.flash('error',`Oops! Can't place your order at the moment.Please try again after some time!`)
    res.redirect('/user/cart');
})

module.exports = router;





