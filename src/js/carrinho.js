
preencherProdutosNoCarrinho()
const sectionItemsCar = document.querySelector('.produtos-no-carrinho')

async function preencherProdutosNoCarrinho(){

  const produtos = await getProdutosNoCarrinho(userLogado.id)

  produtos.forEach(produto => {
    const desconto = produto.desconto.toString().length === 1 ? "0.0" + produto.desconto : '0.' + produto.desconto
    let preco = (produto.preco * produto.quantidade)
    let precoAvista = preco - (preco * desconto)
    const primeiraImg = separarString(produto.galeria, ' / ')[0]
    let comprimento = (produto.quantidade / produto.pecas)
    const titulo = limitarString(produto.nome, 30)

    if(produto.aparelhada){
      preco = preco * 1.1;
      precoAvista = precoAvista * 1.1;
    }

    let checked = ''
    if(produto.aparelhada){
      checked = 'checked'
     }

    if(produto.madeira){
      sectionItemsCar.innerHTML += `<div class="item-carrinho">

      <section class="loja-excluir">
        <h4 class="loja"> ${produto.loja} </h4>
        <button  onclick="apagarItemNoCarrinho(${produto.id})" class="btn-link-red">Excluir</button>
      </section> <hr>
      
      <section class="img-titulo-preco">
        <div class="div-img">
          <a class="link-img" href="/src/views/produto.html?id=${produto.produto_ID}"><img src="/src/assets/img/${primeiraImg}" alt="foto do produto"></a>
        </div>
    
        <a class="link-titulo" href="/src/views/produto.html?id=${produto.produto_ID}"> <h2 class="titulo">${titulo}</h2></a>

        <div class="preco">
          <h3 class="preco-normal">R$ ${preco.toFixed(2)} </h3>
          <h5 class="preco-pix">ou R$ ${precoAvista.toFixed(2)} no pix</h5>
        </div>
      </section>
      
      <section class="opcoes-tamanho">
        <div class="qtd-madeira">  

          <input type="number" value="${produto.pecas}" name="pecas" class="pecas" id="pecas">
          <label class="label-pecas" for="pecas">Peça(s)</label>&nbsp
            
          <label class="label-qtd" for="comprimento">De</label>&nbsp
          <select id="comprimento"id-prod="${produto.id}" preco-normal="${produto.preco}" desconto="${desconto}" value="${comprimento}" name="comprimento" class="comprimento">
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
            <input type="checkbox" ${checked} name="aparelhada" id="aparelhada">
            <label class="aparelhada" for="aparelhada">Aparelhada</label>
          </div>
          
        </div> 
      </section><hr>

      <section class="frete">
        
        <div class="preco-do-frete">
          <p class="p-frete">Frete <span class="green"> Grátis </span></p>
        </div>

        <div class="descricao-frete">
          <p>para região de Júndaí - SP <button> ver cidades </button></span></p>
          <p>&nbsp&nbsp Não está aqui ?<a href="/src/views/contato.html?frete=true"> ver opções de frete</a></p>
        </div>

      </section>

    </div>`
    }
    else{
      sectionItemsCar.innerHTML += `<div class="item-carrinho">

      <section class="loja-excluir">
        <h4 class="loja"> ${produto.loja} </h4>
        <button  onclick="apagarItemNoCarrinho(${produto.id})" class="btn-link-red">Excluir</button>
      </section> <hr>
      
      <section class="img-titulo-preco">
        <div class="div-img">
          <a class="link-img" href="/src/views/produto.html?id=${produto.produto_ID}"><img src="/src/assets/img/${primeiraImg}" alt="foto do produto"></a>
        </div>
    
        <a class="link-titulo" href="/src/views/produto.html?id=${produto.produto_ID}"> <h2 class="titulo">${titulo}</h2></a>

        <div class="preco">
          <h3 class="preco-normal">R$ ${preco.toFixed(2)} </h3>
          <h5 class="preco-pix">ou R$ ${precoAvista.toFixed(2)} no pix</h5>
        </div>
      </section>
      
      <section class="opcoes-tamanho">
        <div class="qtd-comum">
          Quantidade: 
          <input id-prod="${produto.id}"  preco-normal="${produto.preco}" desconto="${desconto}" autocomplete="off" class="quantidade" name="quantidade" value="${produto.quantidade}" type="number">
        </div>
      </section><hr>

      <section class="frete">
        
        <div class="preco-do-frete">
          <p class="p-frete">Frete <span class="green"> Grátis </span></p>
        </div>

        <div class="descricao-frete">
          <p>para região de Júndaí - SP <button> ver cidades </button></span></p>
          <p>&nbsp&nbsp Não está aqui ?<a href="/src/views/contato.html?frete=true"> ver opções de frete</a></p>
        </div>

      </section>

    </div>`
    }
  });

  const selectComprimento = document.querySelectorAll('.comprimento')
  const btnQuantidadeCar = document.querySelectorAll('.quantidade');
  const pecas = document.querySelectorAll('.pecas')
  const aparelhada = document.querySelectorAll('#aparelhada')

    if(btnQuantidadeCar){
      btnQuantidadeCar.forEach(function (btn) {
        btn.addEventListener('change', () => atualizarPrecoProdNormal(btn));
      });
    }
    if(pecas){
      pecas.forEach(function (peca) {
        peca.addEventListener('change', () => atualizarPrecoMadeira(peca));
      });
    }
    if(selectComprimento){
      selectComprimento.forEach(function (comprimento) {
        comprimento.addEventListener('change', () => atualizarPrecoMadeira(comprimento));
      });
    }
    if(aparelhada){
      aparelhada.forEach(function (aparelhada) {
        aparelhada.addEventListener('change', () => atualizarPrecoMadeira(aparelhada) )
      })
    }
    

  preencherResumoDaCompra()
}


