
const sectionItemsCar = document.querySelector('.produtos-no-carrinho')
preencherProdutosNoCarrinho()

async function preencherProdutosNoCarrinho(){
  const produtos = await getProdutosNoCarrinho(userLogado.id)

  produtos.forEach(prod => {
    const desconto = prod.desconto.toString().length === 1 ? "0.0" + prod.desconto : '0.' + prod.desconto
    let preco = (prod.preco * prod.quantidade)
    let precoAvista = preco - (preco * desconto)
    const primeiraImg = prod.foto
    let comprimento = (prod.quantidade / prod.pecas)
    const titulo = prod.nome

    if(prod.aparelhada){
      preco = preco * 1.1;
      precoAvista = precoAvista * 1.1;
    }

    let checked = ''
    if(prod.aparelhada){
      checked = 'checked'
     }
     
    let produtoNoCarrinho = `
    <div class="item-carrinho">

      <section class="loja-excluir">
        <h4 class="loja"> ${prod.loja} </h4>
        <button  onclick="apagarItemNoCarrinho(${prod.id})" class="btn-link-red">Excluir</button>
      </section> <hr>
      
      <section class="img-titulo-preco">
        <div class="div-img">
          <a class="link-img" href="/src/views/produto.html?id=${prod.produto_ID}"><img src="/src/assets/img/${primeiraImg}" alt="foto do produto"></a>
        </div>
    
        <a class="link-titulo" href="/src/views/prod?id=${prod.produto_ID}"> <h2 class="titulo">${titulo}</h2></a>

        <div class="preco">
          <h3 class="preco-normal">R$ ${preco.toFixed(2)} </h3>
          <h5 class="preco-pix">ou R$ ${precoAvista.toFixed(2)} no pix</h5>
        </div>
      </section>
    `
    if(prod.tipo_variacao == "apComp"){
      produtoNoCarrinho += `
      <section class="opcoes-tamanho">
        <div class="qtd-madeira">  

          <input type="number" value="${prod.pecas}" name="pecas" class="pecas" id="pecas">
          <label class="label-pecas" for="pecas">Peça(s)</label>&nbsp
            
          <label class="label-qtd" for="comprimento">De</label>&nbsp
          <select id="comprimento"id-prod="${prod.id}" preco-normal="${prod.preco}" desconto="${desconto}" value="${comprimento}" name="comprimento" class="comprimento">
          <option value="1" ${comprimento == 1 ? 'selected' : ''} >1,00 </option>
            <option value="1.5" ${comprimento == 1.5 ? 'selected' : ''} >1,50 </option>
            <option value="2" ${comprimento == 2 ? 'selected' : ''} >2,00 </option>
            <option value="2.5" ${comprimento == 2.5 ? 'selected' : ''} >2,50 </option>
            <option value="3" ${comprimento == 3 ? 'selected' : ''} >3,00 </option>
            <option value="3.5" ${comprimento == 3.5 ? 'selected' : ''} >3,50 </option>
            <option value="4" ${comprimento == 4 ? 'selected' : ''} >4,00 </option>
            <option value="4.5  ${comprimento == 4.5 ? 'selected' : ''} ">4,50 </option>
            <option value="5" ${comprimento == 5 ? 'selected' : ''} >5,00 </option>
            <option value="5.5" ${comprimento == 5.5 ? 'selected' : ''} >5,50 </option>
            <option value="6" ${comprimento == 6 ? 'selected' : ''} >6,00 </option>
            <option value="6.5" ${comprimento == 6.5 ? 'selected' : ''} >6,50 </option>
            <option value="7" ${comprimento == 7 ? 'selected' : ''} >7,00 </option>
          </select>  <span>Metro(s)</span>&nbsp
          
          <div class="div-aparelhada">
            <input type="checkbox" ${checked} name="aparelhada" id="ap-vigamento">
            <label class="aparelhada" for="aparelhada">Aparelhada</label>
          </div>
          
        </div> 
      </section><hr>
    `}
    if(prod.tipo_variacao == "comum" || prod.tipo_variacao == "medidas"){
      produtoNoCarrinho += `
      <section class="opcoes-tamanho">
        <div class="qtd-comum">
          Quantidade: 
          <input id-prod="${prod.id}"  preco-normal="${prod.preco}" desconto="${desconto}" autocomplete="off" class="quantidade" name="quantidade" id="quantidade" value="${prod.quantidade}" type="number">
        </div>
      </section><hr>
    `}
    if(prod.tipo_variacao == "apQtd" || prod.tipo_variacao == "apMed"){
      produtoNoCarrinho += `
      <section class="opcoes-tamanho">
        <div class="qtd-comum">
          Quantidade: 
          <input id-prod="${prod.id}"  preco-normal="${prod.preco}" desconto="${desconto}" autocomplete="off" class="quantidade" name="quantidade" id="quantidade" value="${prod.quantidade}" type="number">
          <div class="div-aparelhada">
           <input class="aparelhada" style="width: auto; margin-left: 20px;" type="checkbox" ${checked} name="aparelhada"  id="ap-qtd-med">
           <label for="aparelhada">Aparelhada</label>
          </div>
      </section><hr>  
    `}
    produtoNoCarrinho += `
    <section class="frete">
        
      <div class="preco-do-frete">
        <p class="p-frete">Frete <span class="green"> Grátis </span></p>
      </div>

      <div class="descricao-frete">
        <p>para região de Júndaí - SP <button> ver cidades </button></span></p>
        <p>&nbsp&nbsp Não está aqui ?<a href="/src/views/contato.html?frete=true"> ver opções de frete</a></p>
      </div>

     </section>
     </div>
    `
    sectionItemsCar.innerHTML += produtoNoCarrinho;
  });

  const selectComprimento = document.querySelectorAll('.comprimento');
  const btnQuantidadeCar = document.querySelectorAll('.quantidade');
  const pecas = document.querySelectorAll('.pecas');
  const aparelhada = document.querySelectorAll('#ap-vigamento');
  const ap = document.querySelectorAll('#ap-qtd-med')

  if(selectComprimento){
    selectComprimento.forEach(function (comp) {comp.addEventListener('change', () => atualizarPrecoMadeira(comp));});
  }
  if(btnQuantidadeCar){
    btnQuantidadeCar.forEach((btn) => {btn.addEventListener('change', () => atualizarPrecoNormal(btn));});
  }
  if(pecas){
    pecas.forEach(function (pc) {pc.addEventListener('change', () => atualizarPrecoMadeira(pc));});
  }
  if(aparelhada){
    aparelhada.forEach(function (ap) {ap.addEventListener('change', () => atualizarPrecoMadeira(ap))})
  }
  if(ap){
    ap.forEach((ap) => {ap.addEventListener('change', () => atualizarPrecoNormal(ap) )})
  }
  preencherResumoDaCompra()
}

