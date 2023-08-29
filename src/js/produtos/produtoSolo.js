
window.onload = function() {
  buscarDetalhesDoProduto();
};

async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const response = await fetch(`http://localhost:1039/produto?id=${encodeURIComponent(id)}`);
  const produto = await response.json();
  preencherProduto(produto[0])
}

function preencherProduto(produto) {
  const desconto = produto.desconto.toString().length === 1 ? "0.0" + produto.desconto : '0.' + produto.desconto
  const preco = produto.preco.toFixed(2)
  const precoAvista = (preco - (preco * desconto)).toFixed(2)

  document.querySelector('.fotao img').src = `../assets/img/${produto.imagem}`;
  document.querySelector('.descricao h1').textContent = produto.nome;
  document.querySelector('.preco-antigo').textContent = `R$ ${preco.toString().replace('.', ',')}`;
  document.querySelector('.precao').textContent = `R$ ${precoAvista.toString().replace('.', ',')}`;
  document.querySelector('.condicao').textContent = produto.condicao;
  document.querySelector('.preco-parcelado').textContent = `R$ ${preco.toString().replace('.', ',')}`;

  preencherGaleria(produto.galeria)
  preencherLista(produto.lista_descricao)
  preencherFormasPag(produto.pagamento)

  document.querySelector('.loja').textContent = produto.loja
  document.querySelector('.entregue span').textContent = produto.loja
  document.querySelector('.estoque').textContent = `(${produto.quantidade} unidades)`

  if(produto.categoria == "madeiramentos"){
    exibirOpcoesDeTamanho()
  }

  exibirProdutosRelacionados(produto.sub_categoria)

  let pecas = document.getElementById('pecas')
  let comprimento = document.getElementById('comprimento')
  pecas.onchange = () => atualizaPreco(produto.preco, desconto);
  comprimento.onchange = () => atualizaPreco(produto.preco, desconto);
}

function exibirOpcoesDeTamanho(){
  document.querySelector('.quantidade').style.display = 'none'
  document.querySelector('.opcoesDeTamanho').style.display = 'block'
}

function atualizaPreco(preco, desconto) {

  const precoComDesconto = (preco - (preco * desconto)).toFixed(2)
  
  let pecas = document.getElementById('pecas').value
  let comprimento = document.getElementById('comprimento').value

  let qtdMetros = pecas * comprimento
  if(qtdMetros <= 0) qtdMetros = 1

  let precaoAtual = qtdMetros * precoComDesconto
  let precoNormalAtual = qtdMetros * preco

  document.querySelector('.precao').textContent = `R$ ${precaoAtual.toFixed(2).toString().replace('.', ',')}`
  document.querySelector('.preco-antigo').textContent = `R$ ${precoNormalAtual.toFixed(2).toString().replace('.', ',')}`;
  document.querySelector('.preco-parcelado').textContent = `R$ ${precoNormalAtual.toFixed(2).toString().replace('.', ',')}`;
}

async function exibirProdutosRelacionados(subCategoria){
  const response = await fetch(`http://localhost:1039/produtos?param=${encodeURIComponent(subCategoria)}&column=sub_categoria`)
    const produtos = await response.json()
    CriarCarroselProdutos(produtos, 'recomendados')
}

// Calcular frete
// const btnFrete = document.querySelector('.btn-frete')
// btnFrete.addEventListener('click', calcularFrete)
// function calcularFrete(){
//   console.log( 'Amigo estou aqu')
// }

function separarString(string){
  const partes = string.split(" / ");
  return partes
}

function preencherLista(dado){
  const lista = separarString(dado)
  const ul = document.querySelector('.sobre ul')

  for(const item of lista){
    let li = document.createElement('li')
    let span = document.createElement('span')
    span.classList.add('a')
    span.textContent = item
    li.appendChild(span)
    ul.appendChild(li)
  }
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

const btnFormaPag = document.getElementById('btn-formas-pag')
btnFormaPag.addEventListener('click',() => showFormasPag() )

function showFormasPag(){
  abrirFechar('formas-pag')
  toggleSeta('.setinha')
}

function toggleSeta(seta) {
  const setinha = document.querySelector(seta);
  
  if (setinha.classList.contains('seta-open')) {
    setinha.classList.remove('seta-open');
  } else {
    setinha.classList.add('seta-open');
  }
}


