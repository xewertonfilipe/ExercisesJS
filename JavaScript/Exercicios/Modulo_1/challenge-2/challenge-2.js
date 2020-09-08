(function(win, doc) {
    'use strict';

    const $number_one = doc.querySelector('[data-js="number_one"]');
    const $number_two = doc.querySelector('[data-js="number_two"]');
    const $do = doc.querySelector('[data-js="do"]');


    $do.addEventListener('click', pairs, false);

    function pairs($number_one, $number_two) {
      const v_number_one = $number_one;
      const v_number_two = $number_two;
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



})(window, document);