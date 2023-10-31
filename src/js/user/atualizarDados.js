
// informacão usada em carrinho, finalizarCompra e talvez outros arquivos, não modificar sem mudar as funções que a usam
const userLogado = JSON.parse(localStorage.getItem('user'))

function toggleApendiceUserHeader(){
  if(userLogado){
    abrirFechar('apendice-logado')
  }else{
    abrirFechar('apendice-cadastrese')
  }
}

if(userLogado){
  atualizarDadosUsuario(userLogado)
}

function atualizarDadosUsuario(dadosUsuario){
  const nome = limitarString(dadosUsuario.nome, 10)

  const campoUserHeader = document.querySelector('.mensagem-login')
  const msgDefault = campoUserHeader.querySelector('div')
  const campoUserMenuMobile = document.querySelector('.area-usuario-menu p')
  campoUserMenuMobile.textContent = dadosUsuario.nome
  msgDefault.style.display = 'none'
  campoUserHeader.innerHTML = `<p> Olá! ${nome} </p>`

  const btnsMenuMobile = document.querySelector('.area-botoes-menu')
  const btnsDefault = document.querySelector('.area-botoes-menu > div:first-child');
  btnsDefault.style.display = 'none'
  document.querySelector('.btns-logado').style.display = 'block'

  atualizaQtdProdutosNoCar()
 
}

async function atualizaQtdProdutosNoCar(){
  const usuarioId = userLogado.id
  if(usuarioId){
    const response = await fetch(`https://api.madetex.com.br/qtdDeProdutosNoCarrinho?id=${encodeURIComponent(usuarioId)}`)
    if(!response.ok){
      console.log('erro na fetch')
    }
    else{
      const qtdDeProdNoCar = await response.json()
      let qtdd = qtdDeProdNoCar[0]
      const count = qtdd["COUNT(*)"]; // Extrair o valor do campo COUNT(*)
      document.querySelector('.itens-no-carrinho').textContent = count
    }
}
}

function sair(){
  localStorage.clear()
  window.location.href = 'http://localhost:3000/views/user/login.html'
}
