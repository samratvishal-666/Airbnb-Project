const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
// Fake Database
// const registeredhomes = [];  //Now There is of no use

module.exports = class Home{
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;   
    }

    save(){
        Home.fetchAll((registeredhomes)=>{ 
          registeredhomes.push(this);
          const filePath = path.join(rootDir, 'data', 'homes.json');
          fs.writeFile(filePath, JSON.stringify(registeredhomes), (err)=>{
              console.log("File Written Success ", err);
          });
        });
    }

    static fetchAll(callback){
        const filePath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(filePath, (err, data)=>{
            if(!err) return callback(JSON.parse(data));
            else return callback([]);
        })
    }
}