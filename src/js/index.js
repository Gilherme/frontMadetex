
carregarProdutos();

function carregarProdutos(){
  carregarPopulares()
  carregarOfertas()
}

async function carregarPopulares(){
  const response = await fetch(`http://localhost:1039/produtosPopulares?limit=20`)
  const data = await response.json()
  CriarCarroselProdutos(data, 'section-populares')
}

async function carregarOfertas(){
    const response = await fetch(`http://localhost:1039/produtosEmOferta`)
    const data = await response.json()
    CriarCarroselProdutos(data, 'section-ofertas')
} 

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

// Carrosel madetexs
const carroselMadetexs = document.querySelector('.container-interno-madetexs');
let btnProximoMad = carroselMadetexs.querySelector('.btn-proximo');
let btnAnteriorMad = carroselMadetexs.querySelector('.btn-anterior');
let carroselMad = carroselMadetexs.querySelector('.carrosel-madetexs');
btnProximoMad.addEventListener("click", () => {
  carroselMad.scrollBy({
    left: +165,
    behavior: 'smooth'
  });
});
btnAnteriorMad.addEventListener("click", () => {
  carroselMad.scrollBy({
    left: -165,
    behavior: 'smooth'
  });
});
