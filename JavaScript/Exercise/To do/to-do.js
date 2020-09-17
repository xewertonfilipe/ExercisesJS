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
      const tagli = createTag('li', item)
      const tagA = createTag('a', ' Delete');
      createAttribute(tagA, 'href', '#');
      createAttribute(tagA, 'id', 'del');
      tagli.appendChild(tagA);
      addInFragment(tagli, fragment, $ul);
      deleteItem();
    });
  }

  function addValueInUl() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field');
    $input.value = '';
    const tagli = createTag('li', inputValue)
    const tagA = createTag('a', ' Delete');
    createAttribute(tagA, 'href', '#');
    createAttribute(tagA, 'id', 'del');
    tagli.appendChild(tagA);
    addInFragment(tagli, fragment, $ul);
    deleteItem();
  }

  function createTag(tag, textNode) {
    const element = doc.createElement(tag);
    const text = doc.createTextNode(textNode);
    element.appendChild(text);
    return element;
  }

  function createAttribute(tag, attribute, value ) {
    tag.setAttribute(attribute, value);
  }

  function addInFragment(tag, fragment, ul) {
    fragment.appendChild(tag);
    return ul.appendChild(fragment);
  }

  function deleteItem() {
    let del = doc.querySelectorAll('#del');
    for (const iterator of del) {
        iterator.addEventListener('click', function() {
          iterator.parentNode.remove();
        }, false);
    }
  }

})(window, document);