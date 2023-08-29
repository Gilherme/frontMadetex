buscarDetalhesDoProduto()
async function buscarDetalhesDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('param');
  const column = urlParams.get('column')

  console.log(param)
    const response = await fetch(`http://localhost:1039/produtos?param=${encodeURIComponent(param)}&column=${column}`);
  const produtos = await response.json();

  CriarCarroselProdutos(produtos, 'categoria-escolhida')
}