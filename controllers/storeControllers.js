const Home = require('../models/home');
const Favourite = require('../models/favourite')

exports.getIndex = (req, res) => {
    // console.log("Session Values : ", req.session, req.session.isLoggedIn);
    Home.find().then(registeredhomes => {
        res.status(201).render('store/index', { registeredhomes: registeredhomes, pageTitle: 'airbnb',isLoggedIn : req.isLoggedIn });
    });
}

exports.getHomes = (req, res) => {
     Home.find().then(registeredhomes => {
        res.status(201).render('store/home-list', { registeredhomes: registeredhomes, pageTitle: 'airbnb Home',isLoggedIn : req.isLoggedIn});
    });
}


exports.getbookings = (req, res) => {
    res.status(201).render('store/bookings', { pageTitle: 'My Bookings',isLoggedIn : req.isLoggedIn });
}

exports.getfavourites = (req, res) => {
    Favourite.find()
    .populate('homeId')
    .then((favourites) => {
        const favouriteHomes = favourites.map(fav=> fav.homeId);
            res.status(201).render('store/favourite-list', { favouriteHomes: favouriteHomes, pageTitle: 'My Favourites',isLoggedIn : req.isLoggedIn });
        });
}

exports.postfavouriteshome = (req, res) => {
    // console.log("Home Come from : ", req.body);
    const homeId = req.body.id;
    Favourite.findOne({homeId : homeId}).then((fav)=>{
        if(fav){
            console.log("Already Marked as Favourites");
        }
        else{
            fav = new Favourite({homeId : homeId});
            fav.save().then(result=>{
                console.log("Favourite home added", result);
            })
        }
        res.redirect('/favourites');
    }).catch(err=>{
        console.log("Error while favourite homes");
    })
}

exports.postremovefromfavourites = (req, res) => {
    const homeId = req.params.homeId;
    Favourite.findOneAndDelete({homeId : homeId}).then(result =>{
        console.log("Home Removed From Favourites",result);
    }).catch(err=>{
        console.log("Error while removing home", err);

    }).finally(()=>{
        res.redirect('/favourites');

    })
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
            res.status(201).render('store/home-detail', { pageTitle: 'Home Details Page', home: home,isLoggedIn : req.isLoggedIn});
            console.log("Current House with Id: ", homeId);
        }
    })
}
