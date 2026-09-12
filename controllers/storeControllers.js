const Home = require('../models/home');

exports.getHomes = (req, res)=>{
    Home.fetchAll((registeredhomes)=>{
    res.status(201).render('store/home-list', {registeredhomes : registeredhomes,  pageTitle : 'airbnb Home'});
    });
    // console.log(registeredhomes); 
}

exports.bookings = (req, res)=>{
    res.status(201).render('store/bookings', {pageTitle : 'My Bookings'});
}