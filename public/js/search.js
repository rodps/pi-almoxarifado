
function search(campoBusca){  
    var list = document.querySelectorAll(".solicitacao");
    if (campoBusca.value.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var  desList = list[i];
            
            var tdDesc = desList.querySelector(".info-descricao");
            var des = tdDesc.textContent;
            
            var tdSol = desList.querySelector(".info-solicitante");
            var sol = tdSol.textContent;
            var expressao = new RegExp(campoBusca.value, "i");
            
            if (!expressao.test(des) && !expressao.test(sol)) {
                desList.classList.add("invisivel");
            } else {
                desList.classList.remove("invisivel");
            }
        }
    }
    else {
        for (var i = 0; i < list.length; i++) {
            var desList = list[i];
            desList.classList.remove("invisivel");
        }
    }
}  
