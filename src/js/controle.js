
async function carregarProdutos(cidade){
  const response = await fetch(`http://localhost:1039/produtos${cidade}`)
    const data = await response.json()
    CriarCarroselControle(data, cidade)
}

function CriarCarroselControle(dados, cidade){
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
    editar.textContent = 'Editar';
    img.src = `../assets/img/${ element.imagem}`
    titulo.textContent = element.nome
    preco.textContent = element.preco

    card.appendChild(img)
    card.appendChild(titulo)
    card.appendChild(preco)
    card.appendChild(apagar)
    card.appendChild(editar)

    containerCardsProd.appendChild(card)
  });
  sectionProdutosControle.appendChild(containerCardsProd)
}

const selecionador = document.getElementById('selecionador')
selecionador.addEventListener('click', ()=>{

  const btnApagarProduto = document.querySelectorAll('.apagar');
  btnApagarProduto.forEach(btn => {
    btn.addEventListener('click', () => {
      const cidade = btn.getAttribute("cidade")
      const id = btn.id;
      apagarProduto(id, cidade)
    });
  });
});

async function apagarProduto(id, cidade){
  try {
    const response = await fetch(`http://localhost:1039/delProduto${cidade}/${id}`,
    {method: 'DELETE', headers: { authorization: 'Bearer 1234' }})
    const data = await response.json()
  } catch (err) {
    console.error(err)
  }
};

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