buscarDetalhesDoProduto();

async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const response = await fetch(`https://api.madetex.com.br/produto?id=${encodeURIComponent(id)}`);
  const produto = await response.json();

  preencherProduto(produto[0])
}

function preencherProduto(produto) {
  const desconto = produto.desconto.toString().length === 1 ? "0.0" + produto.desconto : '0.' + produto.desconto
  const preco = produto.preco.toFixed(2)
  const precoAvista = (preco - (preco * desconto)).toFixed(2)

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
  let aparelhada = document.getElementById('aparelhada')
  aparelhada.onchange = () => atualizaPreco(produto.preco, desconto)
  pecas.onchange = () => atualizaPreco(produto.preco, desconto);
  comprimento.onchange = () => atualizaPreco(produto.preco, desconto);

  buscarDadosDaLoja(produto.loja)
}

function buscarDadosDaLoja(loja){
  fetch(`https://api.madetex.com.br/homeLoja?loja=${encodeURIComponent(loja)}`)
  .then(response => response.json())
  .then(data => {
    
    preencherMapa(data[0].mapa);
    preencherCidadesFreteGratis(data[0].cidades_frete_gratis);
  })
}

function exibirOpcoesDeTamanho(){
  document.querySelector('.quantidade').style.display = 'none'
  document.querySelector('.opcoesDeTamanho').style.display = 'block'
}

function atualizaPreco(preco, desconto) {

  const precoComDesconto = (preco - (preco * desconto)).toFixed(2)
  
  let aparelhada = document.getElementById('aparelhada').checked
  let pecas = document.getElementById('pecas').value
  let comprimento = document.getElementById('comprimento').value

  let qtdMetros = pecas * comprimento
  if(qtdMetros <= 0) qtdMetros = 1

  let precaoAtual = qtdMetros * precoComDesconto
  let precoNormalAtual = qtdMetros * preco

  if(aparelhada){
    precaoAtual = precaoAtual * 1.1;
    precoNormalAtual = precoNormalAtual * 1.1;
  }

  document.querySelector('.precao').textContent = `R$ ${precaoAtual.toFixed(2).toString().replace('.', ',')}`
  document.querySelector('.preco-antigo').textContent = `R$ ${precoNormalAtual.toFixed(2).toString().replace('.', ',')}`;
  document.querySelector('.preco-parcelado').textContent = `R$ ${precoNormalAtual.toFixed(2).toString().replace('.', ',')}`;
  document.querySelector('#quantidade').value = qtdMetros
}

async function exibirProdutosRelacionados(subCategoria){
  const response = await fetch(`https://api.madetex.com.br/produtos?param=${encodeURIComponent(subCategoria)}&column=sub_categoria&limit=15`)
    const produtos = await response.json()
    CriarCarroselProdutos(produtos, 'recomendados')
}

function preencherLista(listaQualidades){
  const lista = separarString(listaQualidades, " / ")
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

function preencherGaleria(galeriaDeFotos){
  const fotosIndividuais = separarString(galeriaDeFotos, " / ")
  const galeria = document.querySelector('.coluna-fotos')

  for(const link of fotosIndividuais){
    let btn = criarElemento('button', 'btn-galeria')
    let img = document.createElement('img');
    img.src = `../assets/img/${link}`
    btn.appendChild(img)
    galeria.appendChild(btn)
  } 
  var btnGaleria = document.querySelectorAll('.btn-galeria')
  atualizarFotao(btnGaleria[0])
  btnGaleria.forEach( btn => {
  btn.addEventListener('click', () => atualizarFotao(btn))
  })
}


function preencherFormasPag(formasDePagamento){
  const formas = separarString(formasDePagamento, " / ")
  const ulFormaPag = document.querySelector('#formas-pag')
  for(const forma of formas){
    let li = document.createElement('li')
    li.textContent = forma
    ulFormaPag.appendChild(li)
  }
}

function preencherMapa(link){
  document.querySelector('.link-mapa').href = link
}

function preencherCidadesFreteGratis(cidades){
  const cidadesSeparadas = separarString(cidades, ',')
  const listaCidades = document.querySelector('#cidades-frete-gratis')

  for(const cidade of cidadesSeparadas){
    let li = document.createElement('li')
    li.textContent = cidade
    listaCidades.appendChild(li)
  }
}

const btnFormaPag = document.getElementById('btn-formas-pag')
btnFormaPag.addEventListener('click',() => showFormasPag() )

const btnCidadesFreteGratis = document.querySelector('.btn-cidades-frete-gratis')
btnCidadesFreteGratis.addEventListener('click', () => showCidadesFreteGratis())

function showFormasPag(){
  abrirFechar('formas-pag')
  toggleSeta('.setinha')
}

function showCidadesFreteGratis(){
  abrirFechar('cidades-frete-gratis')
  toggleSeta('.seta-frete-gratis')
}


function atualizarFotao(btn){
  const img = btn.querySelector('img') 
  const novoFotao = img.src
  document.querySelector('.fotao img').src = novoFotao
}

const btnAddCarriho = document.querySelector('.add-carrinho')
btnAddCarriho.addEventListener('click', irParaOcarrinhoOuNao)

const btnComprarAgr = document.querySelector('.comprar')
btnComprarAgr.addEventListener('click', irParaOcarrinhoOuNao)

function irParaOcarrinhoOuNao(){

  const userLogado = localStorage.getItem('user')

  if(userLogado){
    const idUsuario = JSON.parse(userLogado).id

    const qtd = document.querySelector('#quantidade').value
    if(qtd < 1){
      alert('Quantidade Inválida')
     }
     else{
      adicionarAoCarrinho(idUsuario, qtd)
      abrir('.ape-irPcarrinho')
      irParaOheader()
      atualizaQtdProdutosNoCar()
     }  
  }else{
    abrir('.ape-faca-login')
    irParaOheader();
  }
}

async function adicionarAoCarrinho(idUsuario, qtd){
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id'); 
  const pecas = document.getElementById('pecas').value
  const aparelhada = document.getElementById('aparelhada').checked

  const produto = {usuario_ID: idUsuario, produto_ID: produtoId, quantidade: qtd, pecas: pecas || null, aparelhada: aparelhada}

  // fetch(`http://localhost:1039/adicionarAoCarrinho`,{
  fetch(`https://api.madetex.com.br/adicionarAoCarrinho`,{
   method: 'POST',
   headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
   body: JSON.stringify(produto)
   })
  .then(response => response.json())
  .catch(error => console.log(error))
}

// seta do carrosel
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let carrossels = document.querySelectorAll('.container-carrosel');

    carrossels.forEach(carroselContainer => {
      let btnProximo = carroselContainer.querySelector('.btn-proximo');
      let btnAnterior = carroselContainer.querySelector('.btn-anterior');
      let carrosel = carroselContainer.querySelector('.carrosel-interno');

      btnProximo.addEventListener("click", () => {
        carrosel.scrollBy({
          left: +230,
          behavior: 'smooth'
        });
      });

      btnAnterior.addEventListener("click", () => {
        carrosel.scrollBy({
          left: -230,
          behavior: 'smooth'
        });
      });
    });
  }, 1000);
});
