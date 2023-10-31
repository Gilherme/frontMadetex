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