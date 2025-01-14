
// GET
const userLogado = JSON.parse(localStorage.getItem('user'))
if(!userLogado || !userLogado.admin){
  showVcNtemPermissao()
}


function showVcNtemPermissao(){
  document.querySelector('body').innerHTML = '<h1 style="text-align: center; margin: 100px auto 0 auto"> Você não tem permissão para acessar essa área </h1>'
  setTimeout(() => {
    window.location.href = '/index.html'
  }, 2000)
}

async function carregarProdutos(loja, column){
  const response = await fetch(`https://api.madetex.com.br/produtos?param=${encodeURIComponent(loja)}&column=${encodeURIComponent(column)}&limit=100`)
    const produtos = await response.json()
    CriarCarroselControle(produtos)
}

function CriarCarroselControle(produtos){
  const sectionProdutosControle = document.getElementById('conteudo-controle')
  const containerCardsProd = criarElemento('div', 'container-cards-controle');

  produtos.forEach(produto => {
    const img   =criarElemento('img');
    const card  =criarElemento('div', 'card');
    const titulo=criarElemento('h4', 'titulo')
    const preco =criarElemento('p', 'preco')
    const loja  =criarElemento('p', 'loja')
    const apagar=criarElemento('button', 'apagar')
    const editar=criarElemento('button', 'editar') 
    const imgs = separarString(produto.galeria, " / ")

    apagar.textContent = 'Apagar';
    apagar.id = produto.id; 
    loja.textContent = produto.loja
    editar.textContent = 'Editar';
    editar.setAttribute('data-id', produto.id)
    img.src = `../../assets/img/${imgs[0]}`
    titulo.textContent = produto.nome
    preco.textContent = `R$ ${ produto.preco}`

    card.appendChild(img); card.appendChild(titulo); card.appendChild(preco); card.appendChild(apagar); card.appendChild(editar); card.appendChild(loja)
    containerCardsProd.appendChild(card);
  });
  sectionProdutosControle.appendChild(containerCardsProd)

  const btnApagarProduto = document.querySelectorAll('.apagar');
  const btnEditarProduto = document.querySelectorAll('.editar');
  btnEditarProduto.forEach( btn => {
    btn.addEventListener('click', () =>{
      abrirParaEditar(btn)
    })
  })
  btnApagarProduto.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.id;
      apagarProduto(id)
    });
  });
}

// Selecionador dos botões apagar e editar
const selecionador = document.getElementById('selecionador')
selecionador.addEventListener('click', ()=>{

  
});



async function apagarProduto(id){
  if (userLogado.admin) {
    try {
      const response = await fetch(`https://api.madetex.com.br/DELproduto/${id}`,
      {method: 'DELETE', headers: { authorization: `${userLogado.token}`}})
      const data = await response.json()
      alert(data.msg)
    } catch (err) {
      console.error(err)
    }
  }
  else {
    alert('vc n tem autorização')
  }
  
};

// Abrir para editar 
async function abrirParaEditar(btn){''
  const id = btn.getAttribute('data-id')
  
  const url = `/src/views/controle/editarProduto.html?id=${encodeURIComponent(id)}`;

  window.location.href = url;
};

// POST
function submitProd(produto){
  let nome      =document.getElementById('nome').value;
  let preco     =document.getElementById('preco').value;
  let descricao =document.getElementById('descricao').value
  let categoria =document.getElementById('categoria').value;
  let subCategoria    =document.getElementById('sub-categoria').value
  let subSubCategoria =document.getElementById('sub-sub-categoria').value
  let loja      =document.getElementById('loja').value
  let condicao  =document.getElementById('condicao').value
  let desconto  =document.getElementById('desconto').value
  let oferta    =document.getElementById('oferta').value
  let galeria   =document.getElementById('galeria').value
  let lista     =document.getElementById('lista').value
  let pagamento =document.getElementById('pagamento').value
  let quantidade=document.getElementById('quantidade').value;
  let madeira   =document.getElementById('madeira').value;
  let variacao  =document.getElementById('variacao').value;
  let tipoVariacao =document.getElementById('tipo-variacao').value;
  var produto = { nome: nome, madeira: madeira, descricao: descricao, preco: preco, categoria: categoria, sub_categoria: subCategoria, sub_sub_categoria: subSubCategoria, quantidade: quantidade, loja: loja, desconto: desconto, condicao: condicao, pagamento: pagamento, galeria: galeria, lista_descricao: lista, oferta: oferta, variacao: variacao, tipo_variacao: tipoVariacao};

  fetch(`https://api.madetex.com.br/adicionarProduto`,{
   method: 'POST',
   headers: { authorization: `${userLogado.token}`,'Content-Type': 'application/json'},
   body: JSON.stringify(produto)
   })
  .then(response => response.json())
  .then(mensagem => alert(mensagem.msg))
  .catch(error => {alert('Erro ao inserir dados:', error);});
}
