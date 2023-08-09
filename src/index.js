
document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos('Jundiai', 'Produtos', 'section-populares');
  carregarProdutos('Jundiai', 'Produtos', 'section-ofertas');
});

async function carregarProdutos(cidade, produto, destino){
  const response = await fetch(`http://localhost:1039/${produto}${cidade}`)
    const data = await response.json()
    CriarCarroselProdutos(cidade, produto, data, destino)
}

function CriarCarroselProdutos(cidade, produto, data, destino){

  const containerProdutos = criarElemento('div', 'container-produtos');
  const containerCarroselProdutos = criarElemento('div', 'container-carrosel-produtos');
  const carroselProdutos = criarElemento('div', 'carrosel-produtos');
  const btnProdutosD = criarElemento('div', 'bnt-produtos');
  const btnProdutosE = criarElemento('div', 'bnt-produtos');
  const btnProximo = criarElemento('button','btn-proximo' );  btnProximo.innerHTML = '&#10095'; 
  const btnAnterior = criarElemento('button', 'btn-anterior'); btnAnterior.innerHTML = '&#10094;';
  
  btnProdutosD.appendChild(btnProximo)
  btnProdutosE.appendChild(btnAnterior)
  
  const secaoProdutos = document.getElementById(destino)

  data.forEach(produto => {
    const itemCarroselProdutos = criarElemento('div', 'item-carrosel-produtos');
    const imgProduto = criarElemento('div', 'img-produto');
    const img = criarElemento('img');
    const nome = criarElemento('p', 'titulo');
    const preco = criarElemento('p', 'preco-produto' );
    const parcelamento = criarElemento('p', 'parcelamento');

    img.src = `./assets/img/${produto.imagem}`
    if(produto == 'madeiramento'){
      nome.textContent =  ` ${produto.nome} ${produto.madeira} ${produto.medida}`
    }else{
      nome.textContent = produto.nome
    }
    preco.textContent = `R$ ${produto.preco.toString().replace('.', ',')}`
    parcelamento.textContent = 'em até 10x sem juros'

    imgProduto.appendChild(img)
    itemCarroselProdutos.appendChild(imgProduto)
    itemCarroselProdutos.appendChild(preco)
    itemCarroselProdutos.appendChild(parcelamento)
    itemCarroselProdutos.appendChild(nome)
    carroselProdutos.appendChild(itemCarroselProdutos)
  })

  containerCarroselProdutos.appendChild(btnProdutosE)
  containerCarroselProdutos.appendChild(carroselProdutos)
  containerCarroselProdutos.appendChild(btnProdutosD)
  containerProdutos.appendChild(containerCarroselProdutos)

  secaoProdutos.appendChild(containerProdutos);
}


// ABRIR FECHAR 
const apendiceEntre = document.querySelector('.area-usuario .usuario')
apendiceEntre.addEventListener('mouseover', () => abrirFechar('apendice-cadastrese'))
apendiceEntre.addEventListener('mouseout', () => abrirFechar('apendice-cadastrese'))
const btnMenu = document.getElementById('btn-menu')
const btnX = document.getElementById('btn-x')
btnMenu.addEventListener('click', () => abrirFechar('menu-mobile'));
btnX.addEventListener('click', () => abrirFechar('menu-mobile'))

// SLIDER
let count = 1;
document.getElementById("radio1").checked = true; 

setInterval(function(){
  nextImage();
}, 5000)

function nextImage(){
  count++;
  if(count > 3){
    count = 1;
  }
  document.getElementById("radio"+ count).checked = true;
}

// FERRAMENTAS
function criarElemento(elemento, classe){
  const element = document.createElement(elemento)
  if(elemento == 'img'){
    return element
  }else{
    element.classList.add(classe)
  }
  return element
}

function abrirFechar(elemento) {
  const el = document.getElementById(elemento)
  const computedStyle = window.getComputedStyle(el);
  const currentDisplay = computedStyle.display;

  if (currentDisplay === 'none') {
    el.style.display = 'block'; 
  } else {
    el.style.display = 'none';
  }
}


