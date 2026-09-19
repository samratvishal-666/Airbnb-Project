const express = require('express');
const path = require('path');
const storeRouter = express.Router();
const storeControllers = require('../controllers/storeControllers');

storeRouter.get('/', storeControllers.getIndex);
storeRouter.get('/homes', storeControllers.getHomes);
storeRouter.get('/bookings', storeControllers.getbookings);
storeRouter.get('/homes/:homeId', storeControllers.getHomedetails);
storeRouter.get('/favourites', storeControllers.getfavourites);
storeRouter.post('/favourites', storeControllers.postfavouriteshome);

module.exports = storeRouter;