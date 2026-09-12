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
    res.status(201).render('store/favourite-list', {registeredhomes : registeredhomes,  pageTitle : 'airbnb Home'});
    });
}