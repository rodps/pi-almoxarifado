const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  session = require("express-session"),
  models = require("./models"),
  middleware = require("./middleware"),
  passportStrategies = require("./config/passport")(models.usuarios),
  app = express(),
  loginRouter = require("./routes/login"),
  solicitacoesRouter = require("./routes/solicitacoes"),
  produtosRouter = require("./routes/produtos"),
  requisicoesRouter = require("./routes/requisicoes");
siorgRouter = require("./routes/siorg");

// configuracoes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//passport config
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.use("local-signup", passportStrategies.localSignup);
passport.use("local-signin", passportStrategies.localSignin);
passport.serializeUser(passportStrategies.serialize);
passport.deserializeUser(passportStrategies.deserialize);

//rotas
app.use("/", loginRouter);
app.use("/solicitacoes", solicitacoesRouter);
app.use("/produtos", produtosRouter);
app.use("/requisicoes", requisicoesRouter);
app.use("/siorg", siorgRouter);

//Cria o banco de dados
//{force:true} Drop tables se ja existirem
models.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Nice! Database looks fine");
    app.listen(3000, function(err) {
      if (!err) console.log("The server has started!");
      else console.log(err);
    });
  })
  .catch(function(err) {
    console.log(err, "Algo deu errado com a database!");
  });

app.get("/", middleware.isLoggedIn, function(req, res) {
  res.render("index");
});
