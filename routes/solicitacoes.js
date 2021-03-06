var express = require("express");
var router = express.Router();
var models = require("../models");
const isLoggedin = require("../middleware/index").isLoggedIn;

router.get("/", isLoggedin, (req, res) => {
  models.solicitacoes.findAll({where : {id : req.user.id} }).then(solicitacoes => {
    res.render("solicitacoes", { solicitacoes: solicitacoes });
  });
});

router.post("/", (req, res) => {
  models.solicitacoes
    .create({
      status: "ABERTO",
      descricao: req.body.descricao,
      justificativa: req.body.justificativa,
      quantidade: req.body.quantidade,
      usuario_id: req.user.id
    })
    .then(solicitacao => {
      res.redirect("/solicitacoes/" + solicitacao.id );
    });
});

router.get("/new", (req, res) => {
  res.render("solicitacoes/nova_solicitacao");
});

router.get("/:id", (req, res) => {
  models.solicitacoes.findById(req.params.id).then(solicitacao => {
    models.usuarios.findById(solicitacao.usuario_id).then(usuario => {
      res.render("solicitacoes/ver_solicitacao", { solicitacao: solicitacao, solicitante: usuario.nome });
    });
  });
});

router.get("/:id/orcamentos/edit", (req, res) => {
  models.orcamentos
    .findAll({
      where: { solicitacao_id: req.params.id }
    })
    .then(orcamentos => {
      res.render("solicitacoes/orcamentos", {
        orcamentos: orcamentos,
        solicitacao_id: req.params.id
      });
    });
});

router.post("/:id/orcamentos", (req, res) => {
  var orcamentos = req.body;
  console.log(orcamentos);
  models.orcamentos
    .destroy({
      where: { solicitacao_id: req.params.id }
    })
    .then(() => {
      orcamentos.forEach(orcamento => {
        models.orcamentos.create({
          origem: orcamento.origem,
          valor: orcamento.valor,
          cnpj_fornecedor: orcamento.cnpj_fornecedor,
          nome_fornecedor: orcamento.nome_fornecedor,
          solicitacao_id: req.params.id
        });
      });
      res.status(200).send("ok");
    });
});

router.delete('/:id', function(req,res) { 

  console.log("DEUCERTO");
   
  models.orcamentos.destroy({
      where: { solicitacao_id: req.params.id }
    })

   models.solicitacoes.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.redirect("/solicitacoes");
    });

});


module.exports = router;
