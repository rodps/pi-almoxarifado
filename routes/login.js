var express = require('express');
var router  = express.Router();
var models  = require("../models");
var passport   = require('passport');
const jwt = require('jsonwebtoken');

router.get("/signup", function(req, res) {
	res.render("signup");
});

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup'
    }, function(req, res) {
         //console.log(res);
  })
);

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login',
           
    },function(req, res) {
         console.log(res);
  })
    

);

router.get("/logout", function(req, res) {
	req.session.destroy(function(err) {
        res.redirect('/');
    });
});


module.exports = router;