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

const launchDate = new Date('2024-01-15T00:00:00').getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      function addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
      }

      const days = addLeadingZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
      const hours = addLeadingZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = addLeadingZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = addLeadingZero(Math.floor((distance % (1000 * 60)) / 1000));

      document.querySelector('.timer').textContent = `${days}:${hours}:${minutes}:${seconds}`;

      if (distance < 0) {
        clearInterval(countdown);
        document.getElementById('.timer').innerHTML = 'Lançamento!';
      }
    }, 1000);