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
      const tagli = createTag().tagli;
      const textli = createTag(item).li_textNode;
      tagli.appendChild(textli);
      const tagA = createTag().tagA;
      const textA = createTag(' Delete').a_textNode;
      tagA.setAttribute('href', '#');
      tagA.setAttribute('id', 'del');
      tagA.appendChild(textA);
      tagli.appendChild(tagA);
      addInFragment(tagli, fragment, $ul);
      deleteItem();
    });
  }

  function addValueInUl() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field');
    const tagli = createTag().tagli;
    const textli = createTag(inputValue).li_textNode;
    tagli.appendChild(textli);
    const tagA = createTag().tagA;
    const textA = createTag(' Delete').a_textNode;
    tagA.setAttribute('href', '#');
    tagA.setAttribute('id', 'del');
    tagA.appendChild(textA);
    tagli.appendChild(tagA);
    addInFragment(tagli, fragment, $ul);
    deleteItem();
  }

  function createTag(textTag) {
    const tagli = doc.createElement('li');
    const textli = doc.createTextNode(textTag);
    const tagA = doc.createElement('a');
    const textA = doc.createTextNode(textTag);
    return {
      tagli: tagli,
      li_textNode: textli,
      tagA: tagA,
      a_textNode: textA
    }
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
        }, true);
    }
  }

})(window, document);