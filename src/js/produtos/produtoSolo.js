buscarDetalhesDoProduto();

async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const produto = await getProdutoPorId(id)

  preencherProduto(produto[0])
}

function preencherProduto(prod) {
  const desconto = prod.desconto.toString().length === 1 ? "0.0" + prod.desconto : '0.' + prod.desconto
  const preco = prod.preco.toFixed(2)
  const precoAvista = (preco - (preco * desconto)).toFixed(2)

  document.querySelector('.descricao h1').textContent = prod.nome;
  document.querySelector('.preco-antigo').textContent = `R$ ${preco.toString().replace('.', ',')}`;
  document.querySelector('.precao').textContent = `R$ ${precoAvista.toString().replace('.', ',')}`;
  document.querySelector('.condicao').textContent = prod.condicao;
  document.querySelector('.preco-parcelado').textContent = `R$ ${preco.toString().replace('.', ',')}`;

  preencherGaleria(prod.galeria)
  preencherLista(prod.lista_descricao)
  preencherFormasPag(prod.pagamento)

  document.querySelector('.loja').textContent = prod.loja
  document.querySelector('.entregue span').textContent = prod.loja
  document.querySelector('.estoque').textContent = `(${prod.quantidade} unidades)`

  let vari = prod.tipo_variacao;
  exibirVariacao(vari)

  exibirProdutosRelacionados(prod.sub_categoria)

  if(vari == "comum"){
    quantidadeMaiorQzero()
  }
  if(vari == "apQtd"){
    quantidadeMaiorQzero()
    const ap  = document.getElementById('aparelhada')
    const qtd = document.getElementById('quantidade')
    ap.onchange  = () => atualizaPrecoApQtd(prod.preco, desconto);
    qtd.onchange = () => atualizaPrecoApQtd(prod.preco, desconto)
  }
  if(vari == "apComp"){
    quantidadeMaiorQzero(true)
    const pecas       = document.getElementById('pecas')
    const comprimento = document.getElementById('comprimento')
    const aparelhada  = document.getElementById('aparelhada')
    aparelhada.onchange  = () => atualizaPreco(prod.preco, desconto)
    pecas.onchange       = () => atualizaPreco(prod.preco, desconto);
    comprimento.onchange = () => atualizaPreco(prod.preco, desconto);
  }
  if(vari == "apMed"){
    quantidadeMaiorQzero()
    preencherMedidas(prod.variacao, desconto)
    const ap  = document.getElementById('aparelhada')
    ap.onchange  = () => atualizaPrecoApMed(desconto);
  }
  if(vari == 'medidas'){
    quantidadeMaiorQzero()
    preencherMedidas(prod.variacao, desconto)
  }

  preencherDadosDaLoja(prod.loja)
}

async function preencherDadosDaLoja(loja){
  const response = await fetch(`https://api.madetex.com.br/homeLoja?loja=${encodeURIComponent(loja)}`)
    const data = await response.json();
    if(!response.ok){alert('erro ao pegar dados da loja')}
    else{

      document.getElementsByClassName('link-mapa')[0].href = data[0].mapa;
      const cidadesSeparadas = separarString(data[0].cidades_frete_gratis, ',')
      const listaCidades = document.querySelector('#cidades-frete-gratis')

      for(const cidade of cidadesSeparadas){
        let li = document.createElement('li')
        li.textContent = cidade
        listaCidades.appendChild(li)
      }
    }  
}

function exibirVariacao(variacao){
  switch (variacao) {
    case "comum":
      document.getElementsByClassName('quantidade')[0].style.display = 'block';
      break;
    case "apQtd":
      document.getElementsByClassName('label-qtd')[0].textContent = 'Metros lineares'
      document.getElementsByClassName('quantidade')[0].style.display = 'block';
      document.getElementsByClassName('aparelhada')[0].style.display = 'block'
      break;
    case "apComp":
      document.getElementsByClassName('aparelhada')[0].style.display = 'block';
      document.getElementsByClassName('pecas')[0].style.display = 'block';
      document.getElementsByClassName('comprimento')[0].style.display = 'block';
      break;
    case "medidas":
      document.getElementsByClassName("quantidade")[0].style.display = 'block';
      document.getElementsByClassName('medidas')[0].style.display = 'block';
      break;
    case "apMed":
      document.getElementsByClassName('label-medidas')[0].textContent = 'Largura: ';
      document.getElementsByClassName('medidas')[0].style.display = 'block';
      document.getElementsByClassName("quantidade")[0].style.display = 'block';
      document.getElementsByClassName("aparelhada")[0].style.display = "block"
      break;
    default:
      alert(variacao);
  }
}

function preencherMedidas(med, desconto){
  let m = separarString(med, ' / ')
  let objMed = {}
  m.forEach(item => {
    const [medida, preco] = item.split("/=").map(value => value.trim());
    objMed[medida] = parseFloat(preco);
  });

  const selectMedidas = document.getElementById("medida");
  for (const medida in objMed) {
    const option = document.createElement("option");
    option.value = medida;
    option.text = medida;
    selectMedidas.add(option);
  }

  // Atualiza medida
  selectMedidas.addEventListener("change", function() {
    const medidaSelecionada = selectMedidas.value;
    const precoCorrespondente = objMed[medidaSelecionada];
    const precao = (precoCorrespondente - (precoCorrespondente * desconto))

    const precaoEl = document.getElementsByClassName("precao")[0];
    const precoAntigoEl = document.getElementsByClassName('preco-antigo')[0];
    const precoParceladoEl = document.getElementsByClassName('preco-parcelado')[0];
    precaoEl.textContent = `R$ ${precao.toFixed(2).toString().replace('.', ',')}`;
    precoAntigoEl.textContent = `R$ ${precoCorrespondente.toFixed(2).toString().replace('.', ',')}`;
    precoParceladoEl.textContent = `R$ ${precoCorrespondente.toFixed(2).toString().replace('.', ',')}`;
  });
}

