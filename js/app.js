if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

function irParaAbas() {
  const data = JSON.parse(localStorage.getItem('app')) || { abas: [] };
  if (data.abas.length === 0) {
    data.abas.push({ id: Date.now(), nome: 'Minha aba', anotacoes: [] });
    localStorage.setItem('app', JSON.stringify(data));
  }
  location.href = 'abas.html';
}
