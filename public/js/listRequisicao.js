
var idSolicitacao
var statusSolicitacao
var solicitacaoTr = document.createElement("tr");
var xhr = new XMLHttpRequest();
var btdCarregar;

xhr.open("GET", "http://localhost:3000/requisicoes/listar"); //tipo de requisição + end.
xhr.addEventListener("load", function () {
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function (solicitacao) {
        addSolicitacaoNaTabela(solicitacao);
    });
})
xhr.send();

var tabela = document.querySelector("#tabela-solicitacao")
tabela.addEventListener("dblclick", function (event) {

    var row = event.target.parentNode
    idSolicitacao = row.lastChild.textContent
    window.location.href = "http://localhost:3000/requisicoes/lista/solicitacoes/" + idSolicitacao
})


function addSolicitacaoNaTabela(solicitacao) {
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");

    tabela.appendChild(solicitacaoTr);
    return
}
function montaTr(solicitacao) {
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
    let date = solicitacao.data.split("T");



    solicitacaoTr.appendChild(montaTd(date[0], "info-data"));
    solicitacaoTr.appendChild(montaTd(solicitacao.numero, "info-numero"));
    solicitacaoTr.appendChild(montaTd(solicitacao.usuario.nome, "info-solicitante"));

    solicitacaoTr.appendChild(montaTd(solicitacao.id, "info-id"));
    return solicitacaoTr;
}
function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
function getStatus(event) {
    if (event.childNodes[2].textContent == "ABERTO") {
        return true
    }
    return false
}
