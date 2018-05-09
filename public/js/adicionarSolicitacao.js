var qtd = 0;

function add_orcamento() {
	if(qtd++ >= 5) {
		var button = document.getElementById("addButton");
		button.disable = true;
		button.classList.replace("btn-info", "btn-secondary");
		return;
	}
	var form = document.getElementById('orcamentos');
	var div = document.createElement("div");
	div.classList.add("form-group");
	form.appendChild(div);

	var label = document.createElement("label");
	label.innerHTML = "Orçamento " + qtd;
	var input = document.createElement("input");
	input.name = "orcamento_"+qtd;
	input.type = "number"
	input.classList.add("form-control");

	div.appendChild(label);
	div.appendChild(input);

	form.appendChild(div);
}