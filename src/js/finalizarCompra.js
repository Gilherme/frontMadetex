preencherResumoFinalizarCompra()
entregaOuRetira()

async function preencherResumoFinalizarCompra(){

  let loja;
  let total = 0; let count = 0
  const carrinho = await getProdutosNoCarrinho(userLogado.id)
  carrinho.forEach( item => {
    total += (item.preco * item.quantidade);
    count += 1;
    loja = item.loja
  });
  document.querySelector('.items span').textContent = `(${count})`
  document.querySelector('.qtd-items-mobile span').textContent = `(${count})`
  document.querySelector('.total-items').textContent = `R$ ${total.toFixed(2)}`
  document.querySelector('.total-com-frete').textContent = `R$ ${total.toFixed(2)}`
  document.querySelector('.total-com-frete-mobile').textContent = `R$ ${total.toFixed(2)}`

  entregaOuRetira(loja)
}

async function entregaOuRetira(loja){
  const response = await fetch('./apendices/entregaOuRetira.html')
  const entregaRetira = await response.text()
  
  const dest = document.querySelector( '.conteudo-finalizar-compra')
  dest.innerHTML = entregaRetira

  preencherDadosDaLoja(loja)
}

async function preencherDadosDaLoja(loja){
  const response = await fetch(`http://localhost:1039/homeLoja?loja=${encodeURIComponent(loja)}`);
  const dadosLoja = await response.json()
  const data = dadosLoja[0]

  document.querySelector('.nome-loja').textContent = `Retire em ${data.nome} `;
  document.querySelector('.endereco-loja').textContent = data.endereco;
  document.querySelector('.ver-no-mapa').href = data.mapa;

  let divReiraEntrega = document.querySelectorAll('.div-retirar')
  divReiraEntrega.forEach(ende => ende.addEventListener('click', () => selecionarRetiraEntrega(ende)))
}

function selecionarRetiraEntrega(endereco){
  const radio = endereco.querySelector('input[name="entrega-retira"]')
  radio.checked = true
}

function contunuarEouR(){
  
  const radios = document.querySelectorAll('input[name="entrega-retira"]');
  let valorSelecionado = null;

  radios.forEach((radio) => {
    if (radio.checked) {
      valorSelecionado = radio.value;
    }
  });

  if (valorSelecionado !== null) {
    enderecoOuEntrega(valorSelecionado)
  } else {
    document.querySelector('.aviso-escolha-opcao').style.display = 'block'
  }
}

function enderecoOuEntrega(valorSelecionado){
  if(valorSelecionado == 'entregar'){
    verificarSeUserTemEndereco()
  }
  if(valorSelecionado == 'retirar'){
    console.log('é pra retirar')
  }
}

async function verificarSeUserTemEndereco(){
  const enderecos = await getEnderecosUser(userLogado.id)

  if(enderecos.length > 0){
    carregarSectionEscolherEndereco()
  }
  else{
    getFormCadastarEndereco()
  }
}

async function carregarSectionEscolherEndereco(){
  const response = await fetch('./apendices/escolherEndereco.html')
  const escolherEndeco = await response.text()
  
  const dest = document.querySelector( '.conteudo-finalizar-compra')
  dest.innerHTML = escolherEndeco
  preencherEnderecosCadastrados()
}

async function preencherEnderecosCadastrados(){

  const enderecos = await getEnderecosUser(userLogado.id)
  const divEscolherEndereco = document.querySelector('.div-escolher-endereco')

  if(enderecos.length > 0){
    enderecos.forEach(ende => {
      let complemento = limitarString(ende.complemento, 11)
      let nome = limitarString(ende.nome, 20)
  
      divEscolherEndereco.innerHTML += `
      <div class="div-escolha-endereco">
        <input type="radio" value="${ende.id} "id="endereco" name="escolha">
        <label for="endereco-1">${nome}
          <span class="span-telefone"> ${ende.telefone}</span>
        </label>
        <p> 
          <span class="span-cep">${ende.cep}</span>, ${ende.rua}, ${ende.numero}, 
          <span class="span-complemento">${complemento}</span>
        </p>
        <button onclick="abrirEditorEndereco(${ende.id}, ${ende.id_usuario})" class="btn-editar-endereco"> Editar </button>
        <button onclick="excluirEndereco(${ende.id}, ${ende.id_usuario})" class="btn-excluir-endereco"> <img src="../assets/img/lixeira.png">  </button>
      </div>`;
    })
  }
  
  let divEndereco = document.querySelectorAll('.div-escolha-endereco')
  divEndereco.forEach(ende => ende.addEventListener('click', () => selecionarEndereco(ende)))
}

function selecionarEndereco(endereco){
  const radio = endereco.querySelector('input[name="escolha"]')
  radio.checked = true
}

function bntContinuarParaAreaDeFrete(){

  const radios = document.querySelectorAll('input[name="escolha"]');
  let valorSelecionado = null;

  radios.forEach((radio) => {
    if (radio.checked) {
      valorSelecionado = radio.value;
    }
  });

  if (valorSelecionado !== null) {
    continuarParaAreaDeFrete(valorSelecionado)
  } else {
    document.querySelector('.aviso-escolha-endereco').style.display = 'block'
  }
} 

async function continuarParaAreaDeFrete(idEnde){
  getInformacoesDoFrete(idEnde)
} 

