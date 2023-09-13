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

function separarString(string, separador){
  const partes = string.split(separador);
  return partes
}

function exibirMensagemAlertaInput(input, mensagem, destino){
  // const btn = document.getElementById(input)
  const dest = document.querySelector(destino)
  // console.log(btn)
  input.style.borderColor = "red"
  dest.textContent = mensagem
}

function limitarString(texto, limite) {
  if (texto.length <= limite) {
      return texto;
  } else {
      return texto.slice(0, limite - 3) + "...";
  }
}
// Carrosel Produtos 
function CriarCarroselProdutos(data, destino){

  const containerProdutos = criarElemento('div', 'container-produtos');
  const containerCarroselProdutos = criarElemento('div', 'container-carrosel');
  const carroselProdutos = criarElemento('div', 'carrosel-interno');
  const btnProdutosD = criarElemento('div', 'bnt-produtos');
  const btnProdutosE = criarElemento('div', 'bnt-produtos');
  const btnProximo = criarElemento('button','btn-proximo' );  btnProximo.innerHTML = '&#10095'; 
  const btnAnterior = criarElemento('button', 'btn-anterior'); btnAnterior.innerHTML = '&#10094;';
  
  btnProdutosD.appendChild(btnProximo)
  btnProdutosE.appendChild(btnAnterior)
  
  const secaoProdutos = document.getElementById(destino)

  const produtosInseridos = {}
  data.forEach(produto => {
    if(!produtosInseridos[produto.nome]){
    const itemCarroselProdutos = criarElemento('div', 'card-prod');
    const imgProduto = criarElemento('div', 'img-produto');
    const img = criarElemento('img');
    const nome = criarElemento('p', 'titulo');
    const loja = criarElemento('p', 'loja')
    const preco = criarElemento('p', 'preco-produto' );
    const parcelamento = criarElemento('p', 'parcelamento');
    const oferta = criarElemento('span', 'produto-oferta'); oferta.textContent = 'oferta'

    itemCarroselProdutos.setAttribute('data-id', produto.id)

    const imgs = separarString(produto.galeria, " / ")
    img.src = `../assets/img/${imgs[0]}`
    nome.textContent =  limitarString(produto.nome, 42)
    preco.textContent = `R$ ${produto.preco.toFixed(2).toString().replace('.', ',')}`
    parcelamento.textContent = 'em até 10x sem juros'
    loja.textContent = `Vendido por ${produto.loja}`
    
    imgProduto.appendChild(img)
    itemCarroselProdutos.appendChild(imgProduto)
    if(produto.oferta){
      preco.appendChild(oferta)
      itemCarroselProdutos.appendChild(preco)
    }else{
      itemCarroselProdutos.appendChild(preco)
    }
    itemCarroselProdutos.appendChild(parcelamento)
    itemCarroselProdutos.appendChild(nome)
    itemCarroselProdutos.appendChild(loja)
    carroselProdutos.appendChild(itemCarroselProdutos)
    produtosInseridos[produto.nome] = true;
    }
  })

  containerCarroselProdutos.appendChild(btnProdutosE)
  containerCarroselProdutos.appendChild(carroselProdutos)
  containerCarroselProdutos.appendChild(btnProdutosD)
  containerProdutos.appendChild(containerCarroselProdutos)

  secaoProdutos.appendChild(containerProdutos);
}


function toggleSeta(seta) {
  const setinha = document.querySelector(seta);
  
  if (setinha.classList.contains('seta-open')) {
    setinha.classList.remove('seta-open');
  } else {
    setinha.classList.add('seta-open');
  }
}



