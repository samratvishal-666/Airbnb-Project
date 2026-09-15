const Home = require('../models/home');

exports.getIndex = (req, res)=>{
    Home.fetchAll((registeredhomes)=>{
    res.status(201).render('store/index', {registeredhomes : registeredhomes,  pageTitle : 'airbnb'});
    });
}

exports.getHomes = (req, res)=>{
    Home.fetchAll((registeredhomes)=>{
    res.status(201).render('store/home-list', {registeredhomes : registeredhomes,  pageTitle : 'airbnb Home'});
    });
}


exports.getbookings = (req, res)=>{
    res.status(201).render('store/bookings', {pageTitle : 'My Bookings'});
}

exports.getfavourites = (req, res)=>{
    Home.fetchAll((registeredhomes)=>{
    res.status(201).render('store/favourite-list', {registeredhomes : registeredhomes,  pageTitle : 'My Favourites'});
    });
}

exports.getHomedetails = (req, res)=>{
    const homeId = req.params.homeId;
    Home.findById(homeId, home=>{
        if(!home){
            console.log("Home No Found");
            res.redirect('/homes');
        }
        // console.log("Home Details: ", home);
        else{
            res.status(201).render('store/home-detail', {pageTitle : 'Home Details Page'});
            console.log("Current House with Id: ", homeId);
        }
    })
}