const Review = require('../models/review');
const Product = require('../models/product');


module.exports.createReview = async (req, res) => {

    try {

        //    console.log(req.body);

        //    res.send("Review Route");

        const { productId } = req.params;
        const { rating, comment } = req.body;

        const product = await Product.findById(productId);
        const review = new Review({ rating, comment });

        // Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews.push(review);//internally mongoDb will automatically extract object id from it

        await review.save();
        await product.save();
        req.flash('success', 'Review added successfully!');
        res.redirect(`/products/${productId}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }

};