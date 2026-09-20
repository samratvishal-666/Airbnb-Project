const Home = require('../models/home');

exports.getAddhome = (req, res) => {
    res.status(201).render('host/edithome', { pageTitle: 'airbnb add Home', editing: false });
}

exports.gethosthomes = (req, res) => {
    Home.fetchAll((registeredhomes) => {
        res.status(201).render('host/hosthomelist', { registeredhomes: registeredhomes, pageTitle: 'Host Home List' });
    });
}

exports.postAddhome = (req, res) => {
    // console.log("Home Added Successfully: ", req.body);
    const { houseName, price, location, rating, photoUrl } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();
    res.status(201).redirect('/host/homelist');
}

exports.getEdithome = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId, home => {
        if (!home) {
            console.log("Home is Not Found");
            return res.redirect('/host/homelist');
        }
        console.log(homeId, editing, home);
        res.status(201).render('host/edithome', { home: home, pageTitle: 'edit your airbnb home', editing: editing });
    })
}

exports.postEdithome = (req, res) => {
    // console.log("Home Added Successfully: ", req.body);
    const { houseName, price, location, rating, photoUrl, id } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.id = id;
    home.save();
    res.status(201).redirect('/host/homelist');
}

exports.postdeletehome = (req, res) => {
    const homeId = req.params.homeId;
    Home.deleteById(homeId, error=>{
        if(error){
            console.log("Error While Deleting", error);
        }
        res.status(302).redirect('/host/homelist');
    })
}

