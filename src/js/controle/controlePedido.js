const userAdm = JSON.parse(localStorage.getItem('user'))

let optionsGet = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    authorization: `${userAdm.token}`
  }
}

async function abrirAbaPedidos(){
  const response = await fetch('/src/views/apendices/containerPedidos.html')
  const container = await response.text()
  document.getElementById('conteudo-controle').innerHTML = container;

  const ultimosPedidos = await getUltimosPedidos(10, optionsGet) 
  exibirPedidos(ultimosPedidos)

  const filtros = document.getElementById('filtro')
  filtros.addEventListener('change', () => carregarPedidos(filtros.value))
}

function exibirPedidos(pedidos){
  const dest = document.getElementsByClassName('body-pedidos')[0];

  let card = criarElemento('div', 'card-pedido-controle');;
  let statusEL = criarElemento('p', 'status_el');
  let nomeEl = criarElemento('p', 'nome-el');
  let dataEl = criarElemento('p', 'data-el');
  let precoEl = criarElemento('p', 'preco-el');
  let recebedorEl = criarElemento('p', 'recebedor-el');
  let produtoEl = criarElemento('p', 'produtos-el');
  let enderecoEl = criarElemento('p', 'endereco-el');

  let todos = '';
  pedidos.forEach(p => {
    const dataF = formatarData(p.data_pedido)
    const prods = limitarString(p.produtos, 50)
    statusEL.textContent = p.status;
    nomeEl.textContent = p.nome;
    dataEl.textContent = dataF;
    precoEl.textContent = p.preco_total;
    recebedorEl.textContent = p.nome_recebedor;
    produtoEl.textContent = prods;
    enderecoEl.textContent = p.id_endereco;
    card.appendChild(statusEL); card.appendChild(nomeEl); card.appendChild(dataEl); card.appendChild(precoEl); card.appendChild(recebedorEl); card.appendChild(produtoEl); card.appendChild(enderecoEl);
    
    todos += card.outerHTML;
  })

  dest.innerHTML = todos;
}

function carregarPedidos(filtro){
  console.log(filtro)
}


async function getUltimosPedidos(limit, options){
  const response = await fetch(`https://api.madetex.com.br/getUltimosPedidos?limit=${encodeURIComponent(limit)}`, options)
  const data = await response.json()
  return data;
}

async function getPedidosPorStatus(limit, status, options){
  const response = await fetch(`https://api.madetex.com.br/getPedidosPorStatus?status=${encodeURIComponent(status)}&limit=${encodeURIComponent(limit)}`, options)
  const data = await response.json()
  return data
}

async function editarPedido(pedido, idPedido, token){
  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
      id: idPedido
    },
    body: JSON.stringify(pedido)
  }
  const response = await fetch('https://api.madetex.com.br/editarPedido', options)
  const data = response.json()
  return data
}

