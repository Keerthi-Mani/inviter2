require("dotenv").config();
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var exphbs = require("express-handlebars");
var sgMail = require('@sendgrid/mail');
var nodeMailer = require("nodemailer");
var bodyParser = require("body-parser");
var db = require("./models");
var path = require("path");
var Nexmo = require('nexmo');
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// sessions to keep track of user login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Middleware for images
app.use(express.static(__dirname+'/public'));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
// Routes
app.get('/'), (req, res) => {
  res.render('main.handlebars');
}
//Routes
require("./routes/text-apiRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;