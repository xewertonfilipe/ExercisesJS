(function(win, doc) {
    'use strict';

    const $do = doc.querySelector('[data-js="do"]');
    let v_number_one = 0;
    let v_number_two = 0;

    $do.addEventListener('click', captureValue, false);

    function captureValue(e) {
      e.preventDefault();
      v_number_one = doc.querySelector('[data-js="number-one"]').value;
      v_number_two = doc.querySelector('[data-js="number-two"]').value;

      return pairs(v_number_one, v_number_two);
    }

    function pairs(v_number_one, v_number_two) {
      const number_one = Number(v_number_one);
      const number_two = Number(v_number_two);

      let limit = 0
      
      if(number_one < number_two)
        limit =  number_two - number_one;

      if(number_one > number_two)
      return alert('Number one cannot be greater than number two');

      let increment = number_one;
      let arr_number_pairs = [];
      if(increment <= number_two) {
        for (increment; increment <= limit; increment++) {
          if (increment % 2 === 0)
            arr_number_pairs.push(increment);
        }
      }

      const fragment = doc.createDocumentFragment();
      const tagP = doc.createElement('p');
      const textElement = doc.createTextNode('Numbers: ' + arr_number_pairs);
      tagP.appendChild(textElement);
      fragment.appendChild(tagP);

      return doc.body.appendChild(fragment);
    }

})(window, document);