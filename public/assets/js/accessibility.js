function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function toggleTextSize() {
  document.body.classList.toggle("large-text");
}

let speaking = false;

function toggleVoice() {
  if (!speaking) {
    const texto = document.body.innerText;
    const msg = new SpeechSynthesisUtterance(texto);

    // Asegura que idiomaActual esté definido
    let idioma = typeof idiomaActual !== "undefined" ? idiomaActual : localStorage.getItem("idiomaWebClass") || "es";

    switch (idioma) {
      case 'en':
        msg.lang = 'en-US';
        break;
      case 'pt':
        msg.lang = 'pt-BR';
        break;
      default:
        msg.lang = 'es-ES';
        break;
    }

    window.speechSynthesis.speak(msg);
    speaking = true;
    msg.onend = () => (speaking = false);
  } else {
    window.speechSynthesis.cancel();
    speaking = false;
  }
}
