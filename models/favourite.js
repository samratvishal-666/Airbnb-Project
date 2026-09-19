const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');

// Fake Database
// const registeredhomes = [];  //Now There is of no use

module.exports = class Favourite {
    static addtoFavourites(homeId, callback) {
        Favourite.getFavourites((favourites) => {
            if (favourites.includes(homeId)) {
                callback("Home Is Already Added");
            }
            else {
                favourites.push(homeId);
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
            }
        });
    }

    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
    }
}

