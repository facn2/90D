const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var expressValidator = require('express-validator');

const controllers = require('./controllers/index');
const helpers = require('./views/helpers/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers: helpers
  })
);

// for parsing application/json
app.use(bodyParser.json());

// for parsing xwww- /URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// app.post('/signup', (req, res) => {
//   console.log(req.body);
//   let userData = req.body;
//   if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
//     res.render('show_message', {
//       message: "Sorry, the information you provided is all kinds of wrong", type: "error"
//     })
//   } else {
//     let newUser = new User({
//       firstName: userData.firstName;
//       lastName: userData.lastName;
//       email: userData.email;
//       password: userData.password;
//       res.send('Gotcha bitch');
//     });

//     newUser.save((err, user) => {
//       if (err)
//         console.log('error');
//       else
//         res.render
//     }
//   }
// });

//    } else {
//       var newPerson = new Person({
//          name: personInfo.name,
//          age: personInfo.age,
//          nationality: personInfo.nationality
//       });

//       newPerson.save(function(err, Person){
//          if(err)
//             res.render('error', {message: "Database error", type: "error"});
//          else
//             res.render('show_message', {
//                message: "New person added", type: "success", person: personInfo});
//       });
//    }
// });

app.set('port', process.env.PORT || 5555);
// app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(controllers);

module.exports = app;
