function traducirPagina(textos) {
  console.log("[WebClass] Aplicando traducciones...");

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const clave = el.getAttribute('data-i18n');
    if (textos[clave]) {
      el.innerHTML = textos[clave];
      console.log(`[WebClass] Traducido: ${clave} -> ${textos[clave]}`);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const clave = el.getAttribute('data-i18n-placeholder');
    if (textos[clave]) {
      el.setAttribute('placeholder', textos[clave]);
    }
  });

  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const clave = el.getAttribute('data-i18n-value');
    if (textos[clave]) {
      el.setAttribute('value', textos[clave]);
    }
  });
}

// Traduce específicamente el menú lateral clonado
function traducirMenuLateral(textos) {
  const navClonado = document.querySelector('#navClonado');
  if (!navClonado) return;

  navClonado.querySelectorAll('[data-i18n]').forEach(el => {
    const clave = el.getAttribute('data-i18n');
    if (textos[clave]) {
      el.innerHTML = textos[clave];
      console.log(`[WebClass] Traducido (clonado): ${clave} -> ${textos[clave]}`);
    }
  });

  navClonado.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const clave = el.getAttribute('data-i18n-placeholder');
    if (textos[clave]) {
      el.setAttribute('placeholder', textos[clave]);
    }
  });

  navClonado.querySelectorAll('[data-i18n-value]').forEach(el => {
    const clave = el.getAttribute('data-i18n-value');
    if (textos[clave]) {
      el.setAttribute('value', textos[clave]);
    }
  });

  console.log("[WebClass] Traducción reaplicada al menú lateral");
}
