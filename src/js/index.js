
document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos('Madetex Jundiai', 'section-populares');
  carregarProdutos('Madetex Itupeva', 'section-ofertas');
});

async function carregarProdutos(loja, destino){
  const response = await fetch(`http://localhost:1039/produtos?loja=${encodeURIComponent(loja)}`)
    const data = await response.json()
    CriarCarroselProdutos(data, destino)
}

// Abrir Produto Solo
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

  const detalhesUrl = `/views/produto.html?id=${encodeURIComponent(id)}`;
  window.location.href = detalhesUrl;
};

// Carrosel
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