function atualizaPrecoApQtd(preco, desconto){
  const precoComDesconto = (preco - (preco * desconto)).toFixed(2)
  
  let ap = document.getElementById('aparelhada').checked
  let qtd = document.getElementById('quantidade').value

  if(qtd <= 0)qtd = 1;

  let precao = qtd * preco;
  let precoParcelado = qtd * precoComDesconto

  if (ap) {
    precao = precao * 1.1;
    precoParcelado = precoParcelado * 1.1;
  }

  document.getElementsByClassName('precao')[0].textContent = `R$ ${precao.toFixed(2).toString().replace('.', ',')}`
  document.getElementsByClassName('preco-antigo')[0].textContent = `R$ ${precoParcelado.toFixed(2).toString().replace('.', ',')}`;
  document.getElementsByClassName('preco-parcelado')[0].textContent = `R$ ${precoParcelado.toFixed(2).toString().replace('.', ',')}`;
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

  document.getElementsByClassName('precao')[0].textContent = `R$ ${precaoAtual.toFixed(2).toString().replace('.', ',')}`
  document.getElementsByClassName('preco-antigo')[0].textContent = `R$ ${precoNormalAtual.toFixed(2).toString().replace('.', ',')}`;
  document.getElementsByClassName('preco-parcelado')[0].textContent = `R$ ${precoNormalAtual.toFixed(2).toString().replace('.', ',')}`;
  document.getElementById('quantidade').value = qtdMetros
}

function atualizaPrecoApMed() {
  const ap = document.getElementById('aparelhada').checked;
  const precaoEl = document.getElementsByClassName('precao')[0];
  const precoAntigoEl = document.getElementsByClassName('preco-antigo')[0];
  const precoParceladoEl = document.getElementsByClassName('preco-parcelado')[0];

  let precao = parseFloat(precaoEl.textContent.replace("R$", "").replace(',', '.'));
  let precinho = parseFloat(precoAntigoEl.textContent.replace("R$", "").replace(',', '.'));

  let porcentagemParaSubtrair = 10 / (1 + 10 / 100);

  precao = ap ? precao * 1.1 : precao * (1 - porcentagemParaSubtrair / 100);
  precinho = ap ? precinho * 1.1 : precinho * (1 - porcentagemParaSubtrair / 100);

  precao = "R$ " + precao.toFixed(2).replace('.', ',');
  precinho = "R$ " + precinho.toFixed(2).replace('.', ',');

  precaoEl.textContent = precao;
  precoAntigoEl.textContent = precinho;
  precoParceladoEl.textContent = precinho;
}

function quantidadeMaiorQzero(pc){
  let qtd = ''
  if(pc){ qtd = document.getElementById('pecas')}
  else  { qtd = document.getElementById('quantidade')}
  
  qtd.addEventListener('change', () => {
    if(qtd.value <= 0){ qtd.value = 1;}
  }) 
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

  const prod = await getProdutoPorId(produtoId)

  let pecas = document.getElementById('pecas').value
  let preco = prod[0].preco
  let nome = prod[0].nome
  const ap = document.getElementById('aparelhada').checked;
  const foto = separarString(prod[0].galeria, ' / ')[0]
  const medida = document.getElementById('medida').value

  let vari = prod[0].tipo_variacao;

  pecas = vari == "apComp" ? pecas : null
  if(vari == "apMed"){ nome += ` 2cm x ${medida} x 3m`}
  if(vari == "medidas") {nome += ` x ${medida}`} 
  if(vari == "apMed" || vari == "medidas"){
    const p = document.getElementsByClassName('preco-parcelado')[0]
    preco = parseFloat(p.textContent.replace("R$", "").replace(',', '.'));
  }

  const produtoAserInserido = {usuario_ID: idUsuario, produto_ID: prod[0].id, quantidade: qtd, pecas: pecas || null, aparelhada: ap, tipo_variacao: vari, nome, foto, loja: prod[0].loja, desconto: prod[0].desconto, preco}
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
    body: JSON.stringify(produtoAserInserido)
  }
  const response = await fetch(`https://api.madetex.com.br/adicionarAoCarrinho`, options)
  const data = await response.json()
  if(!response.ok){
     alert('Erro ao adicionar ao carrinho, saia da sua conta, entre e tente novamente')
  }

  prodDeLojaDiferNoCar()
}

async function prodDeLojaDiferNoCar(){
  const prod = await  getProdutosNoCarrinho(userLogado.id)
  const todosMesmaLoja = prod.every((produto, index, array) => {
    return index === 0 || produto.loja === array[index - 1].loja;
  });

  if(!todosMesmaLoja){
    abrir('.alert-prod-difer-prodSolo')
    irParaOheader()
  }
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
