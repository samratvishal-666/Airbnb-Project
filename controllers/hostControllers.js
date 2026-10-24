const Home = require('../models/home');

exports.getAddhome = (req, res) => {
    res.status(201).render('host/edithome', { pageTitle: 'airbnb add Home', editing: false, isLoggedIn : req.isLoggedIn
 });
}

exports.gethosthomes = (req, res) => {
    Home.find().then(registeredhomes => {
        res.status(201).render('host/hosthomelist', { registeredhomes: registeredhomes, pageTitle: 'Host Home List', isLoggedIn : req.isLoggedIn
 });
    });
}

exports.postAddhome = (req, res) => {
    // console.log("Home Added Successfully: ", req.body);
    const { houseName, price, location, rating, photoUrl, description } = req.body;
    const home = new Home({houseName, price, location, rating, photoUrl, description});
    home.save().then(()=>{
        console.log("Home Added Successfully");
    });
    res.status(201).redirect('/host/homelist');
}

exports.getEdithome = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(home => {
        if (!home) {
            console.log("Home is Not Found");
            return res.redirect('/host/homelist');
        }
        console.log(homeId, editing, home);
        res.status(201).render('host/edithome', { home: home, pageTitle: 'edit your airbnb home', editing: editing , isLoggedIn : req.isLoggedIn});
    })
}

exports.postEdithome = (req, res) => {
    // console.log("Home Added Successfully: ", req.body);
    const { id, houseName, price, location, rating, photoUrl, description} = req.body;
    Home.findById(id).then((home)=>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.photoUrl = photoUrl;
        home.description = description;
        home.save().then((result)=>{
            console.log("Home Edited Successfully", result);
        }).catch(err=>{
            console.log("Error while editing Home", err);
        })
        res.status(201).redirect('/host/homelist');
    }).catch(err=>{
        console.log("Error while finding home", err);
    })
}

exports.postdeletehome = (req, res) => {
    const homeId = req.params.homeId;
    Home.findByIdAndDelete(homeId).then(()=>{
        res.status(302).redirect('/host/homelist');
    }).catch(error=>{
        console.log("Error While Deleting", error);
    })
}

