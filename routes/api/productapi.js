const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/user');


router.post('/:productId/like', isLoggedIn, async (req, res) => {

    const { productId } = req.params;

    //grabbing the currently loggedin user
    const user = req.user;

    const isLiked = user.wishList.includes(productId);
    const option = isLiked ? '$pull' : '$addToSet';

    req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productId } }, { new: true });


    console.log(isLiked);
    res.send('LIKE API');
})













module.exports = router;