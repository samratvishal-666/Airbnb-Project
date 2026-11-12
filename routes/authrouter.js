const express = require('express');
const path = require('path');
const authRouter = express.Router();
const authControllers = require('../controllers/authControllers');

authRouter.get('/login', authControllers.getLogin);
authRouter.post('/login', authControllers.postLogin);
authRouter.post('/logout', authControllers.postLogout);
authRouter.get('/signup', authControllers.getSignup);
authRouter.post('/signup', authControllers.postSignup);

module.exports = authRouter;