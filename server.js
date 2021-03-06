const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000; //object that stores all of our evironment variables as key value pairs and PORT is created by Heroku.  || is or if Heroku isnt there


var app=express();

hbs.registerPartials(__dirname+'/views/partials'); //allows you to use partial templates
app.set('view engine', 'hbs');
//app.use is how you register middleware
//next allows you to add functionality
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
//   //without next() everything else below will purposely not render
// });
app.use(express.static(__dirname+'/public'));// takes 2 underscores and is how you get the directory path

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req, res)=>{  // the '/' means the root of the app (url)
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMessage:'Welcome to my website'

  });
});
app.get('/projects',(req, res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'

  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});//listens to a port, in this case the local 3000 port
