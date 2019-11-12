//Dependencies
var db = require("../models");
var sgMail = require('@sendgrid/mail');
var passport = require("../config/passport");
var Evasion = require("../models/evasion");
module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
      // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
      // So we're sending the user back the route to the members page because the redirect will happen on the front end
      // They won't get this or even be able to access this page if they aren't authed
      res.json("/members");
    });
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
      console.log(req.body);
      db.User.create({
        email: req.body.email,
        password: req.body.password
      }).then(function() {
        res.redirect(307, "/api/login");
      }).catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
    });
    // Route for logging user out
    app.get("/logout", function(req, res) {
      req.logout();
      res.redirect("/");
    });
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      }
      else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
          email: req.user.email,
          id: req.user.id
        });
      }
    });
  

  // Get all mails
  app.get("/all", function (req, res) {
    db.Evasion.findAll({}).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
  // Get mails by name
  app.get("/sendemail/:name", function (req, res) {
    db.Evasion.findOne({
      where: {
        contact_name: req.params.contact_name
      }
    }).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
    // Get mails by id
  app.get("/sendemail/id/:id", function (req, res) {
    db.Evasion.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
    // Get mails by relation
  app.get("/sendemail/relation/:type", function (req, res) {
    db.Evasion.findOne({
      where: {
        contact_relation: req.params.type
      }
    }).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
  //Create new mails in the database
  app.post("/sendemail", function (req, res, next) {
    // db.sequelize.query("INSERT INTO sequelize_evasion.evasions (contact_name, contact_email, contact_relation, message, createdAt, updatedAt) VALUES('" + req.body.contact_name + "', '" + req.body.contact_email + "', '" + req.body.contact_relation + "', '" + req.body.message + "','2019-11-01 06:00:00','2019-11-01 06:00:00')", function (err) {
    //   if (err) {
    //     console.log(err.message);
    //   }
    // });
    db.Evasion.create({
      contact_name: req.body.contact_name,
      contact_email: req.body.contact_email,
      contact_relation: req.body.contact_relation,
      message: req.body.message
    }).then(function (results) {
      //console.log(results);
      res.json(results);
    });

    //Sendgrid's API-KEY
    sgMail.setApiKey(process.env.SG_API_KEY);;
    sendMail(req.body.contact_email, req.body.contact_subject, req.body.message, req.body.attachment_data, req.body.attachment_filename);
    console.log(req.body);
  });

  // setup e-mail data with unicode symbols
  var sendMail = (email, subject, message, attachment_data, attachment_filename) => {
    //    const file = document.querySelector('#myfile').files[0];
    console.log(attachment_data);
    console.log(attachment_filename);
    var mailOptions = {
      from: 'maskproject2@gmail.com', // sender address
      to: email, // list of receivers
      subject: subject,
      text: message,
      html: '<p>' + message + '</p>',

      attachments: [{
        content: attachment_data,
        filename: attachment_filename,
        type: 'plain/text',
        disposition: 'attachment',
        contentId: 'mytext'
      }, ],
    };
    sgMail.send(mailOptions);
  };
  module.exports = sendMail;

}
