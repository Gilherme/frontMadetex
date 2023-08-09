
// GET
async function carregarProdutos(cidade, produto){
  const response = await fetch(`http://localhost:1039/${produto}${cidade}`)
    const data = await response.json()
    CriarCarroselControle(data, cidade, produto)
}

function CriarCarroselControle(dados, cidade, produto){
  const sectionProdutosControle = document.getElementById('conteudo-controle')
  const containerCardsProd = criarElemento('div', 'container-cards-controle');

  dados.forEach(element => {
    const img = criarElemento('img');
    const card = criarElemento('div', 'card');
    const titulo = criarElemento('h4', 'titulo')
    const preco = criarElemento('p', 'preco')
    const apagar = criarElemento('button', 'apagar')
    const editar = criarElemento('button', 'editar')
    
    apagar.textContent = 'Apagar'; apagar.id = element.id; 
    apagar.setAttribute('cidade', cidade);
    apagar.setAttribute('produto', produto)

    editar.textContent = 'Editar';
    img.src = `../assets/img/${ element.imagem}`

    if(produto == 'madeiramento'){
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

    containerCardsProd.appendChild(card)
  });
  sectionProdutosControle.appendChild(containerCardsProd)
}


// DELETE
const selecionador = document.getElementById('selecionador')
selecionador.addEventListener('click', ()=>{

  const btnApagarProduto = document.querySelectorAll('.apagar');
  btnApagarProduto.forEach(btn => {
    btn.addEventListener('click', () => {
      const cidade = btn.getAttribute("cidade")
      const produto = btn.getAttribute("produto")
      const id = btn.id;
      apagarProduto(id, cidade, produto)
    });
  });

  const btnEditarProduto = document.querySelectorAll('.editar')
  btnEditarProduto.forEach( btn => {
    btn.addEventListener('click', () =>{
      console.log('amigo estou aqui')
    })
  })
});

async function apagarProduto(id, cidade, produto){
  if(produto === 'produtos') produto = 'produto';

  try {
    const response = await fetch(`http://localhost:1039/DEL${produto}${cidade}/${id}`,
    {method: 'DELETE', headers: { authorization: 'Bearer 1234' }})
    const data = await response.json()
  } catch (err) {
    console.error(err)
  }
};


// PUT
function submitProd(produto){

  let nome = document.getElementById('nome').value;
  let preco = document.getElementById('preco').value;
  let descricao = document.getElementById('descricao').value
  let categoria = document.getElementById('categoria').value;
  let imagem = document.getElementById('imagem').value;
  let madetex = document.getElementById('select-madetex').value
  if(produto === 'Madeiramento'){
    let madeira = document.getElementById('madeira').value;
    let medida = document.getElementById('medida').value;
    var data = { nome: nome, madeira: madeira, medida: medida, descricao: descricao, preco: preco, categoria: categoria, imagem: imagem };
  }if(produto === 'Produto'){
    let quantidade = document.getElementById('quantidade').value;
    var data = { nome: nome, descricao: descricao, preco: preco, categoria: categoria, imagem: imagem, quantidade: quantidade };
  }
  console.log(data)
  fetch(`http://localhost:1039/adicionar${produto}${madetex}`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
   alert(result.msg)
  })
  .catch(error => {
    console.error('Erro ao inserir dados:', error);
  });
}


// FERRAMENTAS 
function carregarElemento(caminho, destino){
  fetch(caminho)
    .then( response => response.text())
    .then(htmlContent => {
      document.getElementById(destino).innerHTML = htmlContent
    })
    .catch(error => {
      console.error('Erro ao carregar o conteúdo:', error);
    })
}

function criarElemento(elemento, classe){
  const element = document.createElement(elemento)
  if(elemento == 'img'){
    return element
  }else{
    element.classList.add(classe)
  }
  return element
}

const galho = document.querySelectorAll('.tree span')
  galho.forEach(topico => {
    topico.onclick = function(e){
      const ul = topico.nextElementSibling
      const d = ul.style.display
      ul.style.display = d === 'none' ? 'block' : 'none'
    }
  })