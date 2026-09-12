const express = require('express');
const path = require('path');
const storeRouter = express.Router();
const storeControllers = require('../controllers/storeControllers');

storeRouter.get('/', storeControllers.getHomes);
storeRouter.get('/bookings', storeControllers.bookings);


module.exports = storeRouter;