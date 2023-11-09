
buscarDadosDaLoja();

async function buscarDadosDaLoja() {
  const urlParams = new URLSearchParams(window.location.search);
  const loja = urlParams.get('loja').replace('_', ' ').replace('_', ' ').replace('_', ' ');

  const response = await fetch(`https://api.madetex.com.br/homeLoja?loja=${encodeURIComponent(loja)}`);
  const data = await response.json();
  const dados = data[0];

  inserirDadosLoja(dados)
}

function inserirDadosLoja(dados){

  const divBanner = document.querySelector('.banner'); divBanner.firstElementChild.remove();
  const img = document.createElement('img');
  img.src = `../assets/${dados.banner}`;
  img.classList.add('img-banner')
  divBanner.appendChild(img)
  document.querySelector('.endereco').textContent = dados.endereco;
  document.querySelector('.telefone').textContent = dados.telefone;
  document.querySelector('.cidades-frete-gratis').textContent = dados.cidades_frete_gratis;
}



preencherProdutos()
async function preencherProdutos(){
  const urlParams = new URLSearchParams(window.location.search);
  const loja = urlParams.get('loja').replace('_', ' ').replace('_', ' ').replace('_', ' ');

  const produtos = await getProdutosPopularesPorLoja(loja, 12)
  const prod = await getProdutosEmOfertaPorLoja(loja)
  preencherCarroselProdutos('#section-populares', produtos)
  preencherCarroselProdutos('#section-oferta', prod)
}
  




document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let carrossels = document.querySelectorAll('.container-carrosel');

    carrossels.forEach(carroselContainer => {
      let btnProximo = carroselContainer.querySelector('.btn-proximo');
      let btnAnterior = carroselContainer.querySelector('.btn-anterior');
      let carrosel = carroselContainer.querySelector('.carrosel-interno');

      btnProximo.addEventListener("click", () => {
        carrosel.scrollBy({
          left: +230,
          behavior: 'smooth'
        });
      });

      btnAnterior.addEventListener("click", () => {
        carrosel.scrollBy({
          left: -230,
          behavior: 'smooth'
        });
      });
    });
  }, 1000);
});