function salvarPerfil() {
  const reader = new FileReader();
  const foto = document.getElementById('foto').files[0];

  reader.onload = () => {
    const app = JSON.parse(localStorage.getItem('app')) || {};
    app.perfil = {
      nome: nome.value,
      idade: idade.value,
      localidade: localidade.value,
      foto: reader.result
    };
    localStorage.setItem('app', JSON.stringify(app));
    alert('Perfil salvo!');
  };

  if (foto) reader.readAsDataURL(foto);
}
