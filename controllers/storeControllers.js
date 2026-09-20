const Home = require('../models/home');
const Favourite = require('../models/favourite')

exports.getIndex = (req, res) => {
    Home.fetchAll((registeredhomes) => {
        res.status(201).render('store/index', { registeredhomes: registeredhomes, pageTitle: 'airbnb' });
    });
}

exports.getHomes = (req, res) => {
    Home.fetchAll((registeredhomes) => {
        res.status(201).render('store/home-list', { registeredhomes: registeredhomes, pageTitle: 'airbnb Home' });
    });
}


exports.getbookings = (req, res) => {
    res.status(201).render('store/bookings', { pageTitle: 'My Bookings' });
}

exports.getfavourites = (req, res) => {
    Favourite.getFavourites((favourites) => {
        Home.fetchAll((registeredhomes) => {
            const favouriteHomes = registeredhomes.filter(home => favourites.includes(home.id));
            res.status(201).render('store/favourite-list', { favouriteHomes: favouriteHomes, pageTitle: 'My Favourites' });
        });
    });
}

exports.postfavouriteshome = (req, res) => {
    // console.log("Home Come from : ", req.body);
    Favourite.addtoFavourites(req.body.id, (error) => {
        if (error) {
            console.log("Error while adding home", error);
        }
        res.redirect('/favourites');
    });
}

exports.postremovefromfavourites = (req, res) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId, err => {
        if(err){
            console.log("Error While Deleting Home", err);
        }
        res.redirect('/favourites');

    })
}



exports.getHomedetails = (req, res) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home => {
        if (!home) {
            console.log("Home No Found");
            res.redirect('/homes');
        }
        // console.log("Home Details: ", home);
        else {
            res.status(201).render('store/home-detail', { pageTitle: 'Home Details Page', home: home });
            console.log("Current House with Id: ", homeId);
        }
    })
}
