
preencherProdutosNoCarrinho()
const sectionItemsCar = document.querySelector('.produtos-no-carrinho')

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

async function apagarItemNoCarrinho(id){
  
  const options = {
    method: 'DELETE',
    headers: { authorization: 'Bearer 1234' }
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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const selectComprimento = document.querySelectorAll('.comprimento')
    const btnQuantidadeCar = document.querySelectorAll('.quantidade');
    const pecas = document.querySelectorAll('.pecas')

    btnQuantidadeCar.forEach(function (btn) {
      btn.addEventListener('change', () => atualizarPrecoProdNormal(btn));
    });
    pecas.forEach(function (peca) {
      peca.addEventListener('change', () => atualizarPrecoMadeira(peca));
    });
    selectComprimento.forEach(function (comprimento) {
      comprimento.addEventListener('change', () => atualizarPrecoMadeira(comprimento));
    });
  }, 1000); 
});

function atualizarPrecoMadeira(el){

  const parentDiv = el.closest('.item-carrinho');

  let precoNormal = el.getAttribute('preco-normal');
  let idProdutoNoCar = el.getAttribute("id-prod");
  let desconto = el.getAttribute('desconto');
  
  let pecas = parentDiv.querySelector('.pecas');
  let comprimento = parentDiv.querySelector('.comprimento');

  if(pecas.value <= 0){
    pecas.value = 1
  }

  let precoAvista = precoNormal - (precoNormal * desconto);
  let ml = (comprimento.value * pecas.value)
  let precoAtualNormal = (ml * precoNormal).toFixed(2)
  let precoAtualAvista = (ml * precoAvista).toFixed(2)

  let elPrecoNormal = parentDiv.querySelector('.preco-normal')
  let elPrecoAvista = parentDiv.querySelector('.preco-avista');
  elPrecoNormal.textContent = `R$ ${precoAtualNormal}`
  elPrecoAvista.textContent = `R$ ${precoAtualAvista}`

  editarItemNoCarrinho(idProdutoNoCar, ml, pecas.value)
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

  let precoAvista = precoNormal - (precoNormal * desconto);
  let precoAtualNormal = (quantidade * precoNormal).toFixed(2)
  let precoAtualAvista = (quantidade * precoAvista).toFixed(2)

  let elPrecoNormal = parentDiv.querySelector('.preco-normal');
  let elPrecoAvista = parentDiv.querySelector('.preco-avista');
  elPrecoNormal.textContent = `R$ ${precoAtualNormal}`
  elPrecoAvista.textContent = `R$ ${precoAtualAvista}`

  editarItemNoCarrinho(idProdutoNoCar, quantidade);
} 

async function editarItemNoCarrinho(id, quantidade, pecas) {

  const produtoAtualizado = { quantidade: quantidade, pecas: pecas || 1 };
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produtoAtualizado),
    user: 'usuario 123'
  }

  fetch(`http://localhost:1039/editarItemNoCarrinho/${id}`, options)
    .then(response => response.json())
    // .then(msg => console.log(msg.msg))
    .catch(error => console.log(error))
  
    preencherResumoDaCompra()
}

