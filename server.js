const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log')
        }
    });
    next();
});

app.use((req,res,next) =>{
    res.render('maintanance.hbs');
});


hbs.registerHelper('getCurrentYear', () =>{
     return new Date().getFullYear();
});

hbs.registerHelper('capsOn', (text) =>{
     return text.toUpperCase();
});


app.get('/',(req,res) =>{
    // res.send("<h1>hello express</h1>");
    res.send({
         name: 'akash',
         likes: [
             'badminton',
             'cricket'
         ]
    });
});

app.get('/myPage',(req,res)=>{
    // res.send("myPage comes");
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req,res) =>{
    // res.send({
    //      errorMessage: 'error page'
    // }) 
    res.render('Home.hbs',{
        pageTitle: 'Home Page',
        welcome: 'Welcome to the Home Page'
    })
})

app.listen(3000,()=>{
    console.log("server is up on port 3000");
});