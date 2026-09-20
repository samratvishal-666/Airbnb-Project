const express = require('express');
const path = require('node:path');
const hostRouter = express.Router();
const hostControllers = require('../controllers/hostControllers');

hostRouter.get('/add-home', hostControllers.getAddhome);
hostRouter.post('/add-home', hostControllers.postAddhome);
hostRouter.get('/homelist', hostControllers.gethosthomes);
hostRouter.get('/edithome/:homeId', hostControllers.getEdithome);
hostRouter.post('/edithome', hostControllers.postEdithome);
hostRouter.post('/delete-home/:homeId', hostControllers.postdeletehome);

exports.hostRouter = hostRouter;
