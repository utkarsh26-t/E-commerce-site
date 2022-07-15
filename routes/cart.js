const express = require('express');
const { showCart, addToCart, removeFromCart} = require('../controllers/cart');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');
const router = express.Router();

router.get('/cart', isLoggedIn, showCart);

router.post('/:productid/add', isLoggedIn, addToCart);

router.delete('/:productid/remove', isLoggedIn, removeFromCart);

module.exports = router;