async function getProdutosNoCarrinho(idUsuario){
  // const response = await fetch(`http://localhost:1039/produtosNoCarrinho?id=${encodeURIComponent(idUsuario)}`)
  const response = await fetch(`https://api.madetex.com.br/produtosNoCarrinho?id=${encodeURIComponent(idUsuario)}`)
  if(!response.ok){
    alert('erro ao encontrar produtos no carrinho, tente novamente')
  }
  else{
    const produtos = await response.json()
    return produtos
  }
}

async function apagarItemNoCarrinho(id){
  const options = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', authorization: `${userLogado.token}`}
  }
  try {
    const response = await fetch(`http://localhost:1039/apagarItemNoCarrinho/${id}`, options)
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
  let aparelhada = parentDiv.querySelector('#aparelhada').checked

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

function atualizarPrecoProdNormal(btn) {

  const parentDiv = btn.closest('.item-carrinho');
  
  let precoNormal = btn.getAttribute('preco-normal');
  let desconto = btn.getAttribute('desconto');
  let idProdutoNoCar = btn.getAttribute("id-prod");

  let quantidade = btn.value;
  if (quantidade <= 0) {
    btn.value = 1;
    quantidade = 1;
  }

  let precoNoPix = precoNormal - (precoNormal * desconto);
  let precoAtualNormal = (quantidade * precoNormal).toFixed(2)
  let precoAtualAvista = (quantidade * precoNoPix).toFixed(2)

  const elPrecoNoPix = parentDiv.querySelector('.preco-pix')
  const elPrecoAvista = parentDiv.querySelector('.preco-normal');

  elPrecoNoPix.textContent  = `ou R$ ${precoAtualAvista} no pix`
  elPrecoAvista.textContent = `R$ ${precoAtualNormal}`

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
      console.log(msg.msg)
      preencherResumoDaCompra()
    }
}

async function preencherResumoDaCompra(){

  const produtos = await getProdutosNoCarrinho(userLogado.id)

  let soma = 0
  let count = 0

  produtos.forEach(prod =>{
    count += 1;
    let somaAtual = (prod.preco * prod.quantidade)

    if(prod.aparelhada){
      somaAtual = somaAtual * 1.1;
    }
    soma += somaAtual
  })

  const total = soma.toFixed(2)
  document.querySelector('.items span').textContent = `(${count})`
  document.querySelector('.qtd-items-mobile span').textContent = `(${count})`
  document.querySelector('.total-items').textContent = `R$ ${total}`
  document.querySelector('.total-com-frete').textContent = `R$ ${total}`
  document.querySelector('.total-com-frete-mobile').textContent = `R$ ${total}`
 
}

window.addEventListener("scroll", () => moverResumoDaCompra(scrollY));

function moverResumoDaCompra(scroll){
  const resumo = document.querySelector('.resumo-carrinho-desktop')
  resumo.style.marginTop = `${scroll + 45}px`
}

async function continuarCompra() {

  const produtos = await getProdutosNoCarrinho(userLogado.id)

  const todosMesmaLoja = produtos.every((produto, index, array) => {
    return index === 0 || produto.loja === array[index - 1].loja;
  });

  if(todosMesmaLoja){
    window.location = '/views/finalizarCompra.html'
  }else{
    abrirFechar('aviso-produtos-diferentes')
  }
}