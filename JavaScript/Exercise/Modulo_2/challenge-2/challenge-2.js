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
    tagDiv.setAttribute('data-js', 'div-random-color');
    fragment.appendChild(tagDiv);
    $containerElement.appendChild(fragment);

    return eventListenerInDiv();

  }

  function eventListenerInDiv() {
    const $allDivs = doc.querySelectorAll('[data-js="div-random-color"]');
    console.log('Divs: ', $allDivs);
    for (let div of $allDivs) {
        div.addEventListener('mouseover', changeColor, false);
    }
  }

  function changeColor() {
    this.style.backgroundColor = getRandomColor();
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[ Math.floor(Math.random() * 16) ];
    }

    return color;
  }



})(window, document);