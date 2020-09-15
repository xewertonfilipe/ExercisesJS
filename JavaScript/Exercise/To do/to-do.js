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
      // tagli.style.display = 'inline-block';
      // tagli.style.marginRight = '10px';
      const textli = createTag(item).li_textNode;
      const tagA = createTag().tagA;
      tagA.setAttribute('href', '#');
      const textA = createTag('Excluir').a_textNode;
      addInFragment(tagli, textli, fragment, $ul);
      addInFragment(tagA, textA, fragment, $ul);
    });
  }

  function addValueInUl() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field');
    const tagli = createTag().tagli;
    const textli = createTag(inputValue).li_textNode;
    const tagA = createTag().tagA;
    tagA.setAttribute('href', '#');
    const textA = createTag('Excluir').a_textNode;
    addInFragment(tagli, textli, fragment, $ul);
    addInFragment(tagA, textA, fragment, $ul);
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

  function addInFragment(tag, textNode, fragment, ul) {
    tag.appendChild(textNode);
    fragment.appendChild(tag);
    return ul.appendChild(fragment); 
  }

})(window, document);