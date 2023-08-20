
document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos('produtos', 'Madetex Jundiai', 'section-populares');
  carregarProdutos('madeiramentos', 'Madetex Itupeva', 'section-ofertas');
});

async function carregarProdutos(tipo, loja, destino){
  const response = await fetch(`http://localhost:1039/${tipo}?loja=${encodeURIComponent(loja)}`)
    const data = await response.json()
    CriarCarroselProdutos( tipo, data, destino)
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
window.onload = function() {
  setInterval(() => {
    carregarProduto()
  }, 1000);;
};

function carregarProduto() {
  const cardProd = document.querySelectorAll('.item-carrosel-produtos');
  cardProd.forEach(item => {
    item.addEventListener('click', () => abrirProduto(item))
  });
};

async function abrirProduto(item){
  const id = item.getAttribute('data-id')
  const tipo = item.getAttribute('data-tipo').slice(0, -1)

  const detalhesUrl = `/views/${tipo}.html?id=${encodeURIComponent(id)}&tipo=${encodeURIComponent(tipo)}`;
  window.location.href = detalhesUrl;
};