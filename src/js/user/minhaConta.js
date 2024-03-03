//Informações do topo do usuario
document.getElementsByClassName('nome-perfil')[0].textContent = userLogado.nome; document.getElementsByClassName('email-perfil')[0].textContent = userLogado.email;


// Abrir e fechar menu lateral
const btnOpenMenu = document.getElementsByClassName('mc-btn-toggle')[0]
btnOpenMenu.addEventListener('click', toggleMenuMinhaConta)
let navOpen = false; 
function toggleMenuMinhaConta(){
  const cnc = document.getElementsByClassName('container-nav-conteudo')[0];
  const spans = document.getElementsByClassName('cnc-span')
  if(!navOpen){cnc.style.gridTemplateColumns = "70% 90%"; btnOpenMenu.innerHTML = '&#10094'; [...spans].forEach(s => {s.style.display = "block"}); navOpen = true; }
  else        {cnc.style.gridTemplateColumns = "50px calc(100% - 40px)";  btnOpenMenu.innerHTML = '&#10095'; [...spans].forEach(s => {s.style.display = "none"}); navOpen = false}
}

// Destino das fetch html
const cncSection = document.getElementsByClassName('cnc-conteudo-escolhido')[0];

toggleSectionCnc('meuPerfil.html')

async function toggleSectionCnc(arquivo, el){
  const html = await getApendice(arquivo)

  const itemList = document.getElementsByClassName('cnc-li')
  const itens = [...itemList]
  itens.forEach(i => {if(i.classList.contains('cnc-ativo')){ i.classList.remove('cnc-ativo')}})
  if(el){el.classList.add('cnc-ativo')}else{itens[0].classList.add('cnc-ativo')}

  cncSection.innerHTML = html;

  switch (arquivo) {
    case "meuPerfil.html": preencherDadosMeuPerfil(); break;
    case "minhasCompras.html": preencherDaDosMinhasCompras(); break;
    case "meusEnderecos.html": preencherMeusEnderecos(); break;
    default:
      break;
  }
}

