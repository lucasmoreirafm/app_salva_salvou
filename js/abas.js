let app = JSON.parse(localStorage.getItem('app')) || { abas: [] };
let abaAtual = app.abas[0];

function renderAbas() {
  const div = document.getElementById('abas');
  div.innerHTML = '';
  app.abas.forEach(a => {
    const btn = document.createElement('button');
    btn.textContent = a.nome;
    btn.onclick = () => { abaAtual = a; renderAnotacoes(); };
    div.appendChild(btn);
  });
}

function renderAnotacoes() {
  const div = document.getElementById('anotacoes');
  div.innerHTML = '';
  abaAtual.anotacoes.forEach(n => {
    const card = document.createElement('div');
    card.innerHTML = `<strong>${n.titulo}</strong><p>${n.conteudo}</p>`;
    div.appendChild(card);
  });
}

function novaAba() {
  const nome = prompt('Nome da aba');
  if (!nome) return;
  app.abas.push({ id: Date.now(), nome, anotacoes: [] });
  salvar();
}

function novaAnotacao() {
  const titulo = prompt('Título');
  const conteudo = prompt('Conteúdo');
  abaAtual.anotacoes.push({ id: Date.now(), titulo, conteudo });
  salvar();
}

function salvar() {
  localStorage.setItem('app', JSON.stringify(app));
  renderAbas();
  renderAnotacoes();
}

renderAbas();
renderAnotacoes();
