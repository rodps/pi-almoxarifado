var express = require('express');
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/listar/orcamentos", function (req, res) {
    models.orcamentos.findAll({
        include: [{
            model: models.solicitacoes,
            where: { id: Sequelize.col('orcamentos.id'), status: 'ABERTO' }
        }]

    }).then(solicitacoes => {
        res.send(solicitacoes);
    });


});

router.get("/listar/solicitacoes", function (req, res) {

    models.solicitacoes.findAll({
        include: [{
            model: models.usuarios,
            where: { id: Sequelize.col('usuario_id') }
        }],
        where:{
             [Op.or]: [{ status: "ABERTO" }, { status: "APROVADO" }, { status: "DESERTO" }]
        }
    }).then(solicitacoes => {
        res.send(solicitacoes);
    });

});

router.get("/listar/solicitacoes/:id", function (req, res) {
   const id = req.params.id;
        
    models.solicitacoes.findById(id).then(solicitacao =>{
        if (solicitacao) {
                res.status(200).json(solicitacao);
            } else {
                res.status(404).send('Solicitacao não encontrada.');
            }
        }).catch(ex => {
            console.error(ex);
            res.status(400).send('Não foi possível consultar a solicitacao.');
        })
        //res.send(solicitacao);
});

router.post("/criar/requisicoes", function (req, res) {
    models.requisicoes.create({usuario_id : 1}).then((_requisicao) => {
           let id_requisicao =_requisicao.numero;
         //  console.log(id_requisicao)
            let lista = []
            req.body.requisicoes.forEach(function(item) {
                lista.push({
                    requisicao_id:id_requisicao,
                    solicitacao_id:item,   
                })
                console.log(item);
            });
            models.solicitacao_requisicao.bulkCreate(lista).then(() => {
                 res.status(201).send("Requisicão Criada");
            })   
        
        }).catch(ex => {
            console.error(ex);
            res.status(400).send('Não foi possível incluir a requisicao ' +
                'no banco de dados.');
        });
    
        
});

router.get("/", function (req, res) {
    res.render("requisicao");
});

module.exports = router;