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

function primeiraMaiuscula(string){
  const resultado = string[0].toUpperCase() + string.substring(1);
  return resultado
}

// Preenchimento de produtos e madeiramentos 
function separarString(string){
  const partes = string.split(" / ");
  return partes
}

function preencherGaleria(dado){
  const dadosDivididos = separarString(dado)
  const galeria = document.querySelector('.coluna-fotos')

  for(const link of dadosDivididos){
    let img = document.createElement('img');
    img.src = `../assets/img/${link}`
    galeria.appendChild(img)
  } 
}

function preencherFormasPag(dado){
  const formas = separarString(dado)
  const ulFormaPag = document.querySelector('#formas-pag')
  for(const forma of formas){
    let li = document.createElement('li')
    li.textContent = forma
    ulFormaPag.appendChild(li)
  }
}

// Carrosel Produtos 
function CriarCarroselProdutos(tipo, data, destino){

  const containerProdutos = criarElemento('div', 'container-produtos');
  const containerCarroselProdutos = criarElemento('div', 'container-carrosel-produtos');
  const carroselProdutos = criarElemento('div', 'carrosel-produtos');
  const btnProdutosD = criarElemento('div', 'bnt-produtos');
  const btnProdutosE = criarElemento('div', 'bnt-produtos');
  const btnProximo = criarElemento('button','btn-proximo' );  btnProximo.innerHTML = '&#10095'; 
  const btnAnterior = criarElemento('button', 'btn-anterior'); btnAnterior.innerHTML = '&#10094;';
  
  btnProdutosD.appendChild(btnProximo)
  btnProdutosE.appendChild(btnAnterior)
  
  const secaoProdutos = document.getElementById(destino)

  data.forEach(produto => {
    const itemCarroselProdutos = criarElemento('div', 'item-carrosel-produtos');
    const imgProduto = criarElemento('div', 'img-produto');
    const img = criarElemento('img');
    const nome = criarElemento('p', 'titulo');
    const loja = criarElemento('p', 'loja')
    const preco = criarElemento('p', 'preco-produto' );
    const parcelamento = criarElemento('p', 'parcelamento');

    itemCarroselProdutos.setAttribute('data-tipo', tipo)
    itemCarroselProdutos.setAttribute('data-id', produto.id)

    img.src = `./assets/img/${produto.imagem}`
    if(tipo == 'madeiramentos'){
      nome.textContent =  ` ${produto.nome} ${produto.madeira} ${produto.medida}`
    }else{
      nome.textContent = produto.nome
    }
    preco.textContent = `R$ ${produto.preco.toFixed(2).toString().replace('.', ',')}`
    parcelamento.textContent = 'em até 10x sem juros'
    loja.textContent = `Vendido por ${produto.loja}`

    imgProduto.appendChild(img)
    itemCarroselProdutos.appendChild(imgProduto)
    itemCarroselProdutos.appendChild(preco)
    itemCarroselProdutos.appendChild(parcelamento)
    itemCarroselProdutos.appendChild(nome)
    itemCarroselProdutos.appendChild(loja)
    carroselProdutos.appendChild(itemCarroselProdutos)
  })

  containerCarroselProdutos.appendChild(btnProdutosE)
  containerCarroselProdutos.appendChild(carroselProdutos)
  containerCarroselProdutos.appendChild(btnProdutosD)
  containerProdutos.appendChild(containerCarroselProdutos)

  secaoProdutos.appendChild(containerProdutos);
}