async function getInformacoesDoFrete(idEnde){
  const destino = document.querySelector('.conteudo-finalizar-compra')
  const response = await fetch('./apendices/infoFrete.html')
  const infoFrete = await response.text()

  destino.innerHTML = infoFrete
  getProdutosNoCarComFrete(userLogado.id, idEnde)
}

async function getProdutosNoCarComFrete(idUsuario, idEndereco){

  const ende = await getEnderecosUserPelosIds(idEndereco, idUsuario)
  const endereco = ende[0]

  const response = await fetch(`http://localhost:1039/produtosNoCarComFrete?id=${encodeURIComponent(idUsuario)}&cidade=${encodeURIComponent(endereco.cidade)}`)
  const produtos = await response.json() 
  preencherInformacoesDeFrete(produtos)
}

function preencherInformacoesDeFrete(produtos){
  const dest = document.querySelector('.container-inf-frete')

  produtos.forEach(prod => {
    const desconto = prod.desconto.toString().length === 1 ? "0.0" + prod.desconto : '0.' + prod.desconto;
    const preco = (prod.preco * prod.quantidade)
    const precoAvista = preco - (preco * desconto)
    const comprimento = prod.quantidade / prod.pecas;
    const primeiraImg = separarString(prod.galeria, ' / ')[0]
    const nome = limitarString(prod.nome, 30)
    let madeira = prod.madeira || "";
    let infFrete;
    let infQtd;

    if(prod.freteGratis){
      infFrete = `<span class="green"> Frete grátis! entrega em até 5 dias úteis <span>`
    }else{
      infFrete = `<span class="red"> Essa loja não tem frete gratis para seu endereço :( <span>`
      document.querySelector('.preco-frete-mobile span').textContent = 'A calcular'
      document.querySelector('.total-frete').textContent = "A calcular"
    }
    if(madeira.length >= 3){
      infQtd = `<p> ${prod.pecas} Peças de ${comprimento} Metros</p> `
    }else{
      infQtd = `<p> ${prod.quantidade} Peças </p>` 
    }

    dest.innerHTML += `
    <div class="item-prod-frete">
  
    <div class="vendido-por">
        <p>Vendido e entregue por ${prod.loja}</p>
    </div>
    
    <div class="div-img">
     <img src="../assets/img/${primeiraImg}" alt="foto do produto">
    </div>

    <h2>${nome}</h2>

    <div class="info-qtd">
      ${infQtd}
    </div>

    <div class="div-preco">
      <p class="preco-avista">R$ ${preco.toFixed(2)}</p>
    </div>

    <div class="div-info-frete">
      <p> ${infFrete} </p>
    </div>
  </div>
    `
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
      exibirMensagemAlertaInput(cep, 'CEP inválido')
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
  const resposta = await response.json()
  if(!response.ok){
    // console.log(response.el, resposta.msg)
    exibirMensagemAlertaInput(resposta.el, resposta.msg)
  }
  else{
    carregarSectionEscolherEndereco()
  }
}

async function excluirEndereco(idEnde, idUser){
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({idEnde: idEnde, idUser: idUser}),
    user: 'usuario 123'
  }

  const response = await fetch(`http://localhost:1039/apagarEndereco/${idEnde}/${idUser}`, options)
  if(!response.ok){
    console.log('deu ruim')
  }
  else{
    const resposta = await response.json()
    window.location = '/views/finalizarCompra.html'
    // console.log(resposta.msg)
  }
}

async function editarEndereco(id){
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

  const endereco = {nome: nome, cep: cep, estado: estado, cidade: cidade, bairro: bairro, rua: rua, numero: numero, complemento: complemento, telefone: telefone}

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(endereco),
    user: 'usuario 123'
  }

  const response = await fetch(`http://localhost:1039/editarEndereco/${id}`, options)
  if(!response.ok){
    const resposta = await response.json()
    exibirMensagemAlertaInput(resposta.el, resposta.msg)
  }
  else{
    window.location = '/views/finalizarCompra.html'
  }
}

function preencherFormularioEndereco(ende){
  document.querySelector('#nome').value = ende.nome;
  document.querySelector('#cep').value = ende.cep;
  document.querySelector('#estado').value = ende.estado;
  document.querySelector('#cidade').value = ende.cidade;
  document.querySelector('#bairro').value = ende.bairro;
  document.querySelector('#rua').value = ende.rua;
  document.querySelector('#numero').value = ende.numero;
  document.querySelector('#complemento').value = ende.complemento;
  document.querySelector('#telefone').value = ende.telefone

  const divBtn = document.querySelector('.continuar')
  divBtn.querySelector('.btn-continuar-FC').style.display = 'none'
  
  divBtn.innerHTML = `
    <button onclick="editarEndereco(${ende.id})"> Editar endereço </button>
  `
}

async function abrirEditorEndereco(idEndereco, idUsuario){
  getFormCadastarEndereco()
  preencherEnderecoAserEditado(idEndereco, idUsuario)
}

async function preencherEnderecoAserEditado(idEndereco, idUsuario){
  const endeAserEditado = await getEnderecosUserPelosIds(idEndereco, idUsuario)
  preencherFormularioEndereco(endeAserEditado[0])
}

window.addEventListener("scroll", () => moverResumoDaCompra(scrollY));

function moverResumoDaCompra(scroll){
  const resumo = document.querySelector('.resumo-finalizar-compra')
  resumo.style.marginTop = `${scroll + 30}px`
}