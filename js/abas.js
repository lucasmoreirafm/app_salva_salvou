let app = JSON.parse(localStorage.getItem('app')) || { abas: [] };
let abaAtual = app.abas[0] || null;

function salvar() {
  localStorage.setItem('app', JSON.stringify(app));
  renderAbas();
  renderAnotacoes();
}

function renderAbas() {
  const div = document.getElementById('abas');
  div.innerHTML = '';

  app.abas.forEach((a, idx) => {
    const btn = document.createElement('button');
    btn.textContent = a.nome;
    btn.onclick = () => {
      abaAtual = a;
      renderAnotacoes();
    };

    // Botão renomear aba
    const renomearBtn = document.createElement('button');
    renomearBtn.textContent = '✏️';
    renomearBtn.title = 'Renomear aba';
    renomearBtn.onclick = (e) => {
      e.stopPropagation(); // evita disparar o botão da aba
      const novoNome = prompt('Novo nome da aba', a.nome);
      if (novoNome) {
        a.nome = novoNome;
        salvar();
      }
    };

    // Botão excluir aba
    const excluirBtn = document.createElement('button');
    excluirBtn.textContent = '🗑️';
    excluirBtn.title = 'Excluir aba';
    excluirBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Excluir a aba "${a.nome}"?`)) {
        app.abas.splice(idx, 1);
        if (app.abas.length > 0) {
          abaAtual = app.abas[0];
        } else {
          abaAtual = null;
        }
        salvar();
      }
    };

    const container = document.createElement('div');
    container.style.marginBottom = '5px';
    container.appendChild(btn);
    container.appendChild(renomearBtn);
    container.appendChild(excluirBtn);

    div.appendChild(container);
  });
}

function renderAnotacoes() {
  const div = document.getElementById('anotacoes');
  div.innerHTML = '';

  if (!abaAtual) {
    div.textContent = 'Nenhuma aba selecionada.';
    return;
  }

  abaAtual.anotacoes.forEach((n, idx) => {
    const card = document.createElement('div');
    card.style.border = '1px solid #ccc';
    card.style.marginBottom = '5px';
    card.style.padding = '5px';

    const titulo = document.createElement('strong');
    titulo.textContent = n.titulo;
    card.appendChild(titulo);

    const conteudo = document.createElement('p');
    conteudo.textContent = n.conteudo;
    card.appendChild(conteudo);

    // Botão renomear anotação
    const renomearBtn = document.createElement('button');
    renomearBtn.textContent = '✏️';
    renomearBtn.title = 'Renomear anotação';
    renomearBtn.onclick = () => {
      const novoTitulo = prompt('Novo título', n.titulo);
      const novoConteudo = prompt('Novo conteúdo', n.conteudo);
      if (novoTitulo !== null && novoConteudo !== null) {
        n.titulo = novoTitulo;
        n.conteudo = novoConteudo;
        salvar();
      }
    };

    // Botão excluir anotação
    const excluirBtn = document.createElement('button');
    excluirBtn.textContent = '🗑️';
    excluirBtn.title = 'Excluir anotação';
    excluirBtn.onclick = () => {
      if (confirm(`Excluir a anotação "${n.titulo}"?`)) {
        abaAtual.anotacoes.splice(idx, 1);
        salvar();
      }
    };

    card.appendChild(renomearBtn);
    card.appendChild(excluirBtn);

    div.appendChild(card);
  });
}

function novaAba() {
  const nome = prompt('Nome da aba');
  if (!nome) return;
  app.abas.push({ id: Date.now(), nome, anotacoes: [] });
  if (!abaAtual) abaAtual = app.abas[app.abas.length - 1];
  salvar();
}

function novaAnotacao() {
  if (!abaAtual) {
    alert('Crie ou selecione uma aba primeiro!');
    return;
  }
  const titulo = prompt('Título');
  if (!titulo) return;
  const conteudo = prompt('Conteúdo');
  if (conteudo === null) return;
  abaAtual.anotacoes.push({ id: Date.now(), titulo, conteudo });
  salvar();
}

// Inicialização
if (app.abas.length > 0) {
  abaAtual = app.abas[0];
}

salvar();
