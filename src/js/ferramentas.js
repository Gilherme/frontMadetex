
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
function fechar(elemento){
  document.querySelector(elemento).style.display = 'none'
}
function abrir(elemento){
  document.querySelector(elemento).style.display = 'block'
}
function irParaOheader(){
  let header = document.querySelector('header');
  if(header){header.scrollIntoView({ behavior: 'smooth' });}
}

async function getApendice(caminho){
  const response = await fetch(caminho)
  const ape = await response.text()
  return ape
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

function exibirMensagemAlertaInput(elemento, mensagem){
  const el = document.querySelector(elemento)
  const dest = el.nextElementSibling;

  el.style.borderColor = "red"
  el.style.outline = "2px solid red"

  dest.textContent = mensagem
  el.focus()
}

function mostrarSenha(elemento){
  let inputSenha = document.querySelector(elemento);
  
  if (inputSenha.getAttribute('type') === 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
}

function deixarInputVerde(input){
  input.style.borderColor = "green"
  input.style.outline = "2px solid green"

  const el = input.nextElementSibling;
  if(el){
    el.style.display = 'none'
  }
  
}

function formatarCEP(cep) {
  cep = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  cep = cep.substring(0, 8); // Limita o cep a 8 dígitos
  
  // Insere pontos e traço na formatação do cep
  if (cep.length >= 5) {
    cep = cep.replace(/(\d{5})(\d{3})$/, '$1-$2');
  }
  
  return cep;
}

function formatarTelefone(input) {
  var numero = input.value.replace(/\D/g, '');
  var numeroFormatado = '';

  if (numero.length > 0) {
    numeroFormatado += '(' + numero.substring(0, 2);
  }
  if (numero.length >= 3) {
    numeroFormatado += ') ' + numero.substring(2, 7);
  }
  if (numero.length > 7) {
    numeroFormatado += '-' + numero.substring(7, 11);
  }

  input.value = numeroFormatado;
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
