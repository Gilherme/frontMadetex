preencherResumoFinalizarCompra()
preencherOpcoesDeEntrega()

async function preencherResumoFinalizarCompra(){
  const produtos = await getProdutosNoCarrinho(userLogado.id)

  let soma1 = 0; let soma2 = 0; let count = 0; let loja;

  produtos.forEach(prod =>{
    const desconto = prod.desconto.toString().length === 1 ? "0.0" + prod.desconto : '0.' + prod.desconto;
    
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
  entregaOuRetira(loja)
}

async function preencherOpcoesDeEntrega(){
  const enderecos = await getEnderecosUser(userLogado.id, userLogado.token);
  if (enderecos) {
     preencherEnderecosCadastrados(enderecos) };
}

async function entregaOuRetira(loja){
  const response = await fetch('/src/views/apendices/entregaOuRetira.html')
  const entregaRetira = await response.text()
  
  const dest = document.querySelector( '.conteudo-finalizar-compra')
  dest.innerHTML = entregaRetira

  preencherDadosDaLoja(loja)
}

async function preencherDadosDaLoja(loja){  
  const response = await fetch(`https://api.madetex.com.br/homeLoja?loja=${encodeURIComponent(loja)}`);
  const dadosLoja = await response.json()
  const data = dadosLoja[0]

  document.querySelector('.nome-loja').textContent = `Retire em ${data.nome} `;
  document.querySelector('.endereco-loja').textContent = data.endereco;
  document.querySelector('.ver-no-mapa').href = data.mapa;

  let divReiraEntrega = document.querySelectorAll('.div-retirar')
  divReiraEntrega.forEach(ende => ende.addEventListener('click', () => selecionarRetiraEntrega(ende)))
}

async function preencherEnderecosCadastrados(ende){

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
        <button onclick="abrirEditorEndereco(${e.id}, ${e.id_usuario})" class="btn-editar-endereco"> Editar </button>
        <button onclick="excluirEndereco(${e.id}, ${e.id_usuario})" class="btn-excluir-endereco">  Excluir </button>
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

function selecionarRetiraEntrega(endereco){
  const radio = endereco.querySelector('input[name="entrega-retira"]')
  radio.checked = true
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

async function exibirFormAddEndereco() {
  const dest = document.getElementById('form-add-endereco')
  const form = await fetch('/src/views/apendices/formEndereco.html')
  const formEndereco = await form.text()
  dest.innerHTML = formEndereco

  const inputTel = document.querySelector('#telefone')
  inputTel.addEventListener('input', ()=> formatarTelefone(inputTel))

  const inputCep = document.querySelector('#cep')
  inputCep.addEventListener('input', () => preencherEndereco(inputCep)) 

  document.getElementsByClassName('btn-continuar-ER')[0].style.display = 'none'
  document.getElementsByClassName('add-endereco')[0].style.display = 'none'
}

async function preencherEndereco(cep){

  const valorAtual = cep.value;
  const cepFormatado = formatarCEP(valorAtual);
  cep.value = cepFormatado;

  if (cepFormatado.length >= 8) {
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

  const endereco = {nome: nome, cep: cep, estado: estado, cidade: cidade, bairro: bairro, rua: rua, numero: numero, complemento: complemento, telefone: telefone, id_usuario: idUsuario};

  const response = await fetch('https://api.madetex.com.br/adicionarEndereco',{
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
    body: JSON.stringify(endereco),
    })
  if (!response.ok) { exibirMensagemAlertaInput(resposta.el, resposta.msg)}
  else{
     const resposta = await response.json()
     location.reload()
  }
}

async function excluirEndereco(idEnde, idUser){
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', authorization: userLogado.token },
    body: JSON.stringify({idEnde: idEnde, idUser: idUser})
  }

  const response = await fetch(`https://api.madetex.com.br/apagarEndereco/${idEnde}/${idUser}`, options)
  if(!response.ok){
    console.log('deu ruim')
  }
  else{
    const resposta = await response.json()
    location.reload()
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
    headers: { 'Content-Type': 'application/json', authorization: userLogado.token },
    body: JSON.stringify(endereco)
  }

  const response = await fetch(`https://api.madetex.com.br/editarEndereco/${id}`, options)
  if(!response.ok){
    const resposta = await response.json()
    exibirMensagemAlertaInput(resposta.el, resposta.msg)
  }
  else{
    window.location.href = '/src/views/compra/finalizarCompra.html'
  }
}

// Continuar daqui
function ContinuarParaAreaDeFrete(){

  const radios = document.querySelectorAll('input[name="escolha"]');
  let idEndereco = null;

  radios.forEach((radio) => {
    if (radio.checked) {
      idEndereco = radio.value;
    }
  });

  if (idEndereco !== null) {
    criarPedido(idEndereco, userLogado.id)
  } else {
    document.getElementsByClassName('alert-select-ende')[0].style.display = 'block'
  }
} 

async function getInformacoesDoFrete(idEnde){
  const dest = document.querySelector('.conteudo-finalizar-compra')
  const response = await fetch('/src/views/apendices/infoFrete.html')
  const infoFrete = await response.text()

  dest.innerHTML = infoFrete
  getProdutosNoCarComFrete(userLogado.id, idEnde)
}

async function getProdutosNoCarComFrete(idUsuario, idEndereco){
  const ende = await getEnderecosUserPelosIds(idEndereco, idUsuario)
  const endereco = ende[0]

  const response = await fetch(`https://api.madetex.com.br/produtosNoCarComFrete?id=${encodeURIComponent(idUsuario)}&cidade=${encodeURIComponent(endereco.cidade)}`)
  const produtos = await response.json() 
  preencherInformacoesDeFrete(produtos)
}

async function abrirEditorEndereco(idEndereco, idUsuario){
  const dest = document.getElementById('form-add-endereco');
  const form = await fetch('/src/views/apendices/formEndereco.html')
  const formEndereco = await form.text()
  dest.innerHTML = formEndereco

  document.getElementsByClassName('btn-continuar-ER')[0].style.display = 'none'
  document.getElementsByClassName('add-endereco')[0].style.display = 'none'

  const endeAserEditado = await getEnderecosUserPelosIds(idEndereco, idUsuario, userLogado.token)
  console.log(endeAserEditado)
  preencherFormularioEndereco(endeAserEditado[0])

  const inputTel = document.getElementById('telefone')
  inputTel.addEventListener('input', ()=> formatarTelefone(inputTel))

  const inputCep = document.getElementById('cep')
  inputCep.addEventListener('input', () => preencherEndereco(inputCep)) 
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
  // divBtn.querySelector('.btn-continuar-FC').style.display = 'none'
  
  divBtn.innerHTML = `
    <button onclick="editarEndereco(${ende.id})"> Editar endereço </button>
  `
}

window.addEventListener("scroll", () => moverResumoDaCompra(scrollY));

function moverResumoDaCompra(scroll){
  const resumo = document.querySelector('.resumo-finalizar-compra')
  resumo.style.marginTop = `${scroll + 30}px`
}