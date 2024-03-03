
// Abrir e fechar menu e apendices 
const btnCategorias = document.querySelector('.categorias')
btnCategorias.addEventListener('click', toggleCategorias)
function toggleCategorias(){abrirFechar('nav-categorias'); toggleSeta('.categorias .seta')}

const apendiceEntre = document.querySelector('.area-usuario .usuario')
apendiceEntre.addEventListener('click', () =>  toggleApendiceUserHeader()) //Função no user/atualizarDados.js

const car = document.querySelector('.carrinho-de-compras')
car.addEventListener( 'click', irPcarrinho )
function irPcarrinho(){ if (userLogado) {window.location.href = '/src/views/carrinho.html'}else{abrir('.ape-faca-login')}}

const btnMenu = document.getElementById('btn-menu')
const btnX    = document.getElementById('btn-x')
btnMenu.addEventListener('click', () => abrirFechar('menu-mobile'));
btnX.addEventListener('click',    () => abrirFechar('menu-mobile'))


fetch('https://api.madetex.com.br/chavesProdutos')
  .then(res => res.json())
  .then(json => {

    const ul = document.querySelector('.area-pesquisa ul')
    json.forEach(item => {
     
      const li = document.createElement('li')

      li.textContent = item.chave
      li.setAttribute('param', item.param)
      li.setAttribute('local', item.local)
      ul.appendChild(li)
    });
  })

  function filtrarSugestoesProd() {
    let input, ul, li, count;
    input = document.getElementById('input-pesquisa');
    ul = document.querySelector('.area-pesquisa ul');

    filtro = input.value.toLowerCase(); 
    li = document.querySelectorAll('.area-pesquisa ul li');

    count = 0;

    for (let i = 0; i < li.length; i++) {
        nome = li[i].textContent.toLowerCase(); 

        if (nome.indexOf(filtro) > -1) {
            li[i].style.display = "";
            count++;

            li[i].innerHTML = li[i].textContent.replace(new RegExp(filtro, 'ig'), (match) => `<span class="destaque">${match}</span>`);
        } else {
            li[i].style.display = 'none';
        }
    }

    li.forEach(function (li) {
        li.addEventListener('click', () => preencherInput(li));
    });

    if (count === 0 || filtro.length === 0) {
        ul.style.display = 'none';
    } else {
        ul.style.display = 'block';
    }
  }

let currentIndex = -1;

// Adicionando um ouvinte de evento para o foco no campo de pesquisa
document.getElementById('input-pesquisa').addEventListener('focus', function() {
    // Adicionando o ouvinte de evento para navegação entre opções
    document.addEventListener('keydown', keydownHandler);
});

// Removendo o ouvinte de evento quando o campo perde o foco
document.getElementById('input-pesquisa').addEventListener('blur', function() {
    // Removendo o ouvinte de evento para navegação entre opções
    document.removeEventListener('keydown', keydownHandler);
});

// Função para lidar com os eventos de teclado
// function keydownHandler(event) {
//     const li = document.querySelectorAll('.area-pesquisa ul li');

//     if (li.length > 0) {
//         if (event.key === 'ArrowUp' && currentIndex > 0) {
//             currentIndex--;
//             selecionarOpcao(li);
//             console.log(li)
//             console.log(currentIndex)
//         } else if (event.key === 'ArrowDown' && currentIndex < li.length - 1) {
//             currentIndex++;
//             selecionarOpcao(li);
//         } else if (event.key === 'Enter') {
//             if (currentIndex !== -1) {
//                 preencherInput(li[currentIndex]);
//                 currentIndex = -1;
//             }
//         }
//     }

//      // Verifica se o texto foi modificado ou apagado
//      const filtro = document.getElementById('input-pesquisa').value.toLowerCase();
//      if (filtro.length === 0) {
//          currentIndex = -1; // Reinicializa o índice se o texto foi apagado
//          // Limpa a seleção visual
//          li.forEach(item => item.classList.remove('selecionada'));
//      }
// }
function keydownHandler(event) {
  const li = document.querySelectorAll('.area-pesquisa ul li');

  // Verifica se existem opções de pesquisa (elementos <li>)
  if (li.length > 0) {
      const totalLi = li.length;
      // Verifica se a tecla pressionada é a seta para cima
      if (event.key === 'ArrowUp') {
          if (currentIndex > 0) {
              // Se houver mais opções acima, decrementa o índice
              currentIndex--;
              selecionarOpcao(li);
          } else {
              // Se estiver na primeira opção, move para a última
              currentIndex = totalLi - 1;
              selecionarOpcao(li);
          }
      }
      // Verifica se a tecla pressionada é a seta para baixo
      else if (event.key === 'ArrowDown') {
          if (currentIndex < totalLi - 1) {
              // Se houver mais opções abaixo, incrementa o índice
              currentIndex++;
              selecionarOpcao(li);
          } else {
              // Se estiver na última opção, move para a primeira
              currentIndex = 0;
              selecionarOpcao(li);
          }
      }
      // Verifica se a tecla pressionada é Enter
      else if (event.key === 'Enter') {
          // Verifica se uma opção está selecionada
          if (currentIndex !== -1) {
              // Chama a função para preencher o input com a opção selecionada
              preencherInput(li[currentIndex]);
              // Reinicializa o índice após selecionar uma opção
              currentIndex = -1;
          }
      }
  }

  // Verifica se o texto foi modificado ou apagado
  const filtro = document.getElementById('input-pesquisa').value.toLowerCase();
  if (filtro.length === 0) {
      currentIndex = -1; // Reinicializa o índice se o texto foi apagado
      // Limpa a seleção visual
      li.forEach(item => item.classList.remove('selecionada'));
  }
}

function selecionarOpcao(opcoes) {
    opcoes.forEach(function (li, index) {
        if (index === currentIndex) {
            li.classList.add('selecionada');
        } else {
            li.classList.remove('selecionada');
        }
    });
}

  let param, local;
  function preencherInput(li){
    ul = document.querySelector('.area-pesquisa ul').style.display = 'none'
    valorNoInput = document.getElementById('input-pesquisa')
    valorNoInput.value = li.textContent 
    param = li.getAttribute('param')
    local = li.getAttribute('local')
    pesquisar()
  }


function pesquisarEnter(event){

  if(event.keyCode === 13){
   pesquisar()
  }

}

function pesquisar(){
  const detalhesUrl = `/src/views/produtos.html?param=${encodeURIComponent(param)}&column=${encodeURIComponent(local)}`;
  window.location.href = detalhesUrl;
}
