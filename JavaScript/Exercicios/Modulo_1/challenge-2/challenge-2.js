(function(win, doc) {
    'use strict';

    let v_number_one = 0;
    let v_number_two = 0;

    const $do = doc.querySelector('[data-js="do"]');

    $do.addEventListener('click', captureValue, false);

    function pairs(v_number_one, v_number_two) {
      
      const base = v_number_one - v_number_two
      let increment = v_number_one;
      let arr_number_pairs = [];
      console.log(v_number_one);
      // if(increment <= v_number_two) {
      //   for (let increment; increment <= base; increment++) {
      //     increment % 2 === 0 ? arr_number_pairs.push(icrement) : false;
      //   }
      // }

      // return arr_number_pairs;

    }

    function captureValue(e) {
      e.preventDefault();
      v_number_one = doc.querySelector('[data-js="number-one"]').value;
      v_number_two = doc.querySelector('[data-js="number-two"]').value;
    }

    console.log(v_number_one, v_number_two);

})(window, document);