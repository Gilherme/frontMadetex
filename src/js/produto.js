
window.onload = function() {
  buscarDetalhesDoProduto();
};

async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const tipo = urlParams.get('tipo');

  const response = await fetch(`http://localhost:1039/${tipo}?id=${encodeURIComponent(id)}`);
  const data = await response.json();
  preencherProduto(data[0])

}


function preencherProduto(dados) {
    
  const desconto = dados.desconto.toString().length === 1 ? "0.0" + dados.desconto : '0.' + dados.desconto
  const preco = dados.preco.toFixed(2)
  const precoAvista = (preco - (preco * desconto)).toFixed(2)

  document.querySelector('.fotao img').src = `../assets/img/${dados.imagem}`;
  document.querySelector('.descricao h1').textContent = dados.nome;
  document.querySelector('.preco-antigo').textContent = `R$ ${preco.toString().replace('.', ',')}`;
  document.querySelector('.precao').textContent = `R$ ${precoAvista.toString().replace('.', ',')}`;
  document.querySelector('.condicao').textContent = dados.condicao;
  document.querySelector('.preco-parcelado').textContent = `R$ ${preco.toString().replace('.', ',')}`;

  preencherGaleria(dados.galeria)
  preencherLista(dados.lista_descricao)
  preencherFormasPag(dados.pagamento)

  document.querySelector('.loja').textContent = dados.loja
  document.querySelector('.entregue span').textContent = dados.loja
  document.querySelector('.estoque').textContent = `(${dados.quantidade} unidades)`

}

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

