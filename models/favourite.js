const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    homeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Home',
        required : true,
        unique : true
    }
});


module.exports = mongoose.model('Favourites' , favouriteSchema);