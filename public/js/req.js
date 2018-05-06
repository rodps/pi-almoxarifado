var listRequisicao = []
var idSolicitacao
var statusSolicitacao
var solicitacaoTr = document.createElement("tr");
var xhr = new XMLHttpRequest();
var btdCarregar
var btdClose

xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/teste.json"); //tipo de requisição + end.
xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    
    });
})
xhr.send();


btdClose = document.querySelector("info-close")
btdClose.addEventListener("click",function(event){
        console.log("ok")
        event.target.parentNode.classList.add("fadeOut");
        setTimeout(function(){
        event.target.parentNode.remove(); //pega click e elimina o pai , fazendo assim apagar a linha
        },300)
})

var tabela = document.querySelector("table");
tabela.addEventListener("click", function(event){  
    row = event.target.parentNode
    idSolicitacao = row.lastChild.textContent
    //statusSolicitacao = getStatus(event) //  usar no deserto

    if(!listRequisicao.includes(idSolicitacao)){
        listRequisicao.push(idSolicitacao)
        row.classList.add("solicitacaoSelecionada")
    }
    
    else{
        listRequisicao.pop(idSolicitacao)
        row.classList.remove("solicitacaoSelecionada")    
    }
    
    console.log(listRequisicao)
    //setTimeout(function(){
    //    event.target.parentNode.remove(); //pega campo do duplo click e elimina o pai , fazendo assim apagar a linha
    //},300);
});








///////////////////////////
function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    
    tabela.appendChild(solicitacaoTr);
    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    solicitacaoTr.appendChild(montaTd(solicitacao.data,         "info-data"         ));
    solicitacaoTr.appendChild(montaTd(solicitacao.descricao,    "info-descricao"    ));
    solicitacaoTr.appendChild(montaTd(solicitacao.status,       "info-status"       ));
    solicitacaoTr.appendChild(montaTd(solicitacao.usuario.nome, "info-solicitante"  ));
    solicitacaoTr.appendChild(montaButton())

    solicitacaoTr.appendChild(montaTd(solicitacao.id,           "info-id"           ));

    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
function montaButton(classe){
    var btn = document.createElement("Button");
    var lbl = document.createTextNode("CLOSE");        
    btn.appendChild(lbl); 
    
    
    btn.classList.add("info-close")
    var td = document.createElement("td");
    td.appendChild(btn)
    return td;
}


function getStatus(event){
    if(event.childNodes[2].textContent == "ABERTO"){
        return true
    }
    return false
}
