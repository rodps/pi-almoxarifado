var express = require("express");
var router = express.Router();
var models = require("../models");
const isLoggedIn = require("../middleware/index").isLoggedIn;

router.get("/", isLoggedIn, (req, res) => {
 res.render("solicitacoes/index");
});

router.get("/adicionar", isLoggedIn, (req, res) => {
 res.render("solicitacoes/adicionar");
});


router.get("/listar",isLoggedIn, function (req, res) {
    req.isAuthenticated();
    const id = req.user.id;
  
    models.solicitacoes.findAll({
      where : {usuario_id : id}
    }).then (solicitacao =>{
      res.send(solicitacao)
    });
});

//router.get("/adicionar", isLoggedIn, (req, res) => {
//  res.render("produtos/adicionar");
//});

router.post("/adicionar", isLoggedIn, (req, res) => {
  const solicitacao = {
    descricao: req.body.descricao,
    status: "ABERTO",
    justificativa: req.body.justificativa,
    quantidade: req.body.quantidade,
    usuario_id: req.user.id
  };
  models.solicitacoes.create(solicitacao).then( (a)=>{
    res.redirect("/solicitacoes");
  });
});
module.exports = router;
