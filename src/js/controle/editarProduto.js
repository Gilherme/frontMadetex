
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

function preencherFormulario(produto){
  console.log(produto)
  document.getElementById('nome').value      = produto.nome
  document.getElementById('madeira').value   = produto.madeira
  document.getElementById('categoria').value = produto.categoria
  document.getElementById('sub-categoria').value    = produto.sub_categoria
  document.getElementById('sub-sub-categoria').value= produto.sub_sub_categoria
  document.getElementById('preco').value     = produto.preco
  document.getElementById('quantidade').value= produto.quantidade
  document.getElementById('desconto').value  = produto.desconto
  document.getElementById('condicao').value  = produto.condicao
  document.getElementById('pagamento').value = produto.pagamento
  document.getElementById('imagem').value    = produto.imagem
  document.getElementById('galeria').value   = produto.galeria
  document.getElementById('lista').value     = produto.lista_descricao
  document.getElementById('descricao').value = produto.descricao
  document.getElementById('loja').value      = produto.loja
  document.getElementById('regiao').value    = produto.regiao
  document.getElementById('btn-put').setAttribute('data-id', produto.id) 
}

async function editarProduto(produto){ 
  const nome      =document.getElementById('nome').value
  const categoria =document.getElementById('categoria').value
  const subCategoria    =document.getElementById('sub-categoria').value
  const subSubCategoria =document.getElementById('sub-sub-categoria').value
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
  const madeira   =document.getElementById('madeira').value
  var produtoAtualizado = { nome: nome, madeira: madeira, descricao: descricao, categoria: categoria, sub_categoria: subCategoria, sub_sub_categoria: subSubCategoria, preco: preco, imagem: imagem, quantidade: quantidade, loja: loja, desconto: desconto, condicao: condicao, pagamento: pagamento, galeria: galeria, lista_descricao: lista, regiao: regiao};

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
