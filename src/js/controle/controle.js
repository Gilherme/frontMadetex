
// GET
async function carregarProdutos(loja){
  const response = await fetch(`http://localhost:1039/produtos?loja=${encodeURIComponent(loja)}`)
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
    
    apagar.textContent = 'Apagar';
    apagar.id = produto.id; 
    loja.textContent = produto.loja
    editar.textContent = 'Editar';
    editar.setAttribute('data-id', produto.id)
    img.src = `../../assets/img/${ produto.imagem}`
    titulo.textContent = produto.nome
    preco.textContent = `R$ ${ produto.preco}`

    card.appendChild(img); card.appendChild(titulo); card.appendChild(preco); card.appendChild(apagar); card.appendChild(editar); card.appendChild(loja)
    containerCardsProd.appendChild(card)
  });
  sectionProdutosControle.appendChild(containerCardsProd)
}

// Selecionador dos botões apagar e editar
const selecionador = document.getElementById('selecionador')
selecionador.addEventListener('click', ()=>{

  const btnApagarProduto = document.querySelectorAll('.apagar');
  btnApagarProduto.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.id;
      apagarProduto(id)
    });
  });

  const btnEditarProduto = document.querySelectorAll('.editar')
  btnEditarProduto.forEach( btn => {
    btn.addEventListener('click', () =>{
      abrirProduto(btn)
    })
  })
});

async function apagarProduto(id){
  try {
    const response = await fetch(`http://localhost:1039/DELproduto/${id}`,
    {method: 'DELETE', headers: { authorization: 'Bearer 1234' }})
    const data = await response.json()
    const msg = data.msg
    alert(msg);
  } catch (err) {
    console.error(err)
  }
};

// Abrir para editar 
async function abrirProduto(btn){
  const id = btn.getAttribute('data-id')
  
  const detalhesUrl = `/views/controle/editarProduto.html?id=${encodeURIComponent(id)}`;
  window.location.href = detalhesUrl;
};

// POST
function submitProd(produto){
  let nome      =document.getElementById('nome').value;
  let preco     =document.getElementById('preco').value;
  let descricao =document.getElementById('descricao').value
  let categoria =document.getElementById('categoria').value;
  let imagem    =document.getElementById('imagem').value;
  let loja      =document.getElementById('loja').value
  let condicao  =document.getElementById('condicao').value
  let desconto  =document.getElementById('desconto').value
  let regiao    =document.getElementById('regiao').value
  let galeria   =document.getElementById('galeria').value
  let lista     =document.getElementById('lista').value
  let pagamento =document.getElementById('pagamento').value
  let quantidade=document.getElementById('quantidade').value;
  var produto = { nome: nome, descricao: descricao, preco: preco, categoria: categoria, imagem: imagem, quantidade: quantidade, loja: loja, desconto: desconto, condicao: condicao, pagamento: pagamento, galeria: galeria, lista_descricao: lista, regiao: regiao };

  fetch(`http://localhost:1039/adicionarProduto`,{
   method: 'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(produto)
   })
  .then(response => response.json())
  .then(mensagem => alert(mensagem.msg))
  .catch(error => {console.error('Erro ao inserir dados:', error);});
}

const galho = document.querySelectorAll('.tree span')
  galho.forEach(topico => {
    topico.onclick = function(e){
      const ul = topico.nextElementSibling
      const d = ul.style.display
      ul.style.display = d === 'none' ? 'block' : 'none'
    }
  })