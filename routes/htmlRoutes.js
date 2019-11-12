var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Home page
   app.get('/', function (req, res) {
    res.render("home")
  })

  // Signup page
    app.get('/signup', (req, res) => {
      if (req.user) {
        res.redirect("/members");
      }
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    })

  // Load index page
  app.get("/example", function (req, res) {
    db.Evasion.findAll({}).then(function (dbEvasion) {
      res.render("example", {
        examples: dbEvasion
      });
    });
  });

  app.get("/sendemail", function (req, res) {
    db.Evasion.findAll({}).then(function (dbEvasion) {
      res.render("email", {
        //examples: dbEvasion
      });
    });
  });

  app.get("/card", function (req, res) {
    // db.Evasion.findAll({}).then(function (dbEvasion) {
    res.render("card", {
      msg: "Welcome!",
      // examples: dbEvasion
      // });
    });
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  })

  // Load text message page
  app.get('/text', function (req, res) {
    res.render("textmessage")
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Evasion.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvasion) {
      res.render("example", {
        example: dbEvasion
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};