var orcamento = [];
var pathname = window.location.pathname;

$(document).ready(function(){
  $('#cnpj').mask('00.000.000/0000-00');

  $('#valor').mask('0000000.00', {reverse: true, placeholder: "0,00"});
});

$.getJSON(
  "/backend/solicitacoes/" + pathname.split("/")[2] + "/orcamentos",
  data => {
    data.forEach(val => {
      orcamento.push(val);
    });

    calculaPreco();

    $(document).ready(function() {
      // get current URL path and assign 'active' class
      var pathname = window.location.pathname;
      $('.nav-link[href="' + pathname + '"]')
        .parent()
        .addClass("active");
    });

    $(".tr-clickable").click(function() {
      thisdata = $(this).attr("data-href");
      window.location.href = thisdata;
    });


    $("#add-orcamento").click(function(event) {

      var isValidated = true;
      $("input").each((i, input) =>{
        if(input.checkValidity() == false){
          isValidated = false;
          return false;
        }
      });

      if (isValidated) {
        const orc = {
          cnpj_fornecedor: $("#cnpj").val(),
          nome_fornecedor: $("#nome").val(),
          valor: $("#valor").val(),
          origem: $("#ref").val()
        }
        orcamento.push(orc);

        $("#cnpj").val("");
        $("#nome").val("");
        $("#valor").val("");
        $("#ref").val("");
        $("#pdf").val("");

        if (orcamento.length >= 5) {
          $(this).removeClass("btn-success");
          $(this).addClass("btn-disabled");
          $("fieldset").prop("disabled", true);
        }
        var tr = document.createElement("tr");
        $(tr).append("<td>" + orc.cnpj_fornecedor + "</td>");
        $(tr).append("<td>" + orc.nome_fornecedor + "</td>");
        $(tr).append("<td>" + orc.valor + "</td>");
        $(tr).append("<td>" + orc.origem + "</td>");
        $(tr).append("<td>" + $("#pdf").val() + "</td>");
        $(tr).append(
          "<td><button class='btn btn-danger btn-sm delete-row' data-toggle='modal' data-target='#modal-delete'><i class='fas fa-trash-alt'></i></button></td>"
        );
        $("tbody").append(tr);
        calculaPreco();
      }

    });

    $("tbody").on("click", ".delete-row", function() {
      var row_idx = $(this)
        .parent()
        .parent()
        .index();
      $("#confirm-delete").data("idx", row_idx);
    });

    $("#confirm-delete").click(function() {
      var row_idx = $(this).data("idx");
      $("tbody tr")
        .get(row_idx)
        .remove();
      orcamento.splice(row_idx, 1);
      calculaPreco();
      if (orcamento.length < 5) {
        $("#add-orcamento").addClass("btn-success");
        $("#add-orcamento").removeClass("btn-disabled");
        $("fieldset").prop("disabled", false);
      }
    });

    $("#save-orcamento").click(function() {
      calculaPreco();
      var path = window.location.pathname;
      $.ajax({
        type: "POST",
        url: "/solicitacoes/" + path.split("/")[2] + "/orcamentos",
        contentType: "application/json",
        data: JSON.stringify(orcamento),
        success: function(data) {
          console.log("Successfully saved the matched beans to the user.");
        }
      })
        .done(function() {
          console.log("OK");
          window.location.replace(window.location.href.slice(0, -15));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
        });
    });
  }
);

function calculaPreco() {
  var total = 0;
  orcamento.forEach(o => {
    total += parseFloat(o.valor);
  });
  var media = total / orcamento.length;
  var precoMinimo = media * 0.6;
  var precoMaximo = media * 1.3;
  $("#preco-medio").html("<b>" + media.toFixed(2) + "</b>");
  $("#preco-minimo").html("<b>" + precoMinimo.toFixed(2) + "</b>");
  $("#preco-maximo").html("<b>" + precoMaximo.toFixed(2) + "</b>");

  $("tbody>tr>td:nth-child(3)").each(function(i, td) {
    if (td.innerHTML < precoMinimo || td.innerHTML > precoMaximo) {
      $(td)
        .parent()
        .addClass("table-danger");
    } else {
      $(td)
        .parent()
        .removeClass("table-danger");
    }
  });
}
