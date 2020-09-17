(function(win, doc) {
  'use strict';
  
  let fragment = doc.createDocumentFragment();
  const names = ['Emanoeli', 'Ewerton', 'Filipe'];
  const $input = doc.querySelector('[data-js="value"]');
  const $btnAdd = doc.querySelector('[data-js="add"]');
  const $ul = doc.querySelector('#names');

  $btnAdd.addEventListener('click', addValueInUl, false);

  createTagFromArray();

  function createTagFromArray() {
    names.map(function(item) {
      const tagli = createTag('li', item);
      addInFragment(tagli, textli, fragment, $ul);
    });
  }

  function addValueInUl() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field');
    $input.value = '';
    const tagli = createTag('li', inputValue);
    addInFragment(tagli, fragment, $ul);
  }

  function createTag(tag, textNode) {
    const element = doc.createElement(tag);
    const text = doc.createTextNode(textNode);
    element.appendChild(text);
    return element;
  }

  function addInFragment(tag, fragment, ul) {
    fragment.appendChild(tag);
    return ul.appendChild(fragment); 
  }

})(window, document);