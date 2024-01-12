
async function criarPedido(idEndereco, idUser){
  const pedido = {}
  const options = {
    method: 'POST',
    headers: { authorization: `${userLogado.token}`,'Content-Type': 'application/json'},
    body: JSON.stringify(pedido)
  }
  const response = await fetch('https://api.madetex.com.br/criarPedido', options)
  const data = await response.json()
  if(!response.ok){
    alert('Erro ao continuar, saia da conta, entre e tente novamente')
  }
  else{
    alert('pedido criado')
  }
}

async function getPedidosPorIdUser(idUser){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
  }
  const response = await fetch(`https://api.madetex.com.br/getPedido?idUser=${encodeURIComponent(idUser)}`, options)
  const pedido = await response.json()
  return pedido
}

async function getPedidosMaisRecentes(idUser, limit){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
  }
  const response = await fetch(`https://api.madetex.com.br/getPedidosMaisRecentes?idUser=${encodeURIComponent(idUser)}&limit=${encodeURIComponent(limit)}`, options)
  const pedido = await response.json()
  return pedido
}
