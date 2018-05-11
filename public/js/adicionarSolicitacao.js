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
	div.appendChild(label);

	var mybr = document.createElement('br');
	div.appendChild(mybr);

	var label2 = document.createElement("label");
	label2.innerHTML = "Valor";
	div.appendChild(label2);

	var input = document.createElement("input");
	input.name = "orcamento_"+qtd;
	input.classList.add("form-control");
	input.type = "number"
	div.appendChild(input);
	
	var label2 = document.createElement("label");
	label2.innerHTML = "Cnpj do Fornecedor";
	div.appendChild(label2);


	var input_cnpj = document.createElement("input");
	input_cnpj.name = "cnpj";
	input_cnpj.classList.add("form-control");
	div.appendChild(input_cnpj);

	var label2 = document.createElement("label");
	label2.innerHTML = "Nome do Fornecedor";
	div.appendChild(label2);

	var input_nome_fornecedor = document.createElement("input");
	input_nome_fornecedor.name = "nome_fornecedor";
	input_nome_fornecedor.classList.add("form-control");
	div.appendChild(input_nome_fornecedor);

	var label2 = document.createElement("label");
	label2.innerHTML = "Link do Pregão";
	div.appendChild(label2);

	var input_url = document.createElement("input");
	input_url.name = "link";
	input_url.type = "url";
	input_url.placeholder = "https://www.moodle.utfpr.edu.br";
	input_url.classList.add("form-control");
	div.appendChild(input_url);

	var label2 = document.createElement("label");
	label2.innerHTML = "Upload PDF";
	div.appendChild(label2);


	var input_arquivo = document.createElement("input");
	input_arquivo.name = "arquivo";
	input_arquivo.type = "file";
	input_arquivo.classList.add("form-control");
	div.appendChild(input_arquivo);


	form.appendChild(div);
}