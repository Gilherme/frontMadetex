preencherResumoFinalizarCompra()
const pedido = {};
let cidade = '';
const pedidosProdutos = [];

// Inicio - preencher dados: loja, resumo do pedido
async function preencherResumoFinalizarCompra(){
  const produtosNoCarrinho = await getProdutosNoCarrinho(userLogado.id)

  let produtos = '';
  let soma1 = 0; let soma2 = 0; let count = 0; let loja;

  produtosNoCarrinho.forEach(prod =>{
    const desconto = prod.desconto.toString().length === 1 ? "0.0" + prod.desconto : '0.' + prod.desconto;
    
    let p = {}
    p.nome = prod.nome; p.preco = prod.preco; p.quantidade = prod.quantidade; p.pecas = prod.pecas; p.produto_id = prod.produto_ID, p.img = prod.foto;
    produtos += `${prod.nome}, R$ ${prod.preco}, Qtd: ${prod.quantidade}, PC: ${prod.pecas}, AP: ${prod.aparelhada} /./ `;
    pedidosProdutos.push(p)
  
    loja = prod.loja;
    count += 1;
    let somaAtual = (prod.preco * prod.quantidade)

    if(prod.aparelhada){
      somaAtual = somaAtual * 1.1;
    }

    soma1 += somaAtual;
    soma2 += somaAtual * (1 - desconto);
  })
 
  const total = soma1.toFixed(2).replace('.', ',');
  const totalNoPix = soma2.toFixed(2).replace('.', ',');
  document.querySelector('.items span').textContent = `(${count})`
  document.querySelector('.qtd-items-mobile span').textContent = `(${count})`
  document.querySelector('.total-items').textContent = `R$ ${total}`
  document.querySelector('.total-com-frete').textContent = `R$ ${total}`
  document.querySelector('.total-com-frete-mobile').textContent = `R$ ${total}`
  document.getElementsByClassName('total-no-pix')[0].textContent = `R$ ${totalNoPix} no pix`

  pedido.produtos = produtos;
  pedido.preco_total = soma1.toFixed(2);
 
  preencherDadosDeEntregaOuRetira()
}

async function preencherDadosDeEntregaOuRetira(){
  const entregaRetira = await getApendice('entregaOuRetira.html')

  const dest = document.getElementsByClassName('conteudo-finalizar-compra')[0];

  dest.innerHTML = entregaRetira

  preencherDadosDaLoja()
}
async function preencherDadosDaLoja(){  
  const response = await fetch(`https://api.madetex.com.br/homeLoja?loja=${encodeURIComponent('Madetex Campo Limpo Pta')}`);
  const dadosLoja = await response.json()
  const loja = dadosLoja[0]

  document.getElementsByClassName('nome-loja')[0].textContent = `Retire em ${loja.nome} `;
  document.getElementsByClassName('endereco-loja')[0].textContent = loja.endereco;
  document.getElementsByClassName('ver-no-mapa')[0].href = loja.mapa;

  let divReiraEntrega = document.querySelectorAll('.div-retirar')
  divReiraEntrega.forEach(ende => ende.addEventListener('click', () => selecionarRetiraEntrega(ende)))
  preencherOpcoesDeEntrega()
}
// Fim - preencher dados: loja, resumo do pedido

// Inicio - preencher dados: endereços
async function preencherOpcoesDeEntrega(){

  const ende = await getEnderecosUser();
  const enderecoEl = document.getElementsByClassName('enderecos')[0];

  if(ende.length > 0){
    ende.forEach(e => {
      let complemento = limitarString(e.complemento, 11)
      let nome = limitarString(e.nome, 20)
  
      enderecoEl.innerHTML += `
      <div class="div-escolha-endereco">
        <input type="radio" value="${e.id}" cidade="${e.cidade}" "id="endereco" name="escolha">
        <label for="endereco-1">${nome}
          <span class="span-telefone"> ${e.telefone}</span>
        </label>
        <p> 
          <span class="span-cep">${e.cep}</span>, ${e.rua}, ${e.numero}, 
          <span class="span-complemento">${complemento}</span>
        </p>
        <button onclick="abrirEditorEndereco(${e.id}, ${e.id_usuario}, '.conteudo-finalizar-compra')" class="btn-editar-endereco"> Editar </button>
        <button onclick="excluirEndereco(${e.id}, ${e.id_usuario})" class="btn-excluir-endereco">  Excluir </button>
      </div>`;
    })
  }
  let divEndereco = document.querySelectorAll('.div-escolha-endereco')
  divEndereco.forEach(ende => ende.addEventListener('click', () => selecionarEndereco(ende)))
}
function       selecionarEndereco(endereco){
  const radio = endereco.querySelector('input[name="escolha"]')
  radio.checked = true
}
// Fim - preecher dados: endereços

