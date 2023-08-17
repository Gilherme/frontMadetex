function abrirFechar(elemento) {
  const el = document.getElementById(elemento)
  const computedStyle = window.getComputedStyle(el);
  const currentDisplay = computedStyle.display;

  if (currentDisplay === 'none') {
    el.style.display = 'block'; 
  } else {
    el.style.display = 'none';
  }
}

function criarElemento(elemento, classe){
  const element = document.createElement(elemento)
  if(elemento == 'img'){
    return element
  }else{
    element.classList.add(classe)
  }
  return element
}

function carregarElemento(caminho, destino){
  fetch(caminho)
    .then( response => response.text())
    .then(htmlContent => {
      document.getElementById(destino).innerHTML = htmlContent
    })
    .catch(error => {
      console.error('Erro ao carregar o conteúdo:', error);
    })
}