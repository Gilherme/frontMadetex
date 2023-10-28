
const dadosDoUsuario = JSON.parse(localStorage.getItem('user'))

if(dadosDoUsuario){
  preencherDaDosMinhaConta(dadosDoUsuario)
}

function preencherDaDosMinhaConta(dadosDoUsuario){
  document.querySelector('.nome-perfil').textContent = dadosDoUsuario.nome
  document.querySelector('.email-perfil').textContent = dadosDoUsuario.email
}

const btnMenuMinhaConta = document.querySelector('#btn-menu-minha-conta')
btnMenuMinhaConta.addEventListener('mouseout', () => toggleCardMinhaConta())
btnMenuMinhaConta.addEventListener('mouseover', () => toggleCardMinhaConta())


function toggleCardMinhaConta(){
  let larguraTela = window.innerWidth 
  if(larguraTela <= 600){
    abrirFechar('card-menu-minha-conta')
  }
}

function exibirAlterarTrue(){
  document.querySelector('.div-alterar-dados').style.display = 'none'
  document.querySelector('#alterar-true').style.display = 'block'
}

const divConfig = document.getElementById('config-escolhida');

async function meuPerfil() {
  try{
    const divMeuPerfil = await fetch('./apendices/meuPerfil.html');
    const containerMeuPerfil = await divMeuPerfil.text();

    divConfig.innerHTML = containerMeuPerfil;

    setTimeout(async () => {
      const id = dadosDoUsuario.id;
      const response = await fetch(`http://localhost:1039/userPorId?id=${encodeURIComponent(id)}`);
      const usuario = await response.json();

      const nomeElement = divConfig.querySelector("#nome");
      const emailElement = divConfig.querySelector("#email");
      const cpfElement = divConfig.querySelector("#cpf");
      const dataNascimentoElement = divConfig.querySelector("#data-nascimento");
      const telefoneElement = divConfig.querySelector("#telefone");

      let dataDeNascimento = new Date(usuario[0].data_nascimento);

      let ano = dataDeNascimento.getFullYear();
      let mes = (dataDeNascimento.getMonth() + 1).toString().padStart(2, '0');
      let dia = dataDeNascimento.getDate().toString().padStart(2, '0');

      if (nomeElement) nomeElement.value = usuario[0].nome;
      if (emailElement) emailElement.value = usuario[0].email;
      if (cpfElement) cpfElement.value = usuario[0].cpf;
      if (dataNascimentoElement) dataNascimentoElement.value = `${ano}-${mes}-${dia}`
      if (telefoneElement) telefoneElement.value = usuario[0].telefone;

      const btnAlterarDados = document.querySelector('.alterar-dados')
      btnAlterarDados.addEventListener('click', (e) => {
        e.preventDefault(); 
        exibirAlterarTrue()
        
      })
      
    }, 300); 
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

async function minhasCompras(){
  const fileMinhasC = await fetch('./apendices/minhasCompras.html')
  const conteudoMinhasCompras = await fileMinhasC.text()

  divConfig.innerHTML = conteudoMinhasCompras

  // fazer fech que busca compras do usuario no banco de dados

  let usuarioTemCompras = false 

  setTimeout( () => {
    const divCompras = document.querySelector('.compras')

    if(!usuarioTemCompras){
      mostrarAvisoMc(divCompras, 'Você ainda não fez nenhuma compra')
    }
    else{
      // Colocar as compras
    }
  },300)

}

async function meusEnderecos(){
  const response = await fetch('./apendices/meusEnderecos.html')
  const section = await response.text()

  divConfig.innerHTML = section
 
  const divEnderecos = document.querySelector('.enderecos')

  const enderecos = await getEnderecosUser(userLogado.id)

  if(enderecos.length > 0){
    console.log(enderecos)
  }
  else{
    mostrarAvisoMc(divEnderecos, 'Você ainda não tem endereço cadastrado')
  }
}

async function configuracoes(){
  const file = await fetch('./apendices/configuracoes.html')
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
  const senha = document.querySelector('#senha').value

  const userAtualizado = {
    id: dadosDoUsuario.id,
    nome: nome,
    email: email,
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
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userAtualizado),
    token: dadosDoUsuario.token
  }

  fetch(`http://localhost:1039/editarUsuario`, options)
  .then(response => response.json())
  .then(resposta => alert(resposta.msg))
}

function mostrarSenha(){
  let inputSenha = document.querySelector('#senha');
  
  if (inputSenha.getAttribute('type') === 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
}