// Inicio - Add, Editar, Excluir Endereço
async function exibirFormAddEndereco() {
  const dest = document.getElementById('form-add-endereco')
  const form = await getApendice('formEndereco.html')
  dest.innerHTML = form

  const inputTel = document.querySelector('#telefone')
  inputTel.addEventListener('input', ()=> formatarTelefone(inputTel))

  const inputCep = document.getElementById('cep');
  inputCep.addEventListener('input', () => completarEnderecoPeloCep(inputCep)) 

  document.getElementsByClassName('btn-continuar-ER')[0].style.display = 'none'
  document.getElementsByClassName('add-endereco')[0].style.display = 'none'
}

// Fim - Add, Editar, Excluir Endereço

// Inicio - Exibir opções de frete 
function ContinuarParaAreaDeFrete(){

  const radios = document.querySelectorAll('input[name="escolha"]');
  let idEndereco = null;

  radios.forEach((radio) => {
    if (radio.checked) {
      idEndereco = radio.value;
      cidade = radio.getAttribute('cidade')
    }
  });

  if (idEndereco !== null) {
    pedido.id_endereco = idEndereco;
    preencherInformacoesDeFrete(cidade)
  } else {
    document.getElementsByClassName('alert-select-ende')[0].style.display = 'block';
    irParaOheader()
  }
}

async function preencherInformacoesDeFrete(cidade){
  if(cidade == 'retirar'){
    carregarHTMLinfoFrete()
  }else{
    console.log('n é retira')
    const precoEdata = await getInformacoesDoFrete(cidade, pedido.preco_total)
    console.log(precoEdata)
  }
}

async function carregarHTMLinfoFrete(){

  const dest = document.getElementsByClassName('conteudo-finalizar-compra')[0]
  const response = await fetch('/src/views/apendices/infoFrete.html')
  const data = await response.text()
  dest.innerHTML = data;

  const elDoc = document.getElementById('doc') 
  const whats = document.getElementById('whats')

  whats.addEventListener('input', () => formatarTelefone(whats))
  elDoc.addEventListener('input', () => formatarDoc(elDoc))
}

function formatarDoc(elDoc){
  const tipoDoc = document.getElementById('RGouCPF').value;
  if (tipoDoc == "rg")  {formatarRG(elDoc)}
  if (tipoDoc == "cpf") {formatarCPF(elDoc)}
}

async function criarPedido(){
  const nome = document.getElementById('nome').value;
  const doc = document.getElementById('doc').value;
  const opt = document.getElementById('RGouCPF').value;
  const whats = document.getElementById('whats').value;
  const tel = desformatarTelefone(whats);

  pedido.nome_recebedor = nome;
  pedido.documento_recebedor = `${opt}=${doc}`;
  pedido.telefone_recebedor = tel;
  pedido.id_user = userLogado.id;
  pedido.status = "aguardandoAceite";
  if(pedido.id_endereco == "retirar"){ pedido.id_endereco = 1}

  const options = {
    method: "POST",
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
    body: JSON.stringify(pedido)
  }

  const response = await fetch(`https://api.madetex.com.br/criarPedido`, options)
  const msg = await response.json()
  if(response.ok){
   const pedidoCriado = await getPedidosMaisRecentes(userLogado.id, 1)
   criarPedidoProduto(pedidoCriado[0].id, pedidosProdutos, userLogado.token)
   esvaziarCarrinho(userLogado.id)
  window.location.href = '/src/views/compra/statusEpagamento.html'
  }
}

window.addEventListener("scroll", () => moverResumoDaCompra(scrollY));
function moverResumoDaCompra(scroll){
  const resumo = document.querySelector('.resumo-finalizar-compra')
  resumo.style.marginTop = `${scroll + 30}px`
}
