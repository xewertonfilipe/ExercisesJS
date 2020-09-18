(function(win, doc) {
  'use strict';
  
  let fragment = doc.createDocumentFragment();
  const todos = ['Make coffe', 'Studying JavaScript', 'Refactor the code'];
  const $input = doc.querySelector('[data-js="value"]');
  const $btnAdd = doc.querySelector('[data-js="add"]');
  const $ul = doc.querySelector('#todos');

  $btnAdd.addEventListener('click', addValueInUl, false);

  createTagFromArray(todos);

  function createTagFromArray(todos) {
    todos.map(function(item) {
      const li = createTag('li', item);
      const a = createTag('a', ' Delete');
      createAttribute(a, 'href', '#');
      createAttribute(a, 'id', 'del');
      li.appendChild(a);
      addFragment(li, fragment, $ul);
      deleteItem();
    });
  }

  function addValueInUl() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field');
    $input.value = '';
    const li = createTag('li', inputValue)
    const a = createTag('a', ' Delete');
    createAttribute(a, 'href', '#');
    createAttribute(a, 'id', 'del');
    li.appendChild(a);
    addFragment(li, fragment, $ul);
    deleteItem();
  }

  function createTag(tag, textNode) {
    const element = doc.createElement(tag);
    const text = doc.createTextNode(textNode);
    element.appendChild(text);
    return element;
  }

  function createAttribute(tag, attribute, value) {
    tag.setAttribute(attribute, value);
  }

  function addFragment(tag, fragment, ul) {
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