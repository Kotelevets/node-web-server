const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();
// set view engine for application like hbs
app.set('view engine', 'hbs');
// register partials for hbs
hbs.registerPartials(__dirname + '/views/partials');
 // register helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// middleware

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
// set static directory __dirname = full path to application folder on local machine
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //res.send('<h1>Hello, Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
    //, currentYear: new Date().getFullYear() // moved in helper above
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //, currentYear: new Date().getFullYear() // moved in helper above
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
}); // 





app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
