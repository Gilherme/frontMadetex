
// GET
async function carregarProdutos( produto, loja){
  const response = await fetch(`http://localhost:1039/${produto}?loja=${encodeURIComponent(loja)}`)
    const data = await response.json()
  
    CriarCarroselControle(data, produto)
}

function CriarCarroselControle(dados, produto){
  const sectionProdutosControle = document.getElementById('conteudo-controle')
  const containerCardsProd = criarElemento('div', 'container-cards-controle');

  dados.forEach(element => {
    const img = criarElemento('img');
    const card = criarElemento('div', 'card');
    const titulo = criarElemento('h4', 'titulo')
    const preco = criarElemento('p', 'preco')
    const loja = criarElemento('p', 'loja')
    const apagar = criarElemento('button', 'apagar')
    const editar = criarElemento('button', 'editar')
    
    apagar.textContent = 'Apagar'; apagar.id = element.id; 
    apagar.setAttribute('produto', produto)
    loja.textContent = element.loja

    editar.textContent = 'Editar';
    editar.setAttribute('data-tipo', produto)
    editar.setAttribute('data-id', element.id)
    img.src = `../../assets/img/${ element.imagem}`

    if(produto == 'madeiramentos'){
      titulo.textContent =  ` ${element.nome} ${element.madeira} ${element.medida}`

    }else{
      titulo.textContent = element.nome
    }
    preco.textContent = `R$ ${ element.preco}`

    card.appendChild(img)
    card.appendChild(titulo)
    card.appendChild(preco)
    card.appendChild(apagar)
    card.appendChild(editar)
    card.appendChild(loja)

    containerCardsProd.appendChild(card)
  });
  sectionProdutosControle.appendChild(containerCardsProd)
}

// DELETE e EDITAR
const selecionador = document.getElementById('selecionador')
selecionador.addEventListener('click', ()=>{

  const btnApagarProduto = document.querySelectorAll('.apagar');
  btnApagarProduto.forEach(btn => {
    btn.addEventListener('click', () => {
      const produto = btn.getAttribute("produto")
      const id = btn.id;
      apagarProduto(id, produto)
    });
  });

  const btnEditarProduto = document.querySelectorAll('.editar')
  btnEditarProduto.forEach( btn => {
    btn.addEventListener('click', () =>{
      abrirProduto(btn)
    })
  })
});

// editar
async function abrirProduto(btn){
  const id = btn.getAttribute('data-id')
  const tipo = btn.getAttribute('data-tipo').slice(0, -1)

  const tipoDoProduto = primeiraMaiuscula(tipo)
  
  const detalhesUrl = `/views/controle/editar${tipoDoProduto}.html?id=${encodeURIComponent(id)}&tipo=${encodeURIComponent(tipo)}`;
  window.location.href = detalhesUrl;
};

async function apagarProduto(id, produto){
  if(produto === 'produtos') produto = 'produto';
  if(produto === 'madeiramentos') produto = 'madeiramento';

  try {
    const response = await fetch(`http://localhost:1039/DEL${produto}/${id}`,
    {method: 'DELETE', headers: { authorization: 'Bearer 1234' }})
    const data = await response.json()
    const msg = data.msg
    alert(msg);
  } catch (err) {
    console.error(err)
  }
};


// POST
function submitProd(produto){

  let nome = document.getElementById('nome').value;
  let preco = document.getElementById('preco').value;
  let descricao = document.getElementById('descricao').value
  let categoria = document.getElementById('categoria').value;
  let imagem = document.getElementById('imagem').value;
  let loja = document.getElementById('loja').value
  let condicao = document.getElementById('condicao').value
  let desconto = document.getElementById('desconto').value
  let regiao = document.getElementById('regiao').value
  let galeria = document.getElementById('galeria').value
  let lista = document.getElementById('lista').value
  let pagamento = document.getElementById('pagamento').value

  if(produto === 'madeiramento'){
    let madeira = document.getElementById('madeira').value;
    let medida = document.getElementById('medida').value;

    var data = { nome: nome, madeira: madeira, medida: medida, descricao: descricao, preco: preco, categoria: categoria, imagem: imagem, loja: loja, desconto: desconto, condicao: condicao, pagamento: pagamento, galeria: galeria, lista_descricao: lista, regiao: regiao };
  }if(produto === 'Produto'){
    let quantidade = document.getElementById('quantidade').value;
    var data = { nome: nome, descricao: descricao, preco: preco, categoria: categoria, imagem: imagem, quantidade: quantidade, loja: loja, desconto: desconto, condicao: condicao, pagamento: pagamento, galeria: galeria, lista_descricao: lista, regiao: regiao };
  }
  fetch(`http://localhost:1039/adicionar${produto}`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(mensagem => alert(mensagem.msg))
  .catch(error => {
    console.error('Erro ao inserir dados:', error);
  });
}


const galho = document.querySelectorAll('.tree span')
  galho.forEach(topico => {
    topico.onclick = function(e){
      const ul = topico.nextElementSibling
      const d = ul.style.display
      ul.style.display = d === 'none' ? 'block' : 'none'
    }
  })