async function preencherProdutosNoCarrinho(){

  const produtos = await getProdutosNoCarrinho(userLogado.id)

  produtos.forEach(produto => {
    const desconto = produto.desconto.toString().length === 1 ? "0.0" + produto.desconto : '0.' + produto.desconto
    const preco = (produto.preco * produto.quantidade)
    const precoAvista = preco - (preco * desconto)
    const primeiraImg = separarString(produto.galeria, ' / ')[0]
    let comprimento = (produto.quantidade / produto.pecas)

    if(produto.madeira){
      sectionItemsCar.innerHTML += `
      <div class="item-carrinho">
  
          <div class="vendido-por">
              Vendido por: ${produto.loja}
          </div>
          
          <div class="div-img">
           <img src="../assets/img/${primeiraImg}" alt="foto do produto">
          </div>
  
          <h2>${produto.nome}</h2>
  
          <div class="qtd-madeira">  

            <label class="label-pecas" for="pecas">Peças</label>
            <label class="label-qtd" for="comprimento">De</label>

            <input type="number" id-prod="${produto.id}" preco-normal="${produto.preco}" desconto="${desconto}" value="${produto.pecas}" name="pecas" class="pecas" id="pecas">
            <select id="comprimento"id-prod="${produto.id}" preco-normal="${produto.preco}" desconto="${desconto}" value="${comprimento}" name="comprimento" class="comprimento">
              <option value="1" ${comprimento == 1 ? 'selected' : ''} >1,00 Metro</option>
              <option value="1.5" ${comprimento == 1.5 ? 'selected' : ''} >1,50 Metro</option>
              <option value="2" ${comprimento == 2 ? 'selected' : ''} >2,00 Metros</option>
              <option value="2.5" ${comprimento == 2.5 ? 'selected' : ''} >2,50 Metros</option>
              <option value="3" ${comprimento == 3 ? 'selected' : ''} >3,00 Metros</option>
              <option value="3.5" ${comprimento == 3.5 ? 'selected' : ''} >3,50 Metros</option>
              <option value="4" ${comprimento == 4 ? 'selected' : ''} >4,00 Metros</option>
              <option value="4.5  ${comprimento == 4.5 ? 'selected' : ''} ">4,50 Metros</option>
              <option value="5" ${comprimento == 5 ? 'selected' : ''} >5,00 Metros</option>
              <option value="5.5" ${comprimento == 5.5 ? 'selected' : ''} >5,50 Metros</option>
              <option value="6" ${comprimento == 6 ? 'selected' : ''} >6,00 Metros</option>
              <option value="6.5" ${comprimento == 6.5 ? 'selected' : ''} >6,50 Metros</option>
              <option value="7" ${comprimento == 7 ? 'selected' : ''} >7,00 Metros</option>
            </select>
          </div> 
  
          <div class="div-preco">
            <p class="preco-normal">R$ ${preco.toFixed(2)}</p>
            <p class="preco-avista">R$ ${precoAvista.toFixed(2)}</p>
          </div>
  
          <div class="div-botoes">
            <button>Comprar Agora</button>
            <button onclick="apagarItemNoCarrinho(${produto.id})"> Remover</button>
          </div>
        </div>
      `
    }
    else{
      sectionItemsCar.innerHTML += `
      <div class="item-carrinho">
  
          <div class="vendido-por">
              Vendido por: ${produto.loja}
          </div>
          
          <div class="div-img">
           <img src="../assets/img/${primeiraImg}" alt="foto do produto">
          </div>
  
          <h2>${produto.nome}</h2>
  
          <div class="qtd-comum">
            <label for="quantidade">Quantidade:</label>
            <input id-prod="${produto.id}"  preco-normal="${produto.preco}" desconto="${desconto}" autocomplete="off" class="quantidade" name="quantidade" value="${produto.quantidade}" type="number">
          </div>
  
          <div class="div-preco">
            <p class="preco-normal">R$ ${preco.toFixed(2)}</p>
            <p class="preco-avista">R$ ${precoAvista.toFixed(2)}</p>
          </div>
  
          <div class="div-botoes">
            <button>Comprar Agora</button>
            <button onclick="apagarItemNoCarrinho(${produto.id})"> Remover</button>
          </div>
        </div>
      `
    }
  });

  preencherResumoDaCompra()
}

async function preencherResumoDaCompra(){

  const produtos = await getProdutosNoCarrinho(userLogado.id)
  let soma = 0
  let count = 0
  produtos.forEach(prod =>{
    count += 1;
    soma += (prod.preco * prod.quantidade);
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
  resumo.style.marginTop = `${scroll + 30}px`
}

function continuarCompra() {
  window.location = '/views/finalizarCompra.html'
}