const Home = require('../models/home');
const fs = require('fs');

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
    const { houseName, price, location, rating, description } = req.body;
    console.log(houseName, price, location, rating, description);
    const photo = req.file.path;
    // console.log(req.file);
    const home = new Home({houseName, price, location, rating, photo, description});
    if(!req.file){
        return res.status(402).send("No Image Provided");
    }


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
    const { id, houseName, price, location, rating, description} = req.body;
    Home.findById(id).then((home)=>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;

        if(req.file){
            fs.unlink(home.photo, (err)=>{
                if(err){
                    console.log("Error while Deleting Photo", err);
                }
            });
            home.photo = req.file.path;
        }

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

