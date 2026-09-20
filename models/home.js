const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const Favourite = require('./favourite');
const filePath = path.join(rootDir, 'data', 'homes.json');

// Fake Database
// const registeredhomes = [];  //Now There is of no use

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save() {
        Home.fetchAll((registeredhomes) => {
            if (this.id) { //EDIT CASE
                registeredhomes = registeredhomes.map(home => home.id === this.id ? this : home)
            }
            else {
                this.id = Math.random().toString();
                registeredhomes.push(this);
            }

            fs.writeFile(filePath, JSON.stringify(registeredhomes), (err) => {
                console.log("File Written Success ", err);
            });
        });
    }

    static fetchAll(callback) {
        // const filePath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(filePath, (err, data) => {
            if (!err) return callback(JSON.parse(data));
            else return callback([]);
        })
    }

    static findById(homeId, callback) {
        // const filePath = path.join(rootDir, 'data', 'homes.json');
        this.fetchAll(homes => {
            const homeFound = homes.find(home => home.id === homeId);
            callback(homeFound);
        })
    }

    static deleteById(homeId, callback) {
        // const filePath = path.join(rootDir, 'data', 'homes.json');
        this.fetchAll(homes => {
            homes = homes.filter(home => home.id !== homeId);
            fs.writeFile(filePath, JSON.stringify(homes), err=>{
                Favourite.deleteById(homeId, callback);
            });
        })
    }
}