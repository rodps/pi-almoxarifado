var xhr = new XMLHttpRequest();
var ajax = new XMLHttpRequest();

var idRequisicao = window.location.pathname
var pos = idRequisicao.split("/")

ajax.open("GET", "http://localhost:3000/requisicoes/listar/solicitacoes/" + pos[3]); //tipo de requisição + end.
//ajax.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/teste.json"); //tipo de requisição + end.

ajax.addEventListener("load", function(){
    let sol = JSON.parse(ajax.responseText);
    addLabel(sol)
    var Idlb = document.getElementById("IdShowRequisicao").innerHTML += pos[3]
})
ajax.send()

xhr.open("GET", "http://localhost:3000/requisicoes/listar/orcamentos/" + pos[3]); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    let sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    });
})
xhr.send();

var tabela = document.querySelector("#editar");
tabela.addEventListener("click", function(event){  
    document.getElementById("descricaoSolicitacao").readOnly = false 
    document.getElementById("justificativaSolicitacao").readOnly = false
    document.getElementById("solicitanteSolicitacao").readOnly = false
    document.getElementById("statusSolicitacaol").readOnly = false    
});

////////

function addLabel(sol){
    console.log(sol)
    let qtdLb = document.getElementById("quantidadeSolicitacao").value = sol[0].quantidade
    document.getElementById("quantidadeSolicitacao").readOnly = true

    let descricaoLb = document.getElementById("descricaoSolicitacao").value = sol[0].descricao
    document.getElementById("descricaoSolicitacao").readOnly = true

    let justLb = document.getElementById("justificativaSolicitacao").value = sol[0].justificativa
    document.getElementById("justificativaSolicitacao").readOnly = true

    let nomeLb = document.getElementById("solicitanteSolicitacao").value = sol[0].usuario.nome
    document.getElementById("solicitanteSolicitacao").readOnly = true

    let statusLb = document.getElementById("statusSolicitacaol").value = sol[0].status
    document.getElementById("statusSolicitacaol").readOnly = true

    return
}

function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(solicitacaoTr);
    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
    
    solicitacaoTr.appendChild(montaTd(solicitacao.valor,                    "info-valor"       ));
    solicitacaoTr.appendChild(montaTd(solicitacao.origem,                   "info-origem"      ));
    solicitacaoTr.appendChild(montaTd(solicitacao.cnpj_forncedor,           "cnpj_forncedor"      ));
    solicitacaoTr.appendChild(montaTd(solicitacao.nome_fornecedor,          "info-nome_fornecedor" ));
    
    solicitacaoTr.appendChild(montaTd(solicitacao.id,                       "info-id"           ));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

