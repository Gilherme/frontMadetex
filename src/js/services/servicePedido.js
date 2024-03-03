
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
  const response = await fetch(`https://api.madetex.com.br/getPedidosPorUsuario?idUser=${encodeURIComponent(idUser)}`, options)
  const pedido = await response.json()
  return pedido
}

async function getProdutosDoPedido(idPedido){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
  }
  const response = await fetch(`https://api.madetex.com.br/getProdutosDoPedido?idPedido=${encodeURIComponent(idPedido)}`, options)
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

async function criarPedidoProduto(idPedido, arrayPedidosProdutos, token){
  console.log(token, arrayPedidosProdutos, idPedido)
  arrayPedidosProdutos.forEach( async (pp) => {
    const pedidoProduto = {produto_id: pp.produto_id, pedido_id: idPedido, nome: pp.nome, preco: pp.preco, quantidade: pp.quantidade, pecas: pp.pecas  || 0, img: pp.img}
    console.log(pedidoProduto)
    const response = await fetch(`https://api.madetex.com.br/criarPedidoProduto`, {
      method: "POST",
      headers: {'Content-Type': 'application/json', authorization: token},
      body: JSON.stringify(pedidoProduto)
    })
    const data = await response.json()
    return data
  });
}
