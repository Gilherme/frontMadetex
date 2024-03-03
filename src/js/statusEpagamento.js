
carregarDadosDoPedido()

async function carregarDadosDoPedido(){
  const pedido = await getPedidosMaisRecentes(userLogado.id, 1)
  atualizarStatus(pedido[0].status)
  preencherProdutosDoPedido(pedido[0].id)
  preencherDadosDoPedido(pedido[0])

  const btnOqSignifica = document.getElementsByClassName('oQsignifica')[0];
  const dadosEnvioEl = document.getElementsByClassName('envio')[0];
  const nfEl = document.getElementsByClassName('nf')[0];
  const detalhes = document.getElementsByClassName('detalhes-pedido-pp')[0];

  btnOqSignifica.addEventListener('click', () => oQsignifica(pedido[0].status))
  dadosEnvioEl.addEventListener('mouseenter', () => abrirFechar('apendice-endereco-pp'))
  dadosEnvioEl.addEventListener('mouseleave', () => abrirFechar('apendice-endereco-pp'))
}

const l1 = document.getElementsByClassName('l1')[0]; const c7 = document.getElementsByClassName('c7')[0]; const l2 = document.getElementsByClassName('l2')[0]; const c2 = document.getElementsByClassName('c2')[0]; const l3 = document.getElementsByClassName('l3')[0]; const c3 = document.getElementsByClassName('c3')[0]; const l4 = document.getElementsByClassName('l4')[0]; const c4 = document.getElementsByClassName('c4')[0]; const l5 = document.getElementsByClassName('l5')[0]; const c5 = document.getElementsByClassName('c5')[0]; const l6 = document.getElementsByClassName('l6')[0]; const c6 = document.getElementsByClassName('c6')[0];
const aceito = () => {l1.style.backgroundColor = "red"; c2.style.backgroundColor = "red";}; const processandoPagamento = () => {aceito(); l2.style.backgroundColor = "red"; c3.style.backgroundColor = "red";}; const pagAprovado = () => {processandoPagamento(); l3.style.backgroundColor = "red"; c4.style.backgroundColor = "red";}; const preparando = () => {pagAprovado(); l4.style.backgroundColor = "red"; c5.style.backgroundColor = "red";}; const enviado = () => {preparando(); l5.style.backgroundColor = "red"; c6.style.backgroundColor = "red";}; const entregue = () => {enviado(); l6.style.backgroundColor = "red"; c7.style.backgroundColor = "red";};

function atualizarStatus(status){
switch (status){
  case "aceito": aceito(); break;
  case "processandoPagamento": processandoPagamento(); break;
  case "pagamentoAprovado": pagAprovado(); break;
  case "preparando": preparando(); break;
  case "enviado": enviado(); break;
  case "entregue": entregue(); break;
}
}

async function preencherProdutosDoPedido(id){
  const produtos = await getProdutosDoPedido(id);
  console.log(produtos)
  const dest = document.getElementsByClassName('produtos-do-pedido')[0]
  const card = criarElemento('div', 'card-pp');
  const img  = criarElemento('img');
  const nome = criarElemento('h3', 'nome-prod')
  const qtd  = criarElemento('span', 'qtd')
  const precoEl = criarElemento('span', "preco-pp")

  let todos = ''
  produtos.forEach(p => {
    if(p.pecas > 0){
      qtd.textContent = `${p.pecas} Pecas de ${p.quantidade / p.pecas}m`;
    }else{
      qtd.textContent = `${p.quantidade} Pecas`
    }
    img.src = `/src/assets/img/${p.img}`; 
    nome.textContent = p.nome;
    
    precoEl.textContent = `R$ ${p.preco.toString().replace('.', ',')}`
    card.appendChild(img); card.appendChild(nome), card.appendChild(qtd); card.appendChild(precoEl)
    todos += card.outerHTML;
  });
  dest.innerHTML = todos
}

function preencherDadosDoPedido(p){
  const dataEl = document.getElementsByClassName('p-data')[0];
  const totalEl = document.getElementsByClassName('total-pp')[0];
  const envio = document.getElementsByClassName('envio')[0];
  const nPrdidoEl = document.getElementsByClassName('numero-pedido')[0];
  const apEnde = document.getElementsByClassName('apendice-endereco-pp')[0];
  const detalhes = document.getElementsByClassName('detalhes-pedido-pp')[0];
  const nf = document.getElementsByClassName('nf')[0];

  const total = p.preco_total.toString().replace('.', ',')
  const dataFormatada = formatarData(p.data_pedido);

  dataEl.textContent = dataFormatada;
  totalEl.textContent =  `R$ ${total}`
  envio.textContent = p.nome_recebedor;
  nPrdidoEl.textContent = p.id

  detalhes.href = ``
  nf.href = ``

  // apendice envio
  const dest = document.getElementById('apendice-endereco-pp');
  const p0 = criarElemento('p', 'p0');
  const p1 = criarElemento('p', 'p1');
  const p2 = criarElemento('p', 'p2');
  const doc = p.documento_recebedor.replace('=',': ' ).replace('cpf', 'CPF').replace('rg', 'RG')

  if(p.id_endereco == 1){
    p2.textContent = 'Retirar na Rua Rio Tejipió, 131, Jardim Sto Antônio 2, Campo Limpo Paulista - SP (13232-100)'
  }else{
    p2.textContent = p.endereco_entrega;
  }

  p0.innerHTML = p.nome_recebedor;
  p1.textContent = doc;

  dest.appendChild(p0);
  dest.appendChild(p1);
  dest.appendChild(p2);
  console.log(p)
}

function oQsignifica(status){
  abrirFechar('descricao-status')
  const p = document.getElementsByClassName('p-descricao')[0]
  
  switch(status){
    case "aguardandoAceite": p.textContent = 'Estamos conferindo nossos estoques para garantir que todos os produtos estejam disponíveis'; break;
    case "aceito": p.textContent = "Temos todos os produtos!! Seu pedido está liberado para o pagamento"; break;
    case "processandoPagamento": p.textContent = "Pagamento em processamento"; break;
    case "pagamentoAprovado": p.textContent = "Pagamento aprovado, vamos começar a preparar seu pedido"; break;
    case "preparando": p.textContent = "Pedido em preparo! Estamos serrando, separando, e embelezando para você"; break;
    case "enviado": p.textContent = "Seu pedido saiu para entrega!! Chegará hoje até as 18hrs"; break;
    case "entregue": "Pedido finalizado!! "; break;
  }
}
