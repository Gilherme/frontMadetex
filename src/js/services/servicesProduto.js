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

async function getProdutosPorLojaEcategoria(loja, categoria, limit){
  const response = await fetch(`https://api.madetex.com.br/produtosPorLoja?loja=${encodeURIComponent(loja)}&categoria=${encodeURIComponent(categoria)}&limit=${encodeURIComponent(limit)}`)
  const data = await response.json();
  return data;
}

async function getProdutosPopularesPorLoja(loja, limit){
  const response = await fetch(`https://api.madetex.com.br/produtosPopularesPorLoja?loja=${encodeURIComponent(loja)}&limit=${encodeURIComponent(limit)}`)
  const data = await response.json();
  return data;
}

async function getProdutosEmOfertaPorLoja(loja, limit){
  const response = await fetch(`https://api.madetex.com.br/produtosEmOfertaPorLoja?loja=${encodeURIComponent(loja)}&limit=${encodeURIComponent(limit)}`)
  const data = await response.json();
  return data;
}

async function getProdutoPorId(id){
  const response = await fetch(`https://api.madetex.com.br/produto?id=${encodeURIComponent(id)}`)
  const data = await response.json()
  return data
}

async function getProdutosNoCarrinho(idUsuario){
  const response = await fetch(`https://api.madetex.com.br/produtosNoCarrinho?id=${encodeURIComponent(idUsuario)}`)
  if(!response.ok){
    alert('erro ao encontrar produtos no carrinho, tente novamente')
  }
  else{
    const produtos = await response.json()
    return produtos
  }
}