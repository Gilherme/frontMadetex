async function getEnderecosUser(idUser){
  const response = await fetch(`http://localhost:1039/enderecosUser?id=${encodeURIComponent(idUser)}`)
  if(!response.ok){
    alert('erro ao encontrar Endereço')
  }
  else{
    const enderecos = await response.json()
    return enderecos 
  }
}

async function getEnderecosUserPelosIds(idEnde, idUser){

  const response = await fetch(`http://localhost:1039/enderecosUserPelosIds?idUser=${encodeURIComponent(idUser)}&idEnde=${encodeURIComponent(idEnde)}`)
  if(!response.ok){
    alert('erro ao encontrar Endereço')
  }
  else{
    const endereco = await response.json()
    return endereco
  }
}

async function getProdutosNoCarrinho(idUsuario){

  const response = await fetch(`http://localhost:1039/produtosNoCarrinho?id=${encodeURIComponent(idUsuario)}`)
  if(!response.ok){
    alert('erro ao encontrar produtos no carrinho, tente novamente')
  }
  else{
    const produtos = await response.json()
    return produtos
  }
}