async function apagarItemNoCarrinho(id){
  const options = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`}
  }
  try {
    const response = await fetch(`https://api.madetex.com.br/apagarItemNoCarrinho/${id}`, options)
    const data = await response.json()
    const msg = data.msg  
    } catch(err){
    console.error(err)
  }
  location.reload();
}

function atualizarPrecoMadeira(el){
  const parentDiv = el.closest('.item-carrinho');
  
  let pecas = parentDiv.querySelector('.pecas');
  let comprimento = parentDiv.querySelector('.comprimento');
  let aparelhada = parentDiv.querySelector('#ap-vigamento').checked

  let precoNormal = comprimento.getAttribute('preco-normal');
  let idProdutoNoCar = comprimento.getAttribute("id-prod");
  let desconto = comprimento.getAttribute('desconto');

  if(pecas.value <= 0){
    pecas.value = 1
  }

  let prenoNoPix = precoNormal - (precoNormal * desconto);
  let ml = (comprimento.value * pecas.value)
  let precoAtualNormal = (ml * precoNormal)
  let precoAtualAvista = (ml * prenoNoPix)

  if(aparelhada){
    precoAtualAvista = precoAtualAvista * 1.1;
    precoAtualNormal = precoAtualNormal * 1.1;
  }

  let elPrecoAvista = parentDiv.querySelector('.preco-normal');
  let elPrecoNoPix  = parentDiv.querySelector('.preco-pix')

  elPrecoAvista.textContent = `R$ ${precoAtualNormal.toFixed(2)}`;
  elPrecoNoPix.textContent  = `ou R$ ${precoAtualAvista.toFixed(2)} no pix`;

  editarItemNoCarrinho(idProdutoNoCar, ml, pecas.value, aparelhada)
}

function atualizarPrecoNormal(btn) {
  const parentDiv = btn.closest('.item-carrinho');
  
  const qtd = parentDiv.querySelector('#quantidade')
  const aparelhada = parentDiv.querySelector('#ap-qtd-med')

  let precoNormal = qtd.getAttribute('preco-normal');
  let desconto = qtd.getAttribute('desconto');
  let idProdutoNoCar = qtd.getAttribute("id-prod");

  let quantidade = qtd.value;
  if (quantidade <= 0) {
    qtd.value = 1;
    quantidade = 1;
  }

  let precoNoPix = precoNormal - (precoNormal * desconto);
  let precoAtualNormal = (quantidade * precoNormal)
  let precoAtualAvista = (quantidade * precoNoPix)

  if(aparelhada){
    const ap = aparelhada.checked;
    if(ap){precoAtualAvista *= 1.1; precoAtualNormal *= 1.1;}
  }

  const elPrecoNoPix = parentDiv.querySelector('.preco-pix')
  const elPrecoAvista = parentDiv.querySelector('.preco-normal');

  elPrecoNoPix.textContent  = `ou R$${(precoAtualAvista).toFixed(2)} no pix`
  elPrecoAvista.textContent = `R$ ${(precoAtualNormal).toFixed(2)}`

  editarItemNoCarrinho(idProdutoNoCar, quantidade, aparelhada);
} 

async function editarItemNoCarrinho(id, quantidade, pecas, aparelhada) {

  const produtoAtualizado = { quantidade: quantidade, pecas: pecas || 1, aparelhada: aparelhada};
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',  authorization: `${userLogado.token}` },
    body: JSON.stringify(produtoAtualizado)
  }

  const response = await fetch(`https://api.madetex.com.br/editarItemNoCarrinho/${id}`, options)
  // const response = await fetch(`http://localhost:1039/editarItemNoCarrinho/${id}`, options)
    if(!response.ok){
      console.log('erro ao alterar produto no carrinho')
    }else{
      const msg = await response.json()
      preencherResumoDaCompra()
    }
}

async function preencherResumoDaCompra(){
  const produtos = await getProdutosNoCarrinho(userLogado.id)

  let soma1 = 0; let soma2 = 0; let count = 0;

  produtos.forEach(prod =>{
    const desconto = prod.desconto.toString().length === 1 ? "0.0" + prod.desconto : '0.' + prod.desconto;

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
  document.getElementsByClassName('total-no-pix')[0].textContent = `R$ ${totalNoPix}`
 
}

window.addEventListener("scroll", () => moverResumoDaCompra(scrollY));

function moverResumoDaCompra(scroll){
  const resumo = document.querySelector('.resumo-carrinho-desktop')
  resumo.style.marginTop = `${scroll + 45}px`
}

async function continuarCompra() {

  const produtos = await getProdutosNoCarrinho(userLogado.id)
  window.location.href = '/src/views/compra/finalizarCompra.html'
}
