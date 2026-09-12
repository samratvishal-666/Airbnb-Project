const Home = require('../models/home');

exports.getAddhome = (req, res)=>{
    res.status(201).render('host/homeadd', {pageTitle : 'airbnb add Home'});
}

exports.postAddhome = (req, res)=>{
    // console.log("Home Added Successfully: ", req.body);
    const {houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();
    res.status(201).render('host/homeaddedsuccess', {pageTitle : 'Homeadded Success'});
}
