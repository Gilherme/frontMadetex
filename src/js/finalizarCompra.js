preencherResumoFinalizarCompra()
verificarSeUserTemEndereco()

async function preencherResumoFinalizarCompra(){

  let total = 0; let count = 0
  const carrinho = await getProdutosNoCarrinho(userLogado.id)
  carrinho.forEach( item => {
    total += (item.preco * item.quantidade);
    count += 1;
  });
  document.querySelector('.items span').textContent = `(${count})`
  // document.querySelector('.qtd-items-mobile span').textContent = `(${count})`
  document.querySelector('.total-items').textContent = `R$ ${total.toFixed(2)}`
  document.querySelector('.total-com-frete').textContent = `R$ ${total.toFixed(2)}`
  // document.querySelector('.total-com-frete-mobile').textContent = `R$ ${total.toFixed(2)}`
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

async function verificarSeUserTemEndereco(){
  const enderecos = await getEnderecosUser(userLogado.id)

  if(enderecos.length > 0){
    preencherEnderecosCadastrados(enderecos)
  }
  else{
    getFormCadastarEndereco()
  }
}

async function preencherEnderecosCadastrados(enderecos){
  const response = await fetch('./apendices/escolherEndereco.html')
  const escolherEndeco = await response.text()
  
  const dest = document.querySelector( '.conteudo-finalizar-compra')
  dest.innerHTML = escolherEndeco

  const divEscolherEndereco = document.querySelector('.div-escolher-endereco')
  let x = 0

  enderecos.forEach(ende => {
    
    divEscolherEndereco.innerHTML += `
    <div class="div-escolha-endereco">
      <input type="radio" value="${ende.id} "id="endereco" name="ecolha">
      <label for="endereco-1">${ende.nome}, ${ende.telefone}</label>
      <p>CEP:${ende.cep} - ${ende.rua}, ${ende.numero}, ${ende.complemento} </p>
      <button class="btn-editar-endereco"> Editar </button>
    </div>`;
  })
 
}

async function getFormCadastarEndereco() {
  const destino = document.querySelector('.conteudo-finalizar-compra')
  const form = await fetch('./apendices/formEndereco.html')
  const formEndereco = await form.text()
  destino.innerHTML = formEndereco

  const inputTel = document.querySelector('#telefone')
  inputTel.addEventListener('input', ()=> formatarTelefone(inputTel))

  const inputCep = document.querySelector('#cep')
  inputCep.addEventListener('input', () => preencherEndereco(inputCep)) 
}

async function preencherEndereco(cep){

  const valorAtual = cep.value;
  const cepFormatado = formatarCEP(valorAtual);
  cep.value = cepFormatado;

  if(cepFormatado.length >= 8){
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepFormatado}`)
    if(!response.ok){
      exibirMensagemAlertaInput(cep, 'CEP inválido', '.msg-erro-cep')
    }
    else{
    const endereco = await response.json();
    deixarInputVerde(cep, '.msg-erro-cep')
    preencherEnderecoPeloCep(endereco) 
  }}
}

function preencherEnderecoPeloCep(endereco){
  const inputEstado = document.querySelector('#estado');
  const inputCidade = document.querySelector('#cidade');
  const inputBairro = document.querySelector('#bairro');
  const inputRua = document.querySelector('#rua');

  inputEstado.value = endereco.state; inputEstado.disabled = true;
  inputCidade.value = endereco.city;  inputCidade.disabled = true;
  inputBairro.value = endereco.neighborhood; inputBairro.disabled = true;
  inputRua.value = endereco.street; inputRua.disabled = true;

  document.querySelector('#numero').focus()
} 

async function cadastrarEndereco(){
  const nome = document.querySelector('#nome').value;
  const cep = document.querySelector('#cep').value;
  const estado = document.querySelector('#estado').value;
  const cidade = document.querySelector('#cidade').value;
  const bairro = document.querySelector('#bairro').value;
  const rua = document.querySelector('#rua').value;
  const numero = document.querySelector('#numero').value;
  const complemento = document.querySelector('#complemento').value;
  const telefone = document.querySelector('#telefone').value;
  const payload = JSON.parse(localStorage.getItem('user'));
  const idUsuario = payload.id

  const endereco = {nome: nome, cep: cep, estado: estado, cidade: cidade, bairro: bairro, rua: rua, numero: numero, complemento: complemento, telefone: telefone, id_usuario: idUsuario}

  const response = await fetch('http://localhost:1039/adicionarEndereco',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(endereco),
    payload: JSON.stringify(payload)
    })
  if(!response.ok){
    console.log('erro ao cadastrar usuario')
  }
  else{
    const resposta = await response.json()
    console.log(resposta)
  }
}

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

window.addEventListener("scroll", () => moverResumoDaCompra(scrollY));

function moverResumoDaCompra(scroll){
  const resumo = document.querySelector('.resumo-finalizar-compra')
  resumo.style.marginTop = `${scroll + 30}px`
}