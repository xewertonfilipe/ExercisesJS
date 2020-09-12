(function(win, doc) {
    'use strict';

    const $btnCreateSquare = doc.querySelector('[data-js="create-square"]');
    const $containerElement = doc.querySelector('#app');
    $btnCreateSquare.addEventListener('click', createSquare, false);

    function createSquare() {
      const fragment = doc.createDocumentFragment();
      const tagDiv = doc.createElement('div');
      $btnCreateSquare.style.display = 'block';
      tagDiv.style.display = 'inline-block';
      tagDiv.style.width = '100px';
      tagDiv.style.height = '100px';
      tagDiv.style.backgroundColor = '#F4A460';
      tagDiv.style.marginTop = '10px';
      tagDiv.style.marginRight = '10px';
      fragment.appendChild(tagDiv);

      return $containerElement.appendChild(fragment);

    }
})(window, document);