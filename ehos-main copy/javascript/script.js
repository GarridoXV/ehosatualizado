class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

function trocarImagem(imagem) {
  if (imagem.src.endsWith('teste1.jpeg')) {
    imagem.src = 'imagens/teste2.jpeg';
  } else {
    imagem.src = 'imagens/teste1.jpeg';
  }
}

//slider 
let count = 1;
document.getElementById('radio1').checked = true 

setInterval(function () {
  nextImage();
}, 4000)

function nextImage(){
  count++;
  if(count>4){
      count=1;
  }

  document.getElementById("radio"+count).checked = true;
}

//adicionar item a sacola
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let contador = document.querySelector(".contador");
let sacola = document.getElementById("sacola_qtnd");
let resumo = document.createElement("aside");
resumo.classList.add("resumo");
document.body.appendChild(resumo);
resumo.style.transform = "translateX(100%)";

function adicionarItem(nome, preco, imagem) {
  let item = {
    nome: nome,
    preco: preco,
    imagem: imagem
  };

  carrinho.push(item);
  atualizarContador();
  alert("Item adicionado à sacola!");
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContador() {
  contador.innerText = carrinho.length;
}

function exibirResumo() {
  if (resumo.style.transform === "translateX(0%)") {
    resumo.style.transform = "translateX(100%)";
  } else {
    resumo.style.transform = "translateX(0%)";
  }

  let lista = document.createElement("ul");

  let valorTotal = 0;

  carrinho.forEach((item, index) => {
    let listItem = document.createElement("li");
    let itemInfo = document.createElement("span");
    itemInfo.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    listItem.appendChild(itemInfo);

    let itemImagem = document.createElement("img");
    itemImagem.src = item.imagem;
    itemImagem.width = 50;
    listItem.appendChild(itemImagem);

    let removerBtn = document.createElement("button");
    removerBtn.innerText = "Remover";
    removerBtn.onclick = () => {
      removerItem(index);
      exibirResumo();
    };

    listItem.appendChild(removerBtn);
    lista.appendChild(listItem);

    valorTotal += item.preco;
  });

  let total = document.createElement("li");
  total.innerText = `Valor total: R$ ${valorTotal.toFixed(2)}`;
  lista.appendChild(total);

  let fechar = document.createElement("button");
  fechar.innerText = "Fechar";
  fechar.onclick = () => {
    resumo.style.transform = "translateX(100%)";
  };

  let finalizarCompra = document.createElement("button");
  finalizarCompra.innerText = "Finalizar compra";
  finalizarCompra.onclick = () => {
    // Adicione a lógica para finalizar a compra aqui.
  };

  resumo.innerHTML = "";
  resumo.appendChild(lista);
  resumo.appendChild(fechar);
  resumo.appendChild(finalizarCompra);
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarContador();
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

sacola.addEventListener("click", function () {
  exibirResumo();
});

//modal 
function abrirTamanhoModal(nome, preco, imagem) {
  var modal = document.getElementById("tamanhoModal");
  modal.style.display = "block";
  
  var confirmarTamanho = document.getElementById("confirmarTamanho");
  confirmarTamanho.onclick = function() {
    adicionarItem(nome, preco, imagem);
    modal.style.display = "none";
  }
}

// função para fechar o modal de seleção de tamanho
var modal = document.getElementById("tamanhoModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onload = function() {
  var modal = document.getElementById("tamanhoModal");
  modal.style.display = "none";
};
//HOME
document.addEventListener('DOMContentLoaded', function() {
  const homeSlides = document.querySelectorAll('.home-slide img');

  homeSlides.forEach(slide => {
    slide.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      window.location.href = url;
    });
  });
});
