/* main.js actualizado para WebClass con barra fija corregida */

(function ($) {
  var $window = $(window),
    $body = $('body');

  // Breakpoints para diseño responsive
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px']
  });

  // Eliminar clase preload
  $window.on('load', function () {
    setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Dropotron solo para el menú superior
  $('#nav > ul').dropotron({
    alignment: 'right',
    offsetY: -15,
    baseZIndex: 10000
  });

  // Clonar menú original para el panel lateral
  const $navOriginal = $('#nav');
  const $navClone = $navOriginal.clone(true).attr('id', 'navClonado');

  // Eliminar estilos heredados que interfieren con el panel lateral
  $navClone.find('ul').removeAttr('style').removeClass('dropotron');
  $navClone.find('li').removeClass('hover');

  // Botón hamburguesa
  $('<div id="navButton">\n  <a href="#navPanel" class="toggle"></a>\n</div>').appendTo($body);

  // Crear el panel lateral e insertar el menú clonado
  $('<div id="navPanel">\n  <nav></nav>\n</div>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'navPanel-visible'
    })
    .find('nav')
    .append($navClone.children());

  // ✅ CORREGIDO: No quitar clase 'alt', solo cambiar color si deseas efecto visual
  const $header = $('#header');
if ($header.hasClass('alt')) {
  $window.on('scroll', function () {
    if ($window.scrollTop() > 100) {
      $header.removeClass('alt');
    } else {
      $header.addClass('alt');
    }
  });
}


})(jQuery);
