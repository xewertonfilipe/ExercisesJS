(function(win, doc) {
  'use strict';
  
  const names = ['Emanoeli', 'Ewerton', 'Filipe'];
  const $ul = doc.querySelector('#names');

  createTag();

  function createTag() {
    const fragment = doc.createDocumentFragment();
    names.map(function(item) {
      const tagli = doc.createElement('li');
      const textli = doc.createTextNode(item);
      tagli.appendChild(textli);
      return fragment.appendChild(tagli);
    });

    return $ul.appendChild(fragment);
  }

})(window, document);