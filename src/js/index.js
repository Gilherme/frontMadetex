carregarPopulares(); carregarOfertas(); carregarCarrosseis();

async function carregarPopulares(){
  const prod = await getProdutosPopulares(12)
  preencherCarroselProdutos('#section-populares', prod)
}

async function carregarOfertas(){
    const prod = await getProdutosEmOferta(12)
    preencherCarroselProdutos('#section-ofertas', prod)
} 

async function carregarCarrosseis(){
  let loja = "Madetex Campo Limpo Pta"
  const vigamentos =  await getProdutosPorLojaEcategoria(loja, "madeiramentos", 12);
  const telhas =  await getProdutosPorLojaEcategoria(loja, "telhas", 12);
  const tabuas = await getProdutosPorLojaEcategoria(loja, "tabuas", 11);
 
  preencherCarroselProdutos('#section-vigamentos', vigamentos);
  preencherCarroselProdutos('#section-telhas', telhas);
  preencherCarroselProdutos('#section-tabuas', tabuas);
}

// Carrosel
let count = 1;
document.getElementById("radio1").checked = true; 

setInterval(function(){
  nextImage();
}, 5000)

function nextImage(){
  count++;
  if(count > 2){
    count = 1;
  }
  document.getElementById("radio"+ count).checked = true;
}

// carrosel Produtos
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let carrossels = document.querySelectorAll('.container-carrosel');

    carrossels.forEach(carroselContainer => {
      let btnProximo = carroselContainer.querySelector('.btn-proximo');
      let btnAnterior = carroselContainer.querySelector('.btn-anterior');
      let carrosel = carroselContainer.querySelector('.carrosel-interno');

      btnProximo.addEventListener("click", () => {
        carrosel.scrollBy({
          left: +250,
          behavior: 'smooth'
        });
      });

      btnAnterior.addEventListener("click", () => {
        carrosel.scrollBy({
          left: -250,
          behavior: 'smooth'
        });
      });
    });
  }, 1000);
});

// carrosel categorias
const carroselCategoria = document.querySelector('.container-interno-categorias');
let btnProximoCateg = carroselCategoria.querySelector('.btn-proximo');
let btnAnteriorCateg = carroselCategoria.querySelector('.btn-anterior');
let carroselCateg = carroselCategoria.querySelector('.carrosel-categorias');
btnProximoCateg.addEventListener("click", () => {
  carroselCateg.scrollBy({
    left: +165,
    behavior: 'smooth'
  });
});
btnAnteriorCateg.addEventListener("click", () => {
  carroselCateg.scrollBy({
    left: -165,
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    esconderParagrafo()
  }, 5000)
})

// Poup-up whatsApp
function esconderParagrafo(){
  const p = document.getElementsByClassName('p-poupUp-whats')[0]
  p.style.marginRight = `-225.4px`
}
