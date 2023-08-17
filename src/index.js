
document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos('produtos', 'Madetex Jundiai', 'section-populares');
  carregarProdutos('produtos', 'Madetex Itupeva', 'section-ofertas');
});

async function carregarProdutos(tipo, loja, destino){
  const response = await fetch(`http://localhost:1039/${tipo}?loja=${encodeURIComponent(loja)}`)
    const data = await response.json()
    CriarCarroselProdutos( tipo, data, destino)
}

function CriarCarroselProdutos(tipo, data, destino){

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
    const loja = criarElemento('p', 'loja')
    const preco = criarElemento('p', 'preco-produto' );
    const parcelamento = criarElemento('p', 'parcelamento');

    itemCarroselProdutos.setAttribute('data-tipo', tipo)
    itemCarroselProdutos.setAttribute('data-id', produto.id)
    img.src = `./assets/img/${produto.imagem}`
    if(tipo == 'madeiramentos'){
      nome.textContent =  ` ${produto.nome} ${produto.madeira} ${produto.medida}`
    }else{
      nome.textContent = produto.nome
    }
    preco.textContent = `R$ ${produto.preco.toFixed(2).toString().replace('.', ',')}`
    parcelamento.textContent = 'em até 10x sem juros'
    loja.textContent = `Vendido por ${produto.loja}`

    imgProduto.appendChild(img)
    itemCarroselProdutos.appendChild(imgProduto)
    itemCarroselProdutos.appendChild(preco)
    itemCarroselProdutos.appendChild(parcelamento)
    itemCarroselProdutos.appendChild(nome)
    itemCarroselProdutos.appendChild(loja)
    carroselProdutos.appendChild(itemCarroselProdutos)
  })

  containerCarroselProdutos.appendChild(btnProdutosE)
  containerCarroselProdutos.appendChild(carroselProdutos)
  containerCarroselProdutos.appendChild(btnProdutosD)
  containerProdutos.appendChild(containerCarroselProdutos)

  secaoProdutos.appendChild(containerProdutos);
}


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


// Produto solo
function carregarProduto() {
  const cardProd = document.querySelectorAll('.item-carrosel-produtos');
  cardProd.forEach(item => {
    item.addEventListener('click', () => abrirProduto(item))
  });
};

async function abrirProduto(item){
  const id = item.getAttribute('data-id')
  const tipo = item.getAttribute('data-tipo').slice(0, -1)
  const response = await fetch(`http://localhost:1039/${tipo}?id=${encodeURIComponent(id)}`)
  const data = await response.json()

  const detalhesUrl = `/views/produto.html?id=${encodeURIComponent(id)}&tipo=${encodeURIComponent(tipo)}`;
  window.location.href = detalhesUrl;
};

window.onload = function() {
  setInterval(() => {
    carregarProduto()
  }, 1000);;
};