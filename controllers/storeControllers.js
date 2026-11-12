const Home = require('../models/home');
const User = require('../models/user');
// const Favourite = require('../models/favourite')

exports.getIndex = (req, res) => {
    // console.log("Session Values : ", req.session, req.session.isLoggedIn);
    Home.find().then(registeredhomes => {
        res.status(201).render('store/index', { registeredhomes: registeredhomes, pageTitle: 'airbnb',isLoggedIn : req.isLoggedIn , user: req.session.user});
    });
}

exports.getHomes = (req, res) => {
     Home.find().then(registeredhomes => {
        res.status(201).render('store/home-list', { registeredhomes: registeredhomes, pageTitle: 'airbnb Home',isLoggedIn : req.isLoggedIn, user: req.session.user});
    });
}


exports.getbookings = (req, res) => {
    res.status(201).render('store/bookings', { pageTitle: 'My Bookings',isLoggedIn : req.isLoggedIn, user: req.session.user });
}

exports.getfavourites = async(req, res) => {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites')
    res.status(201).render('store/favourite-list', { favouriteHomes: user.favourites, pageTitle: 'My Favourites',isLoggedIn : req.isLoggedIn, user: req.session.user });
        
}

exports.postfavouriteshome = async(req, res) => {
    // console.log("Home Come from : ", req.body);
    const homeId = req.body.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if (!user.favourites.includes(homeId)) {
       user.favourites.push(homeId);
       await user.save();
    }
    res.redirect("/favourites");
}

exports.postremovefromfavourites = async(req, res) => {
    const homeId = req.params.homeId;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if (user.favourites.includes(homeId)) {
       user.favourites = user.favourites.filter(fav => fav != homeId);
       await user.save();
    }
    res.redirect("/favourites");
}

exports.getHomedetails = (req, res) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
        if (!home) {
            console.log("Home No Found");
            res.redirect('/homes');
        }
        // console.log("Home Details: ", home);
        else {
            res.status(201).render('store/home-detail', { pageTitle: 'Home Details Page', home: home,isLoggedIn : req.isLoggedIn, user : req.session.user});
            console.log("Current House with Id: ", homeId);
        }
    })
}
