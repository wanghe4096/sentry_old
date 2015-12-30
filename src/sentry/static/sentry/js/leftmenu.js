/**
 * Created by yuan on 15/12/25.
 */

(function () {
  var menu = document.getElementById('bt-menu'),
    $trigger = $('a.bt-menu-trigger'),
    triggerPlay = document.querySelector('a.bt-menu-trigger-out');

  function resetMenu() {
    $(menu)
      .removeClass('bt-menu-open')
      .addClass('bt-menu-close');
  }

  $trigger.on('click', function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if ($(menu).hasClass('bt-menu-open')) {
      resetMenu();
    }
    else {
      $(menu)
        .removeClass('bt-menu-close')
        .addClass('bt-menu-open');
    }
  });

  if (triggerPlay) {
    triggerPlay.addEventListener('click', function (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      $(menu)
        .removeClass('bt-menu-close')
        .addClass('bt-menu-open');
    });
  }

})();