// Meu perfil
async function preencherDadosMeuPerfil(){
  const options = {
    method: 'GET',   
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`, id: userLogado.id},
  }
  const response = await fetch('https://api.madetex.com.br/dadosDoUsuario', options)
  const data = await response.json(); const user = data[0]
  const inputs = inputsMeuPerfil()
  
  inputs.nome.value = user.nome;
  inputs.email.value = user.email;
  inputs.tel.value = user.telefone || "Não informado";
  inputs.dataNasc.value = user.data_nascimento || '';
  inputs.cpf.value = user.cpf || "Não informado";
}

function deixarFormEditavel(btn){

  const inputs = inputsMeuPerfil()
  for(el in inputs){
    inputs[el].removeAttribute("disabled");
    inputs[el].style.color = "#0009"
  }
  inputs.nome.focus()
  btn.style.display = 'none';
  document.getElementById('alterar-true').style.display = "block"
}

// MINHAS COMPRAS
async function preencherDaDosMinhasCompras(){
  const dest = document.getElementsByClassName('compras')[0]
  const pedidos = await getPedidosPorIdUser(userLogado.id)

  if(pedidos.length >= 1){

    pedidos.forEach(async p => {
      let precoTotal = formatarPreco(p.preco_total);
      let dataPedido = formatarData(p.data_pedido) 
      const prods = await getProdutosDoPedido(p.id)
      const prodsEmHtml = criarEstruturaProdutosDoPedido(prods)
      let pedido =
      `<div class="compras-pedido">
          <div class="top-compras-pedidos">
            <div class="emitido">
              <p>EMITIDO EM</p>
              <p> ${dataPedido} </p>
            </div>
            <div class="total">
              <p>TOTAL</p>
              <p>${precoTotal}</p>
            </div>
            <div class="status">
              <p>STATUS</p>
              <p>${p.status_cliente}</p>
            </div>
          </div>
          
          <div class="prods-meus-pedidos">${prodsEmHtml}</div>
          <button class="btn-link" onclick="verTodosProdutosDoPedido(this)"> Ver todos produtos <span class="seta-p-cima"> &#10095 </span> </button>
       </div> `
       dest.innerHTML += pedido
    })
  }else{ dest.innerHTML = "<h2>Você ainda não fez nenhuma compra</h2>"}
}
function criarEstruturaProdutosDoPedido(prods){
  let estrutura = ''
  let count = 1
  prods.forEach(p => {
    
    const totalItem = formatarPreco((p.preco * p.quantidade))
    let quantidade = p.pecas === 0 ? `Qtd: ${p.quantidade}` : `${p.pecas} de ${p.quantidade / p.pecas} Metros`;
    let isOne = count === 1 ? "block" : "none"
    count++

    let prod =
    `<div class="prod-pedido-compras ${isOne}">
      <div class="img-title">
        <img src="/src/assets/img/${p.img}">
        <h2><a href="https://www.madetex.com.br/src/views/produto.html?id=${p.produto_id}"> ${p.nome} </a></h2>
      </div>
      <div class="preco-qtd">
        <p class="qtd"> ${quantidade} </p>
        <p class="total-item"> Total: ${totalItem}</p>
      </div>
    </div>`

    estrutura += prod;
  })
  return estrutura
}
function verTodosProdutosDoPedido(btn){
  const prodsMeusPedidos = btn.previousElementSibling;
  const seta = btn.querySelector('span');
  const itens = prodsMeusPedidos.querySelectorAll('.prod-pedido-compras');

  if(seta.classList.contains('seta-p-cima')){seta.classList.remove('seta-p-cima'); seta.classList.add('seta-p-baixo');}
  else{seta.classList.remove('seta-p-baixo'); seta.classList.add('seta-p-cima')}

  itens.forEach((el, i ) => {
    if(el.classList.contains('none') && i > 0){ el.classList.remove('none'); el.classList.add('block');}
    else if(i > 0){ el.classList.remove('block'); el.classList.add('none'); }
  })
}


// MEUS ENDEREÇOS
async function preencherMeusEnderecos(){

  const enderecos = await getEnderecosUser()
  const dest = document.getElementsByClassName('enderecos')[0]
  let htmlEnde = ''
  if(enderecos.length === 0){
    dest.innerHTML = "<h4> Você ainda não tem endereços cadastrado</h4> <button class='btn-cadastrar-endereço' onclick='cadastrarEndereco()'> Cadastrar Endereço</button>"
  }else{
    enderecos.forEach(e => {
      htmlEnde += `
      <div class="item-endereco-mc"> 

        <h2 class="nome-ende">${e.nome} ${e.telefone}</h2>
        
        <div>
          <h3>${e.rua}, ${e.numero}, ${e.bairro}, ${e.cidade} - ${e.estado}</h3>
          <p>${e.complemento} - ${e.cep} </p>
        </div>
        <div class="editar-excluir">
          <button class="btn-link" onclick="abrirEditorEndereco(${e.id}, ${e.id_usuario}, '.enderecos')"><img src="/src/assets/img/icones/editar.png" alt="editar"></button>
          <button class="btn-link" onclick="excluirEndereco(${e.id}, ${e.id_usuario})"><img src="/src/assets/img/icones/excluir.png" alt="editar"></button>
        </div>
      </div>
      `
    })
    dest.innerHTML += htmlEnde 
  }
}

async function getFormAsddEnde(dest){
  const form = await getApendice('formEndereco.html')
  const d = document.querySelector(dest)
  d.innerHTML = form;

  const inputTel = document.getElementById('telefone')
  inputTel.addEventListener('input', () => formatarTelefone(inputTel))

  const inputCep = document.getElementById('cep');
  inputCep.addEventListener('input', () => completarEnderecoPeloCep(inputCep)) 
}

async function configuracoes(){
  const file = await fetch('/src/views/apendices/configuracoes.html')
  const divConfiguracoes = await file.text()

  divConfig.innerHTML = divConfiguracoes
}

function mostrarAvisoMc(pai, mensagem){
  const pAviso = criarElemento('p', 'avisoMinhaConta')
  pAviso.textContent = mensagem 
  pai.appendChild(pAviso)
}

function alterarCadastro(){
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const cpf = document.querySelector("#cpf").value;
  const dataNascimento = document.querySelector("#data-nascimento").value;
  const telefone = document.querySelector("#telefone").value;
  const senha = document.querySelector('#senha').value;

  const userAtualizado = {
    id: userLogado.id,
    nome: nome,
    email: email.trim(),
    cpf: cpf.trim().length === "" ? null : cpf,
    data_nascimento: dataNascimento,
    telefone: telefone.trim().length === "" ? null : telefone,
    senha: senha,
  }

  for (const campo in userAtualizado) {
    if (userAtualizado.hasOwnProperty(campo)) {
      if (typeof userAtualizado[campo] === 'string' && userAtualizado[campo].trim() === '') {
        userAtualizado[campo] = null;
      }
    }
  }

  const options = {
    method: 'PUT',   
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`},
    body: JSON.stringify(userAtualizado),
  }

  fetch(`https://api.madetex.com.br/editarUsuario`, options)
  .then(response => response.json())
  .then(resposta => alert(resposta.msg))
}
