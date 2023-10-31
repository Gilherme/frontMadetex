carregarPopulares(); carregarOfertas();

async function carregarPopulares(){
  const prod = await getProdutosPopulares(12)
  preencherCarroselProdutos('#section-populares', prod)
}

async function carregarOfertas(){
    const prod = await getProdutosEmOferta(12)
    preencherCarroselProdutos('#section-ofertas', prod)
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

// Carrosel madetexs
const carroselMadetexs = document.querySelector('.container-interno-madetexs');
let btnProximoMad = carroselMadetexs.querySelector('.btn-proximo');
let btnAnteriorMad = carroselMadetexs.querySelector('.btn-anterior');
let carroselMad = carroselMadetexs.querySelector('.carrosel-madetexs');
btnProximoMad.addEventListener("click", () => {
  carroselMad.scrollBy({
    left: +260,
    behavior: 'smooth'
  });
});
btnAnteriorMad.addEventListener("click", () => {
  carroselMad.scrollBy({
    left: -260,
    behavior: 'smooth'
  });
});

texts = document.querySelectorAll('.text-logo-mad-carrosel')
pathsLefth = document.querySelectorAll('.path-logo-mad-carrosel-left')
pathsRigth = document.querySelectorAll('.path-logo-mad-carrosel-rigth')

function larguraMaiorQue1300() {

  texts.forEach(tx => {
    tx.setAttribute('y', '32')
  })

  pathsLefth.forEach(path => {
    path.setAttribute('d', 'M 2 50 l 110 -40')
    path.setAttribute('stroke-width', '20')
  })

  pathsRigth.forEach(path => {
    path.setAttribute('d', 'M 105 10 l 120 45')
    path.setAttribute('stroke-width', '20')
  })
}

function larguraMenorQue1300(){

  texts.forEach(tx => {
    tx.setAttribute('y', '24')
  })

  pathsLefth.forEach(path => {
    path.setAttribute('d', 'M 5 35 l 80 -30')
    path.setAttribute('stroke-width', '13')
  })

  pathsRigth.forEach(path => {
    path.setAttribute('d', 'M 80 5 l 80 30')
    path.setAttribute('stroke-width', '13')
  })
}

function verificarLargura() {
  if (window.innerWidth > 1300) {
      larguraMaiorQue1300();
  }else{
    larguraMenorQue1300();
  }
}

window.addEventListener('resize', verificarLargura);

verificarLargura();