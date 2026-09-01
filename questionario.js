// ===== PsiMatch - Questionário de matching =====
// O paciente responde 7 perguntas e recebe 3 psicólogos compatíveis.

const totalPerguntas = 7;
let perguntaAtual = 1;

// Base de psicólogos (exemplo - troque pelos profissionais reais depois)
const psicologos = [
  {
    nome: 'Thayse Bianchin Rambo',
    esp: 'Saúde Mental · TEA · ABA',
    desc: 'Atendimento acolhedor para saúde mental, autismo e terapia ABA.',
    valor: 'R$ 150',
    whats: 'https://wa.me/55991813219',
    tags: ['ansiedade', 'depressao', 'tea', 'tdah', 'infantil', 'adolescente', 'adulto']
  },
  {
    nome: 'Dra. Camila Souza',
    esp: 'Ansiedade · Adultos',
    desc: 'Especialista em ansiedade e estresse para adultos.',
    valor: 'R$ 180',
    whats: 'https://wa.me/55991813219',
    tags: ['ansiedade', 'depressao', 'adulto']
  },
  {
    nome: 'Dr. Rafael Lima',
    esp: 'Terapia de Casal',
    desc: 'Atendimento de casal e relacionamentos.',
    valor: 'R$ 200',
    whats: 'https://wa.me/55991813219',
    tags: ['casal', 'adulto']
  }
];

function mostrarPergunta(n) {
  document.querySelectorAll('.pergunta').forEach(p => p.classList.remove('ativa'));
  document.querySelector(`.pergunta[data-pergunta="${n}"]`).classList.add('ativa');

  const pct = (n / totalPerguntas) * 100;
  document.getElementById('barraProgresso').style.width = pct + '%';
  document.getElementById('textoProgresso').textContent = 'Pergunta ' + n + ' de ' + totalPerguntas;

  document.getElementById('btnVoltar').style.display = n === 1 ? 'none' : 'inline-block';
  document.getElementById('btnAvancar').style.display = n === totalPerguntas ? 'none' : 'inline-block';
  document.getElementById('btnVerResultado').style.display = n === totalPerguntas ? 'inline-block' : 'none';
}

function avancar() {
  const selecionado = document.querySelector(`input[name="p${perguntaAtual}"]:checked`);
  if (!selecionado) {
    alert('Por favor, escolha uma opção para continuar.');
    return;
  }
  if (perguntaAtual < totalPerguntas) {
    perguntaAtual++;
    mostrarPergunta(perguntaAtual);
  }
}

function voltar() {
  if (perguntaAtual > 1) {
    perguntaAtual--;
    mostrarPergunta(perguntaAtual);
  }
}

document.getElementById('formQuiz').addEventListener('submit', function (e) {
  e.preventDefault();

  const ultima = document.querySelector(`input[name="p7"]:checked`);
  if (!ultima) {
    alert('Por favor, escolha uma opção para continuar.');
    return;
  }

  const respostas = {};
  for (let i = 1; i <= totalPerguntas; i++) {
    const r = document.querySelector(`input[name="p${i}"]:checked`);
    respostas['p' + i] = r ? r.value : '';
  }

  const pontuados = psicologos.map(psi => {
    let pontos = 0;
    if (psi.tags.includes(respostas.p1)) pontos += 3;
    if (psi.tags.includes(respostas.p3)) pontos += 2;
    if (psi.tags.includes(respostas.p2)) pontos += 1;
    return { ...psi, pontos };
  });

  const top3 = pontuados.sort((a, b) => b.pontos - a.pontos).slice(0, 3);

  const container = document.getElementById('resultadoCards');
  container.innerHTML = top3.map(psi => `
    <div class="psi-card">
      <div class="avatar">🧑‍⚕️</div>
      <h4>${psi.nome}</h4>
      <p class="psi-esp">${psi.esp}</p>
      <p class="psi-desc">${psi.desc}</p>
      <p class="psi-valor">${psi.valor}/sessão</p>
      <a class="btn btn-primario" href="${psi.whats}" target="_blank">Agendar</a>
    </div>
  `).join('');

  document.querySelector('.quiz').style.display = 'none';
  document.querySelector('.quiz-header').style.display = 'none';
  document.getElementById('resultado').style.display = 'block';
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});

mostrarPergunta(1);