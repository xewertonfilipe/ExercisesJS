(function(win, doc) {
  'use strict';

  function checkAge(age) {
    return new Promise(function(resolve, reject) {
      if (age >= 18) {
        resolve();
      } else {
        reject();
      }
    })
  }

  setInterval(() => {
    checkAge(19)
    .then(function() {
      console.log('Maior que 18')
    })
    .catch(function() {
      console.log('Menor que 18')
    });
  }, 2000)
  

})(window, document);