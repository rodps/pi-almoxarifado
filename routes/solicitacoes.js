var express = require("express");
var router = express.Router();
var models = require("../models");
const isLoggedIn = require("../middleware/index").isLoggedIn;

router.get("/", isLoggedIn, (req, res) => {
 res.render("solicitacoes/index");
});

router.get("/criar", isLoggedIn, (req, res) => {
 res.render("produtos/adicionar");
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

router.get("/adicionar", isLoggedIn, (req, res) => {
  res.render("produtos/adicionar");
});

router.post("/adicionar", isLoggedIn, (req, res) => {
  const solicitacao = {
    justificativa: req.body.justificativa,
    quantidade_produto: req.body.quantidade_produto,
    user_id: req.body.user.id,
    produtos: req.body.produtos,
    orcamentos: req.body.orcamentos
  };
  models.solicitacoes.create(solicitacao);
});
module.exports = router;
