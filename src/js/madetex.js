
buscarDadosDaLoja();

async function buscarDadosDaLoja() {
  const urlParams = new URLSearchParams(window.location.search);
  const loja = urlParams.get('loja').replace('_', ' ').replace('_', ' ');

  const response = await fetch(`http://localhost:1039/homeLoja?loja=${encodeURIComponent(loja)}`);
  const data = await response.json();
  const dados = data[0];

  inserirDadosLoja(dados)
}

function inserirDadosLoja(dados){

  document.querySelector('.banner img').src = `../assets/${dados.banner}`
  document.querySelector('.endereco').textContent = dados.endereco;
  document.querySelector('.telefone').textContent = dados.telefone;
  document.querySelector('.cidades-frete-gratis').textContent = dados.cidades_frete_gratis;
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('loja');

  let loja = data; 
    while (loja.includes('_')) {
    loja = loja.replace('_', ' ');
  }

  carregarProdutos(loja, 'telhas', 'section-telhas');
  carregarProdutos(loja, 'madeiramentos', 'section-madeiramento');
});

async function carregarProdutos(loja, categoria, destino){
  const response = await fetch(`http://localhost:1039/produtosPorLoja?loja=${encodeURIComponent(loja)}&categoria=${encodeURIComponent(categoria)}`)
    const data = await response.json()
    CriarCarroselProdutos(data, destino)
}




