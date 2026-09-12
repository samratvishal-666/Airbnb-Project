const express = require('express');
const app = express();
const path = require('path');
const {hostRouter} = require('./routes/hostrouter.js') ;
const storeRouter = require('./routes/storerouter.js') ;
const errorControllers = require('./controllers/error');
const PORT = 3000;

app.set('view engine' , 'ejs');
app.set('views' , 'views');
app.use((req, res, next)=>{
    console.log(req.url, req.method);
    next();
});

app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));

app.use(storeRouter);
app.use('/host', hostRouter);

app.use(errorControllers.getError);

app.listen(PORT, ()=>{
    console.log('Example app is Running at 3000');
})