window.onload = function() {
  buscarDetalhesDoProduto();
};

async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const tipo = urlParams.get('tipo');

  const response = await fetch(`http://localhost:1039/${tipo}?id=${encodeURIComponent(id)}`);
  const data = await response.json();

  preencherMadeiramento(data[0])
}

function preencherMadeiramento(dados) {
    
  const desconto = dados.desconto.toString().length === 1 ? "0.0" + dados.desconto : '0.' + dados.desconto
  const preco = dados.preco.toFixed(2)
  const precoAvista = (preco - (preco * desconto)).toFixed(2)

  document.querySelector('.fotao img').src = `../assets/img/${dados.imagem}`;
  document.querySelector('.descricao h1').textContent = `${dados.nome} ${dados.madeira} ${dados.medida}`;
  document.querySelector('.preco-antigo').textContent = `R$ ${preco.toString().replace('.', ',')}`;
  document.querySelector('.precao').textContent = `R$ ${precoAvista.toString().replace('.', ',')}`;
  document.querySelector('.condicao').textContent = dados.condicao;
  document.querySelector('.preco-parcelado').textContent = `R$ ${preco.toString().replace('.', ',')}`;

  preencherGaleria(dados.galeria)
  preencherFormasPag(dados.pagamento)

  document.querySelector('.loja').textContent = dados.loja
  document.querySelector('.entregue span').textContent = dados.loja

  // Atualizar preço
  let pecas = document.getElementById('pecas')
  let comprimento = document.getElementById('comprimento')
  pecas.onchange = () => atualizaPreco(dados.preco, desconto);
  comprimento.onchange = () => atualizaPreco(dados.preco, desconto);
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

const btnFrete = document.querySelector('.btn-frete')

btnFrete.addEventListener('click', calcularFrete)
// Função calcular frete
function calcularFrete(){
  console.log( 'Amigo estou aqu')
}

// Função repetida - produto.js
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
