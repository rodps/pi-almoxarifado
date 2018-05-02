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
        res.send(solicitacao);
    })


});

router.get("/", function (req, res) {
    res.render("requisicao");
});

module.exports = router;