
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

async function exibirPoPuP(popUp, destino){
  const ap = await getApendice(popUp)
  const dest = document.querySelector(destino)
  dest.innerHTML = ap;
}

async function getApendice(caminho){
  const response = await fetch(`/src/views/apendices/${caminho}`)
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

async function completarEnderecoPeloCep(cep){
  const valorAtual = cep.value;
  const cepFormatado = formatarCEP(valorAtual);
  cep.value = cepFormatado;

  if (cepFormatado.length >= 8) {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepFormatado}`)
    if(!response.ok){
      exibirMensagemAlertaInput(cep, 'CEP inválido')
    }
    else{
    const endereco = await response.json();
    deixarInputVerde(cep, '.msg-erro-cep')
   
    const inputEstado = document.querySelector('#estado');
    const inputCidade = document.querySelector('#cidade');
    const inputBairro = document.querySelector('#bairro');
    const inputRua    = document.querySelector('#rua');
    
    inputEstado.value = endereco.state; 
    inputCidade.value = endereco.city; 
    inputBairro.value = endereco.neighborhood; 
    inputRua.value    = endereco.street; 
  
    document.querySelector('#numero').focus()
    }
  }
}
const preencherFormEnde = (ende) => {
  const e = inputsDoEndereco()
  e.nome = ende.nome; e.cep = ende.cep; e.estado = ende.estado; e.cidade = ende.cidade; e.bairro = ende.bairro; e.rua = ende.rua; e.numero = ende.numero; e.complemento = ende.complemento; e.telefone = ende.telefone;
}
const inputsDoEndereco = () => {
  const nome = document.getElementById('nome'); const cep = document.getElementById('cep'); const estado = document.getElementById('estado'); const cidade = document.getElementById('cidade');const bairro = document.getElementById('bairro');const rua = document.getElementById('rua');  const numero = document.getElementById('numero');  const complemento = document.getElementById('complemento');  const telefone = document.getElementById('telefone');
  return {nome, cep, estado, cidade, bairro, rua, numero, complemento, telefone}
}
const inputsMeuPerfil = () => {
  const nome = document.getElementById('nome');const email = document.getElementById('email');const tel = document.getElementById('telefone');  const dataNasc = document.getElementById('data-nascimento');  const cpf = document.getElementById('cpf');
  return {nome, email, tel, dataNasc, cpf}
}

function separarString(s, separador) {const partes = s.split(separador);return partes}

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

function formatarData(data){
  const dataa = new Date(data);
  const dia = String(dataa.getDate()).padStart(2, '0');
  const mes = String(dataa.getMonth() + 1).padStart(2, '0');
  const ano = dataa.getFullYear();
  
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

function formatarPreco(p) {const p1 = "R$ " + p.toFixed(2).toString().replace(".", ",").substring(); return p1}

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
function desformatarTelefone(telefone) {
  const numerosApenas = telefone.replace(/\D/g, '');
  return numerosApenas;
}

function formatarCPF(input){
  let cpf = input.value.replace(/\D/g, '');

  cpf = cpf.substring(0, 11);

  if (cpf.length >= 3) {
    cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
  }
  if (cpf.length >= 7) {
    cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
  }
  if (cpf.length >= 11) {
    cpf = cpf.substring(0, 11) + '-' + cpf.substring(11);
  }

  // Atualiza o valor no input
  input.value = cpf;
}

function formatarRG(input) {
  let rg = input.value.replace(/\D/g, '');

  rg = rg.substring(0, 9);

  if (rg.length >= 2) {
    rg = rg.substring(0, 2) + '.' + rg.substring(2);
  }
  if (rg.length >= 6) {
    rg = rg.substring(0, 6) + '.' + rg.substring(6);
  }
  if (rg.length >= 9) {
    rg = rg.substring(0, 10) + '-' + rg.substring(10);
  }

  // Atualiza o valor no input
  input.value = rg;
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
