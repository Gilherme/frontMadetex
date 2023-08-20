window.onload = function() {
  buscarDadosDaLoja();
};

async function buscarDadosDaLoja() {
  const urlParams = new URLSearchParams(window.location.search);

  const loja = urlParams.get('loja');

  const response = await fetch(`http://localhost:1039/homeLoja?loja=${encodeURIComponent(loja)}`);
  const data = await response.json();
  const dados = data[0]

  inserirDadosLoja(dados)
}

function inserirDadosLoja(dados){
  console.log(dados)
  document.querySelector('.endereco').textContent = dados.endereco;
  document.querySelector('.telefone').textContent = dados.telefone;
  document.querySelector('.cidades-frete-gratis').textContent = dados.cidades_frete_gratis;
}