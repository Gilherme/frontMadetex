async function getEnderecosUser(){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}` }
  }
  const response = await fetch(`https://api.madetex.com.br/enderecosUser?id=${encodeURIComponent(userLogado.id)}`, options)
  if(!response.ok){
    return false
  }
  else{
    const enderecos = await response.json()
    return enderecos 
  }
}
async function getEnderecosUserPelosIds(idEnde, idUser, token){
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', authorization: `${token}`}
  }
  const response = await fetch(`https://api.madetex.com.br/enderecosUserPelosIds?idUser=${encodeURIComponent(idUser)}&idEnde=${encodeURIComponent(idEnde)}`, options)
  if(!response.ok){
    alert('erro ao encontrar Endereço')
  }
  else{
    const endereco = await response.json()
    return endereco
  }
}
async function getProdutosNoCarrinho(idUsuario){

  const response = await fetch(`https://api.madetex.com.br/produtosNoCarrinho?id=${encodeURIComponent(idUsuario)}`)
  if(!response.ok){
    alert('erro ao encontrar produtos no carrinho, tente novamente')
  }
  else{
    const produtos = await response.json()
    return produtos
  }
}
async function getInformacoesDoFrete(cidade, preco){
  if(cidade == "Jundiaí"){cidade = "Jundiai"}
  if(cidade === "Várzea Paulista"){cidade = "Varzea Paulista"}

  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }
  const response = await fetch(`https://api.madetex.com.br/getInformacoesDoFrete?cidade=${encodeURIComponent(cidade)}&preco=${encodeURIComponent(preco)}`, options)
  const data = await response.json()
  if(!response.ok){
    console.log('get preco frete fail')
  }else{
    return data
  }
}
async function esvaziarCarrinho(idUser){
  const options = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`}
  }
  try {
    const response = await fetch(`https://api.madetex.com.br/esvaziarCarrinho/${idUser}`, options)
    const data = await response.json()
    const msg = data.msg  
    } catch(err){
    console.error(err)
  }
}
async function getProdutosDoPedido(id){
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${userLogado.token}`
  }}
  const response = await fetch(`https://api.madetex.com.br/getProdutosDoPedido?idPedido=${encodeURIComponent(id)}`, options)
  const data = await response.json()
  return data;
}
async function cadastrarEndereco(){

  const e = inputsDoEndereco()
  const endereco = {nome: e.nome.value, cep: e.cep.value, estado: e.estado.value, cidade: e.cidade.value, bairro: e.bairro.value, rua: e.rua.value, numero: e.numero.value, complemento: e.complemento.value, telefone: e.telefone.value, id_usuario: userLogado.id};

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
async function editarEndereco(id){

  const e = inputsDoEndereco()
  const endereco = {nome: e.nome.value, cep: e.cep.value, estado: e.estado.value, cidade: e.cidade.value, bairro: e.bairro.value, rua: e.rua.value, numero: e.numero.value, complemento: e.complemento.value, telefone: e.telefone.value};

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', authorization: userLogado.token},
    body: JSON.stringify(endereco)
  }

  const response = await fetch(`https://api.madetex.com.br/editarEndereco/${id}`, options)
  if(!response.ok){
    const resposta = await response.json()
    exibirMensagemAlertaInput(resposta.el, resposta.msg)
  }
  else{
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
  }
}



async function abrirEditorEndereco(idEndereco, idUsuario, destino){
  console.log(idEndereco, idUsuario, destino)
  const dest = document.querySelector(destino);
  const form = await getApendice('formEndereco.html')
  dest.innerHTML = form

  const endeAserEditado = await getEnderecosUserPelosIds(idEndereco, idUsuario, userLogado.token)
  
  preencherFormularioEndereco(endeAserEditado[0])

  const inputTel = document.getElementById('telefone')
  inputTel.addEventListener('input', ()=> formatarTelefone(inputTel))

  const inputCep = document.getElementById('cep')
  inputCep.addEventListener('input', () => completarEnderecoPeloCep(inputCep)) 
}
function preencherFormularioEndereco(ende){

  const e = inputsDoEndereco()

  e.nome.value = ende.nome; e.cep.value = ende.cep; e.estado.value = ende.estado; e.cidade.value = ende.cidade; e.bairro.value = ende.bairro; e.rua.value = ende.rua; e.numero.value = ende.numero; e.complemento.value = ende.complemento; e.telefone.value = ende.telefone;

  const divBtn = document.querySelector('.continuar')
  
  divBtn.innerHTML = `
    <button onclick="editarEndereco(${ende.id})"> Editar endereço </button>
  `
}