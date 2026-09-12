const express = require('express');
const path = require('node:path');
const hostRouter = express.Router();
const hostControllers = require('../controllers/hostControllers');

hostRouter.get('/add-home', hostControllers.getAddhome);
hostRouter.post('/add-home', hostControllers.postAddhome);

exports.hostRouter = hostRouter;
