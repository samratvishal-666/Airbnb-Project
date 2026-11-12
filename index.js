const express = require('express');
const app = express();
const rootDir = require('./utils/pathUtils');
const path = require('path');
const multer= require('multer');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const DB_PATH = "YOUR DB_PATH";
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

const randomString = (length)=>{
    const characters = 'abcdefghijklmnopqrstuvwyz';
    let result = '';
    for(let i = 0; i<length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    
    filename: (req, file, cb)=>{
        cb(null, randomString(10) + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const multerOptions = {
    storage, fileFilter
};

app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, 'public')));
app.use("/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')));


const store = MongoStore.create({
    mongoUrl: DB_PATH,
    collectionName: 'sessions'
});

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
    console.log("Error while Established the Connection",err);
})
