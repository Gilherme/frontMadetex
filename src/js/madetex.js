
buscarDadosDaLoja();

async function buscarDadosDaLoja() {
  const urlParams = new URLSearchParams(window.location.search);
  const loja = urlParams.get('loja');

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

  carregarProdutos(loja, 'mais-vendidos-da-loja');
  carregarProdutos(loja, 'section-telhas');
  carregarProdutos(loja, 'section-madeiramento');
  carregarProdutos(loja, 'section-acessorios');
});

async function carregarProdutos(loja, destino){
  const response = await fetch(`http://localhost:1039/produtos?loja=${encodeURIComponent(loja)}`)
    const data = await response.json()
    CriarCarroselProdutos(data, destino)
}




