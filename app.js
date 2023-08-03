if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const MongoStore = require('connect-mongo');


//Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/order');

// APIs
const productApis = require('./routes/api/productapi');
const { NONAME } = require('dns');

const dbUrl = process.env.dbUrl || 'mongodb://localhost:27017/shopping-app';

mongoose.connect(dbUrl)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);



const secret = process.env.SECRET || 'weneedsomebettersecret';

const store = MongoStore.create({
    secret: secret,
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60 // time period in seconds, If you are using express-session and don't want to resave all the session on database every single time that the user refreshes the page, you can lazy update the session, by limiting a period of time.
})

const sessionConfig = {
    store,
    name: 'session', //changed name of connect.sid to fool hacker
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 1,//we are setting 1 week time for expiration of cookie
        maxAge: 1000 * 60 * 60 * 24 * 7 * 1
        //we can give either maxAge or expires
    }
};
app.use(session(sessionConfig));
app.use(flash());




//Initializing middleware for passport
app.use(passport.initialize());
app.use(passport.session());





//Telling the passport to check for username and password using authenticate method provided by the passport local mongoose package
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {

    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
});


app.use('/products',productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use('/product',productApis);
app.use('/user',cartRoutes);
app.use(paymentRoutes);
app.use(orderRoutes);



// seedDB();

app.all('*', (req, res) => {
   
    res.render('error', { err: 'You are requesting a wrong url!!!' })
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})


