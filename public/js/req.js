var listRequisicao = []
var idSolicitacao
var statusSolicitacao
var solicitacaoTr = document.createElement("tr");
var xhr = new XMLHttpRequest();
var btdCarregar
var btdModal

xhr.open("GET", "http://localhost:3000/requisicoes/listar/solicitacoes"); //tipo de requisição + end.
//xhr.open("GET", "https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/listSolicitacao.json"); //tipo de requisição + end.

xhr.addEventListener("load", function(){
    var sol = JSON.parse(xhr.responseText);
    sol.forEach(function(solicitacao) {
    addSolicitacaoNaTabela(solicitacao);
    });
})
xhr.send();

var campoBusca = document.querySelector("#descricao-consulta");
campoBusca.addEventListener("input", function(){
    search(campoBusca)
})

var tabelaShow = document.querySelector("#tabela-solicitacao");
tabelaShow.addEventListener("dblclick", function(event){  
    var row = event.target.parentNode
    idSolicitacao = row.lastChild.textContent
    window.location.href = "http://localhost:3000/solicitacoes/show/" + idSolicitacao
});

var tabela = document.querySelector("#tabela-solicitacao");
tabela.addEventListener("click", function(event){  
    row = event.target.parentNode
    idSolicitacao = row.lastChild.textContent
    if(!listRequisicao.includes(idSolicitacao)){
        listRequisicao.push(idSolicitacao)
        row.classList.add("solicitacaoSelecionada")
    }
    else{
        listRequisicao.pop(idSolicitacao)
        row.classList.remove("solicitacaoSelecionada")    
    }
});

btdModal = document.querySelector("#newRequisicao");
    btdModal.addEventListener("click",function(){
        if(listRequisicao.length != 0){
             $("#exampleModal").modal();
        }
        else{
            document.getElementById("error").style.display = "block";
        }
    })

btdCarregar = document.querySelector("#saveRequisicao");
    btdCarregar.addEventListener("click",function(){
            var json = JSON.stringify({"solicitacoes" : listRequisicao});
            var ajax = new XMLHttpRequest()
            ajax.open("POST", "http://localhost:3000/requisicoes/criar/requisicoes")
            ajax.setRequestHeader('Content-type','application/json; charset=utf-8');
            ajax.send(json)
            window.location.reload()
    })



///////////////////////////
function addSolicitacaoNaTabela(solicitacao){
    var solicitacaoTr = montaTr(solicitacao);
    var tabela = document.querySelector("#tabela-solicitacao");
    tabela.appendChild(solicitacaoTr);

    var botao = document.getElementById("edit"+ solicitacao.id)
    botao.addEventListener("click",function(event){

    let id = event.target.solicitacao   
    var json = JSON.stringify(id);
    window.location.href = "http://localhost:3000/solicitacoes/show/" + id
    
    })
    return
}
function montaTr(solicitacao){
    var solicitacaoTr = document.createElement("tr");
    solicitacaoTr.classList.add("solicitacao");
 
    solicitacaoTr.appendChild(montaTd(solicitacao.data,         "info-data"         ));
    solicitacaoTr.appendChild(montaTd(solicitacao.descricao,    "info-descricao"    ));
    solicitacaoTr.appendChild(montaTd(solicitacao.status,       "info-status"       ));
    solicitacaoTr.appendChild(montaTd(solicitacao.usuario.nome, "info-solicitante"  ));
    solicitacaoTr.appendChild(montaButton(solicitacao.id))

    solicitacaoTr.appendChild(montaTd(solicitacao.id,           "info-id"           ));
    return solicitacaoTr;
 }

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
function getStatus(event){
    if(event.childNodes[2].textContent == "ABERTO"){
        return true
    }
    return false
}

function montaButton(id){
    var btn = document.createElement("Button");
    var lbl = document.createTextNode("Edit");        
    btn.appendChild(lbl); 
   
    btn.classList.add("info-edit")
    btn.id = "edit" + id 
    btn.solicitacao = id
    var td = document.createElement("td");
    td.appendChild(btn)
    return td;
}