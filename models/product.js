const mongoose = require('mongoose');
const Review = require('./review');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true,
        default: '/images/product.jpg'
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    desc: {
        type: String,
        trim: true
    },
    avgRating: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// productSchema.pre('findOneAndDelete', async (data) => {
//     console.log('Pre Middleware function');
//     console.log(data);
// });


//Mongoose middleware to delete all the associated reviews of to be deleted product
productSchema.post('findOneAndDelete', async (product) => {
    // console.log('Post middleware function');
    // console.log(data);

    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } });
    }

});


const Product = mongoose.model('Product', productSchema);


module.exports = Product;