(function(win, doc) {
    'use strict';

    let $years;
    const $go = doc.querySelector('[data-js="go"]');
    const v_years = 0;

    $go.addEventListener('click', captureValue, false);

    function captureValue(e) {
      $years = doc.querySelector('[data-js="years"]');
      const v_years = Number($years.value);

      return experience(v_years);
    }

    function experience(v_years) {
      if(v_years <= 1)
        alert('Beginner');

      if(v_years > 1 && v_years <= 3)
        alert('Intermediate');

      if(v_years >= 4 && v_years <= 6)
        alert('Advanced');

      if(v_years >= 7)
        alert(' Jedi Master');

      $years.value = '';

    }

})(window, document);