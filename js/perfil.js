window.onload = () => {
  const app = JSON.parse(localStorage.getItem('app')) || {};
  if (app.perfil) {
    document.getElementById('nome').value = app.perfil.nome || '';
    document.getElementById('idade').value = app.perfil.idade || '';
    document.getElementById('localidade').value = app.perfil.localidade || '';

    if (app.perfil.foto) {
      // Remove foto antiga se existir
      const fotoAntiga = document.getElementById('foto-preview');
      if (fotoAntiga) fotoAntiga.remove();

      // Exibe a foto na página
      const img = document.createElement('img');
      img.id = 'foto-preview';
      img.src = app.perfil.foto;
      img.alt = 'Foto de perfil';
      img.style.maxWidth = '150px';
      img.style.display = 'block';
      img.style.marginTop = '10px';

      // Insere logo após o input de foto
      document.getElementById('foto').insertAdjacentElement('afterend', img);
    }
  }
};

function salvarPerfil() {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const localidade = document.getElementById('localidade').value;
  const fotoInput = document.getElementById('foto');
  const foto = fotoInput.files[0];

  if (foto) {
    const reader = new FileReader();
    reader.onload = () => {
      salvarDados(nome, idade, localidade, reader.result);
    };
    reader.readAsDataURL(foto);
  } else {
    // Mantém a foto anterior caso não envie nova
    const app = JSON.parse(localStorage.getItem('app')) || {};
    const fotoBase64 = app.perfil ? app.perfil.foto : null;
    salvarDados(nome, idade, localidade, fotoBase64);
  }
}

function salvarDados(nome, idade, localidade, fotoBase64) {
  const app = JSON.parse(localStorage.getItem('app')) || {};
  app.perfil = { nome, idade, localidade, foto: fotoBase64 };
  localStorage.setItem('app', JSON.stringify(app));
  alert('Perfil salvo!');
  location.reload();  // recarrega para mostrar a foto atualizada
}
