const modos = document.getElementById("modos");
const botao1 = document.getElementById("flick");
const teladif = document.getElementById("tela-dificuldade");
const dificuldade = document.querySelectorAll(".diff-btn");
const campo = document.getElementById("campo-treino");
const resetar = document.getElementById("reset");
const perda = document.getElementById("GAME-OVER");
const jogadnv = document.getElementById("jogar-novamente");
const placar = document.getElementById("placar");
const trackbtn = document.getElementById("track");
const rodapé = document.getElementById("footer-jogo");

let contatointerval, trackinterval, errointerval;
let acertos = 0;
let erros = 0;
let velocidade;
let modoAtual = ""; // Variável que salva se você está no Flick ou Track

// --- FUNÇÕES DE AUXÍLIO ---

function limparIntervalos() {
  clearInterval(contatointerval);
  clearInterval(trackinterval);
  clearInterval(errointerval);
}

function finalizarjogo() {
  limparIntervalos();
  perda.style.display = "flex";
  jogadnv.style.display = "flex";
  campo.innerHTML = "";
  campo.style.display = "none";
}

function resetarPlacar() {
  acertos = 0;
  erros = 0;
  document.getElementById("contador-acertos").innerText = 0;
  document.getElementById("contador-erros").innerText = 0;
}

// --- MODO TRACKING ---

function iniciartrack() {
  campo.innerHTML = "";
  resetarPlacar();
  const alvo = document.createElement("div");
  alvo.classList.add("alvo");
  campo.appendChild(alvo);

  // Movimento do alvo
  trackinterval = setInterval(() => {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 100);
    alvo.style.left = x + "px";
    alvo.style.top = y + "px";
  }, 1500);

  // Ganhar pontos ao entrar com o mouse
  alvo.addEventListener("mouseenter", function () {
    clearInterval(errointerval);
    contatointerval = setInterval(() => {
      acertos++;
      document.getElementById("contador-acertos").innerText = acertos;
    }, 100);
  });

  // Perder pontos (erros) ao sair com o mouse
  alvo.addEventListener("mouseleave", function () {
    clearInterval(contatointerval);
    errointerval = setInterval(() => {
      erros++;
      document.getElementById("contador-erros").innerText = erros;
      if (erros >= 100) {
        finalizarjogo();
      }
    }, 100);
  });
}

// --- MODO FLICK ---

function gerarAlvo() {
  if (erros >= 10) {
    finalizarjogo();
    return;
  }

  const alvo = document.createElement("div");
  let x = Math.random() * (window.innerWidth - 50);
  let y = Math.random() * (window.innerHeight - 50);
  alvo.classList.add("alvo");
  alvo.style.left = x + "px";
  alvo.style.top = y + "px";
  campo.appendChild(alvo);

  alvo.addEventListener("click", function (evento) {
    evento.stopPropagation();
    acertos++;
    document.getElementById("contador-acertos").innerText = acertos;
    alvo.remove();
    gerarAlvo();
  });

  setTimeout(() => {
    if (alvo.parentElement) {
      erros++;
      document.getElementById("contador-erros").innerText = erros;
      alvo.remove();
      gerarAlvo();
    }
  }, velocidade);
}

// --- EVENTOS DOS BOTÕES ---

// Botão Flick no Menu
botao1.addEventListener("click", function () {
  modoAtual = "flick";
  modos.style.display = "none";
  rodapé.style.display = "none";
  teladif.style.display = "flex";
});

// Botão Tracking no Menu
trackbtn.addEventListener("click", function () {
  modoAtual = "track";
  window.alert("Este Modo de Jogo Tem Tolerância de Erro de 100");
  modos.style.display = "none";
  campo.style.display = "flex";
  placar.style.display = "flex";
  rodapé.style.display = "none";
  resetar.style.display = "flex";
  iniciartrack();
});

// Clique na parede (Só conta erro se for Modo Flick)
campo.addEventListener("click", function (evento) {
  if (
    modoAtual === "flick" &&
    campo.style.display !== "none" &&
    !evento.target.classList.contains("alvo")
  ) {
    erros++;
    document.getElementById("contador-erros").innerText = erros;
    if (erros >= 10) finalizarjogo();
  }
});

// Seleção de Dificuldade do Flick
dificuldade.forEach(function (botao) {
  botao.addEventListener("click", function () {
    velocidade = parseInt(botao.getAttribute("data-speed"));
    teladif.style.display = "none";
    campo.style.display = "block";
    placar.style.display = "flex";
    resetar.style.display = "flex";
    resetarPlacar();
    gerarAlvo();
  });
});

// Botão Menu (Voltar ao Menu)
resetar.addEventListener("click", function () {
  limparIntervalos();
  resetarPlacar();
  campo.innerHTML = "";
  campo.style.display = "none";
  resetar.style.display = "none";
  modos.style.display = "flex";
  perda.style.display = "none";
  placar.style.display = "none";
  jogadnv.style.display = "none";
  rodapé.style.display = "block";
});

// Botão JOGAR NOVAMENTE (O "Cérebro" que volta para o modo certo)
jogadnv.addEventListener("click", function () {
  resetarPlacar();
  campo.style.display = "block";
  perda.style.display = "none";
  jogadnv.style.display = "none";

  if (modoAtual === "flick") {
    gerarAlvo();
  } else if (modoAtual === "track") {
    iniciartrack();
  }
});
