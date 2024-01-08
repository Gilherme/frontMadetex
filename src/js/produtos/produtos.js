
const urlParams = new URLSearchParams(window.location.search);
const parametro = urlParams.get('param');
const column = urlParams.get('column')
const limit = urlParams.get('limit')
const loja = urlParams.get('loja')

if (column === 'undefined') {
  document.getElementById('categoria-escolhida').innerHTML = `<h3>Produto não encontrado :( </h3>  <p> Escolha um dos itens apresentados no campo de pesquisa </p> `;
} else {
  if (limit) {
    buscarProdutos(limit);
  } else {
    buscarDetalhesDoProduto(column, parametro, loja);
  }
}

async function buscarProdutos(limit){
  const response = await fetch(`https://api.madetex.com.br/produtosPopulares?limit=${encodeURIComponent(limit)}`) 
  const produtos = await response.json();
  apresentarProdutos(produtos)
}

async function buscarDetalhesDoProduto(column, param) {
      const response = await fetch(`https://api.madetex.com.br/produtos?param=${encodeURIComponent(param)}&column=${encodeURIComponent(column)}&limit=15`);
      const produtos = await response.json();
      apresentarProdutos(produtos)
}

function apresentarProdutos(produtos){
  const sectionProdutos = document.getElementById('categoria-escolhida')

  produtos.forEach(produto => {
    const imgs = separarString(produto.galeria, " / ")
    const card = criarElemento('div', 'card-prod'); card.setAttribute('data-id', produto.id)
    const img = document.createElement('img'); img.src = `../assets/img/${imgs[0]}`;
    const preco = document.createElement('h1'); preco.textContent = `R$ ${produto.preco.toFixed(2).toString().replace('.', ',')}`;
    const oferta = criarElemento('span', 'produto-oferta'); oferta.textContent = 'oferta'
    const parcelas = criarElemento('p', 'green'); parcelas.textContent = 'Em até 10x sem juros';
    const nome = document.createElement('h2'); nome.textContent = produto.nome;
    const loja = document.createElement('p'); loja.textContent = `vendido por ${produto.loja}`

    card.appendChild(img);
    if(produto.oferta){
      preco.appendChild(oferta)
      card.appendChild(preco)
    }else{
      card.appendChild(preco);
    }
    card.appendChild(parcelas);
    card.appendChild(nome);
    card.appendChild(loja);
    sectionProdutos.appendChild(card);
  });
}


const btnFiltros = document.querySelector('.btn-filtros');

btnFiltros.addEventListener('click', () => abrirFechar('filtros-mobile'));
  
async function abrirProdutosFiltrados(elemento){
  const loja = `Madetex ${elemento.textContent}`
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('param');
  const column = urlParams.get('column')

  const response = await fetch(`https://api.madetex.com.br/produtosFiltroLoja?param=${encodeURIComponent(param)}&column=${encodeURIComponent(column)}&loja=${encodeURIComponent(loja)}`);
  const produtos = await response.json();

  const produtosSemFiltros = document.getElementById('categoria-escolhida')
  while(produtosSemFiltros.firstChild){
    produtosSemFiltros.removeChild(produtosSemFiltros.firstChild)
  }
  if(window.innerWidth <= 960){
    abrirFechar('filtros-mobile')
  }
  apresentarProdutos(produtos)
}


