var express = require("express");
var router = express.Router();
var models = require("../models");
var passport = require("passport");
var middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, (req, res) => {
  if(req.user.adm)
    res.redirect("/requisicoes");
  else
    res.redirect("/solicitacoes");
})

router.get("/signup", (req, res) => {
  res.render("autenticacao/signup");
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  })
);

router.get("/login", (req, res) => {
  res.render("autenticacao/login");
});

router.post(
  "/login",
  passport.authenticate("local-signin", {
    successRedirect: "/requisicoes",
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
});

module.exports = router;
