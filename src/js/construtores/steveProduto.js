function preencherCarroselProdutos( elementoPai, produtos){
  const cards = document.querySelectorAll(`${elementoPai} .card-prod`)

  for (let i = 0; i < produtos.length; i++) {
    let  card = cards[i]; let prod = produtos[i]
    
    card.removeChild(card.firstChild);

    const divImg = criarElemento('div', 'img-produto');
    const img = criarElemento('img');
    const nome = criarElemento('p', 'titulo');
    const loja = criarElemento('p', 'loja')
    const preco = criarElemento('p', 'preco-produto' );
    const parcelamento = criarElemento('p', 'parcelamento');
    const oferta = criarElemento('span', 'produto-oferta'); oferta.textContent = 'oferta'

    card.setAttribute('data-id', prod.id)

    const imgs = separarString(prod.galeria, " / ")
    img.src = `https://www.madetex.com.br/src/assets/img/${imgs[0]}`
    nome.textContent =  limitarString(prod.nome, 42)
    preco.textContent = `R$ ${prod.preco.toFixed(2).toString().replace('.', ',')}`
    parcelamento.textContent = 'em até 10x sem juros'
    loja.textContent = `Vendido por ${prod.loja}`

    divImg.appendChild(img)
    card.appendChild(divImg)
    card.appendChild(nome)
    if(prod.oferta){
      preco.appendChild(oferta)
      card.appendChild(preco)
    }else{
      card.appendChild(preco)
    }
    card.appendChild(parcelamento)
    card.appendChild(loja)
  }
}
