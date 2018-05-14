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

 

  models.solicitacoes.create(solicitacao).then( (_solicitacao)=>{
      console.log("solicitacao ", _solicitacao.id, " adicionada")
       
       let list= [];
       let valor= req.body.valor
       if(valor){
         if(typeof valor === typeof " "){
            list.push(
              { 
                //origem: req.body.url? req.body.url: req.body.arquivo,
                origem: "nada",
                valor: req.body.valor,
                cnpj_forncedor: req.body.cnpj_forncedor,
                solicitacao_id: _solicitacao.id,
                nome_fornecedor: req.body.nome_fornecedor
              }
              )
         }
         else{
          let i=0
            while(i<valor.length){
              list.push(
              { 
                //origem: req.body.url[i]? req.body.url[i]: req.body.arquivo[i],
                origem: "nada",
                valor: req.body.valor[i],
                cnpj_forncedor: req.body.cnpj_forncedor[i],
                solicitacao_id: _solicitacao.id,
                nome_fornecedor: req.body.nome_fornecedor[i]
              }
              )
            i=i+1;
           }
         }
         
        models.orcamentos.bulkCreate(list).then( (_orcamento)=>{
          console.log("adicionado orcamento ", _orcamento, "a solicitacao");
        });
      }
      res.redirect("/solicitacoes");
  });
 
});
module.exports = router;
