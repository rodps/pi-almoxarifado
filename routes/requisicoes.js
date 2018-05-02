var express = require('express');
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/listarOrcamentos", function (req, res) {
    models.orcamentos.findAll({
        include: [{
            model: models.solicitacoes,
            where: { id: Sequelize.col('orcamentos.id'), status: 'ABERTO' }
        }]

    }).then(solicitacoes => {
        res.send(solicitacoes);
    });


});

router.get("/listarRequisicoes", function (req, res) {

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



router.get("/", function (req, res) {
    res.render("requisicao");
});

module.exports = router;