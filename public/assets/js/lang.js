let idiomaActual = 'es';
let traducciones = {}; // Variable global

async function cambiarIdioma(lang) {
  idiomaActual = lang;
  console.log(`[WebClass] Intentando cambiar a: ${lang}`);

  try {
    const response = await fetch(`assets/lang/${lang}.json`);
    if (!response.ok) throw new Error("Archivo de idioma no encontrado");

    traducciones = await response.json();
    console.log("[WebClass] Traducciones cargadas:", traducciones);

    traducirPagina(traducciones);             // Traduce página principal
    traducirMenuLateral(traducciones);        // Traduce menú clonado

    // ✅ Si estás en perfil.html
    if (window.location.pathname.includes("perfil.html")) {
      actualizarPerfil(traducciones); // Esta función debe estar definida en perfil.html
    }

  } catch (error) {
    console.error('[WebClass] Error al cargar el archivo de idioma:', error);
  }
}
