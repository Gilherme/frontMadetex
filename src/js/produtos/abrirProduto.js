window.onload = function() {
  setInterval(() => {
    carregarProduto()
  }, 1000);;
};

function carregarProduto() {
  const cardProd = document.querySelectorAll('.card-prod');
  cardProd.forEach(item => {
    item.addEventListener('click', () => abrirProduto(item))
  });
};

async function abrirProduto(item){
  const id = item.getAttribute('data-id')

  const detalhesUrl = `/views/produto.html?id=${encodeURIComponent(id)}`;
  window.location.href = detalhesUrl;
};