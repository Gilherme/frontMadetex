
// Carregar produto na tela 
window.onload = function() {
  buscarDetalhesDoProduto();
};

async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const response = await fetch(`http://localhost:1039/produto?id=${encodeURIComponent(id)}`);
  const data = await response.json();
  preencherFormulario(data[0])
}

function preencherFormulario(data){
  document.getElementById('nome').value      = data.nome
  document.getElementById('categoria').value = data.categoria
  document.getElementById('preco').value     = data.preco
  document.getElementById('quantidade').value= data.quantidade
  document.getElementById('desconto').value  = data.desconto
  document.getElementById('condicao').value  = data.condicao
  document.getElementById('pagamento').value = data.pagamento
  document.getElementById('imagem').value    = data.imagem
  document.getElementById('galeria').value   = data.galeria
  document.getElementById('lista').value     = data.lista_descricao
  document.getElementById('descricao').value = data.descricao
  document.getElementById('loja').value      = data.loja
  document.getElementById('regiao').value    = data.regiao
  document.getElementById('btn-put').setAttribute('data-id', data.id) 
}


async function editarProduto(produto){ 
  const nome      =document.getElementById('nome').value
  const categoria =document.getElementById('categoria').value
  const preco     =document.getElementById('preco').value
  const desconto  =document.getElementById('desconto').value
  const condicao  =document.getElementById('condicao').value
  const pagamento =document.getElementById('pagamento').value
  const imagem    =document.getElementById('imagem').value
  const galeria   =document.getElementById('galeria').value
  const lista     =document.getElementById('lista').value
  const descricao =document.getElementById('descricao').value
  const loja      =document.getElementById('loja').value
  const regiao    =document.getElementById('regiao').value
  const id        =document.getElementById('btn-put').getAttribute('data-id')
  const quantidade=document.getElementById('quantidade').value 
  var produtoAtualizado = { nome: nome, descricao: descricao, preco: preco, categoria: categoria, imagem: imagem, quantidade: quantidade, loja: loja, desconto: desconto, condicao: condicao, pagamento: pagamento, galeria: galeria, lista_descricao: lista, regiao: regiao};

  const options = {
    method: 'PUT', 
    headers: { authorization: 'Bearer 1234','Content-Type': 'application/json'},  
    body: JSON.stringify(produtoAtualizado) 
  }
  
 fetch(`http://localhost:1039/editarProduto/${id}`, options)
  .then(response => response.json())
  .then(msg => alert(msg.msg))
  .catch(error => console.log(error))
}
