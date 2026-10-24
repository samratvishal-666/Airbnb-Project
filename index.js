const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const MONGODB_Store = require('connect-mongodb-session')(session);
// const DB_PATH = "YOUR DB_PATH";
const { hostRouter } = require('./routes/hostrouter.js');
const authRouter = require('./routes/authrouter.js');
const storeRouter = require('./routes/storerouter.js');
const errorControllers = require('./controllers/error');
const dns = require("node:dns");
const { default: mongoose } = require('mongoose');
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const store = new MONGODB_Store({
    uri : DB_PATH,
    collection : 'sessions'
})
app.use(session({
    secret : "storesvalue",
    resave : false,
    saveUninitialized : true,
    store : store
}));

app.use((req, res, next)=>{
    req.isLoggedIn = req.session.isLoggedIn;
    console.log(req.isLoggedIn);
    next();
}); 

app.use(authRouter);
app.use(storeRouter);
app.use('/host', (req, res, next)=>{
    if(req.isLoggedIn){
        next(); 
    }
    else{
        res.redirect('/login');
    }
});
app.use('/host', hostRouter);

app.use(errorControllers.getError);



mongoose.connect(DB_PATH).then(()=>{
    console.log("Mongoose Connection Established");
    app.listen(PORT, () => {
        console.log('Example app is Running at 3000');
    })
}).catch(err=>{
    console.log("Error while Established the Connection");
})
