document.addEventListener('DOMContentLoaded', () => {

  // ================= ELEMENTOS =================
  const loginLink   = document.getElementById('loginLink');
  const botaoNav1   = document.getElementById('botao-nav1');
  const loginModal  = document.getElementById('loginModal');
  const btnLogin    = document.getElementById('btnLogin');
  const btnClose    = document.getElementById('btnClose');
  const botaoSair   = document.getElementById('botao-nav2');
  const userInfo    = document.getElementById('userInfo');
  const userName    = document.getElementById('userName');
  const loginUser   = document.getElementById('loginUser');
  const loginPass   = document.getElementById('loginPass');
  const loginForm   = document.getElementById('loginForm');

  // LETREIRO
  const letreiro    = document.getElementById('letreiro-texto');

  // ================= USUÁRIOS MOCK =================
  const usuarios = [
    { user: "admin", senha: "123", nome: "Administrador", role: "admin" },
    { user: "Snake123br", senha: "123", nome: "Bruno Henrique", role: "viewer" },
    { user: "CarlosSEW", senha: "1234", nome: "Carlos Santos", role: "viewer" }
  ];

  // ================= ESTADO INICIAL =================
  if (botaoSair) botaoSair.classList.add('hidden');

  // ================= FUNÇÕES LOGIN =================
  function abrirLogin() {
    if (loginModal) loginModal.classList.remove('hidden');
  }

  function fecharLogin() {
    if (loginModal) loginModal.classList.add('hidden');
    if (loginForm) loginForm.reset();
  }

  function aplicarLogin(usuario) {
    if (loginLink) loginLink.classList.add('hidden');
    if (userInfo) userInfo.classList.remove('hidden');
    if (botaoSair) botaoSair.classList.remove('hidden');
    if (userName) userName.innerText = usuario.nome;
  }

  function logout() {
    localStorage.removeItem('usuarioLogado');
    if (userInfo) userInfo.classList.add('hidden');
    if (botaoSair) botaoSair.classList.add('hidden');
    if (loginLink) loginLink.classList.remove('hidden');
  }

  // ================= EVENTOS LOGIN =================
  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      abrirLogin();
    });
  }

  if (botaoNav1 && loginLink) {
    botaoNav1.addEventListener('click', () => {
      loginLink.click();
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', fecharLogin);
  }

  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      if (!loginUser || !loginPass) return;

      const user = loginUser.value;
      const pass = loginPass.value;

      const encontrado = usuarios.find(
        u => u.user === user && u.senha === pass
      );

      if (!encontrado) {
        alert("Usuário ou senha inválidos");
        return;
      }

      localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));
      aplicarLogin(encontrado);
      fecharLogin();
    });
  }

  if (botaoSair) {
    botaoSair.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }

  // Fechar modal clicando fora
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) fecharLogin();
    });
  }

  // Fechar modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharLogin();
  });

  // ================= PERSISTÊNCIA =================
  const salvo = localStorage.getItem("usuarioLogado");
  if (salvo) {
    aplicarLogin(JSON.parse(salvo));
  }

  // ================= LETREIRO DIGITAL =================
  if (letreiro) {

  const mensagensFixas = [
    "📊 Monitoramento de capacidade em tempo real",
    "💻 Sistema desenvolvido do zero",
  ];

  function horaAtual() {
    const agora = new Date();
    return agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function saudacao() {
    const hora = new Date().getHours();

    if (hora >= 12 && hora < 18) return "🌤️ Boa tarde";
    if (hora >= 18 && hora <= 23) return "🌙 Boa noite";
    return "☀️ Bom dia";
  }

  let indice = 0;

  function atualizarLetreiro() {
    const mensagemAtual =
      indice === 0
        ? `${saudacao()}! Seja bem-vindo ao sistema`
        : mensagensFixas[indice - 1];

    letreiro.textContent = `${mensagemAtual} | 🕑 ${horaAtual()}`;

    indice = (indice + 1) % (mensagensFixas.length + 1);
  }

  atualizarLetreiro();
  setInterval(atualizarLetreiro, 14000);
}


  // ================= NAVEGAÇÃO (CASAS) =================
  const rotas = {
    casa1: "./paginas/ri.html",
    casa2: "./paginas/usinagem-aco.html",
    casa3: "./paginas/tratamento-termico.html",
    casa4: "./paginas/estamparia.html",
    casa5: "./paginas/usinagem-fofo.html",
    casa6: "./paginas/bobinagem.html"
  };

  Object.keys(rotas).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        window.location.href = rotas[id];
      });
    }
  });

});

