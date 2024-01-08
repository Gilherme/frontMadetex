async function getEnderecosUser(idUser, token){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${token}`}
  }
  const response = await fetch(`https://api.madetex.com.br/enderecosUser?id=${encodeURIComponent(idUser)}`, options)
  if(!response.ok){
    return false
  }
  else{
    const enderecos = await response.json()
    return enderecos 
  }
}

async function getEnderecosUserPelosIds(idEnde, idUser, token){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${token}`}
  }
  const response = await fetch(`https://api.madetex.com.br/enderecosUserPelosIds?idUser=${encodeURIComponent(idUser)}&idEnde=${encodeURIComponent(idEnde)}`, options)
  if(!response.ok){
    alert('erro ao encontrar Endereço')
  }
  else{
    const endereco = await response.json()
    return endereco
  }
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
