// ===== PsiMatch - Landing page de validação =====
// Valida os formulários e mostra mensagens de confirmação.
// (Por enquanto os dados ficam só no navegador. Para salvar de verdade,
//  será preciso um backend ou um serviço como Formspree/Google Sheets.)

// Formulário do paciente
document.getElementById('formPaciente').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('pacNome').value.trim();
  const email = document.getElementById('pacEmail').value.trim();
  const whats = document.getElementById('pacWhats').value.trim();
  const msg = document.getElementById('msgPaciente');

  if (!nome || !email || !whats) {
    msg.textContent = '⚠️ Preencha todos os campos.';
    msg.className = 'form-msg erro';
    return;
  }

  // Simula o envio (aqui você conectaria um serviço real depois)
  msg.textContent = '✅ Pronto, ' + nome.split(' ')[0] + '! Você entrou na lista de espera.';
  msg.className = 'form-msg sucesso';
  this.reset();
});

// Formulário do psicólogo
document.getElementById('formPsicologo').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('psiNome').value.trim();
  const crp = document.getElementById('psiCrp').value.trim();
  const email = document.getElementById('psiEmail').value.trim();
  const whats = document.getElementById('psiWhats').value.trim();
  const msg = document.getElementById('msgPsicologo');

  if (!nome || !crp || !email || !whats) {
    msg.textContent = '⚠️ Preencha todos os campos.';
    msg.className = 'form-msg erro';
    return;
  }

  msg.textContent = '✅ Obrigado, ' + nome.split(' ')[0] + '! Recebemos seu interesse como parceiro.';
  msg.className = 'form-msg sucesso';
  this.reset();
});