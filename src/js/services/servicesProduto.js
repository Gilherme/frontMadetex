async function getProdutosPopulares(limit){
  const response = await fetch(`https://api.madetex.com.br/produtosPopulares?limit=${limit}`)
  const data = await response.json()
  return data
}

async function getProdutosEmOferta(limit){
  const response = await fetch(`https://api.madetex.com.br/produtosEmOferta?limit=${limit}`)
  const data = await response.json()
  return data
}

async function getProdutosPorLojaEcategoria(loja, categoria){
  const response = await fetch(`https://api.madetex.com.br/produtosPorLoja?loja=${encodeURIComponent(loja)}&categoria=${encodeURIComponent(categoria)}`)
  const data = await response.json();
  return data;
}

async function getProdutosPopularesPorLoja(loja, limit){
  const response = await fetch(`https://api.madetex.com.br/produtosPopularesPorLoja?loja=${encodeURIComponent(loja)}&limit=${encodeURIComponent(limit)}`)
  const data = await response.json();
  return data;
}

async function getProdutosEmOfertaPorLoja(loja){
  const response = await fetch(`https://api.madetex.com.br/produtosEmOfertaPorLoja?loja=${encodeURIComponent(loja)}`)
  const data = await response.json();
  return data;
}