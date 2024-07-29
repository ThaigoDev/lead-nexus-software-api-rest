const express = require('express');
const mongoose = require('mongoose')
const router = require('./routes.ts');
const path = require('path');  
const session = require('express-session');  
const MongoStore = require('connect-mongo');   
const  helmet = require ("helmet"); 
const csrf = require("csurf"); 
const flash  = require('connect-flash');    
require('dotenv').config(); 
const {globalMiddleware,csrfMiddleware,checkCsrfError} = require ('./src/middlewares/middlewares');  
const app = express(); 
app.use(express.json()); 
 //app.use(helmet()) 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 
app.set('views', path.resolve(__dirname, "src", "views"));
app.set('view engine', 'ejs'); 

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("Conectando...");
    app.emit("Connected!");
})

app.on("Connected!", () => {
    app.listen(process.env.PORT, () => {
        console.log("http://localhost:3000/");
    })
})

//sessions : 
const sessionOptions = session({
    secret : "Project Sessions", 
    store: MongoStore.create({mongoUrl: process.env.CONNECTION_URL}), 
    resave: false, 
    saveUninitialized:false, 
    cookie : {
        maxAge: 1000 * 60 * 60 *7, 
        httpOnly: true
    }
}) 
//app.use(csrf()); 
app.use(sessionOptions); 
app.use(flash()); 
app.use(globalMiddleware);  
/*app.use(checkCsrfError);  
app.use(csrfMiddleware);  */
app.use(router); 
//app.use(helmet()); 
