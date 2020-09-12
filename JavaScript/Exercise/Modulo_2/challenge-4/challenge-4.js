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
      const tagli = createTag().tag;
      const textli = createTag(item).textNode;
      addInFragment(tagli, textli, fragment, $ul);
    });
  }

  function addValueInUl() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field'); 
    const tagli = createTag().tag;
    const textli = createTag(inputValue).textNode;
    addInFragment(tagli, textli, fragment, $ul);
  }

  function createTag(textTag) {
    const tagli = doc.createElement('li');
    const textli = doc.createTextNode(textTag);
    return {
      tag: tagli,
      textNode: textli
    }
  }

  function addInFragment(tag, textNode, fragment, ul) {
    tag.appendChild(textNode);
    fragment.appendChild(tag);
    return ul.appendChild(fragment); 
  }

})(window, document);