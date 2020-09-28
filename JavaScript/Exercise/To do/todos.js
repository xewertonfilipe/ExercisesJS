(function(win, doc) {
  'use strict';
  
  let fragment = doc.createDocumentFragment();
  const $ul = doc.querySelector('#todos');
  const $input = doc.querySelector('[data-js="value"]');
  const $btnAdd = doc.querySelector('[data-js="add"]');
  let todos = JSON.parse(localStorage.getItem('list_todos')) || [];

  $btnAdd.addEventListener('click', addTodo, false);

  createTagFromArray();

  function createTagFromArray() {
    $ul.innerHTML = '';
    
    for (let todo of todos) {
      const li = createTag('li', todo);
      const a = createTag('a', ' Delete');
      const positionTodo = todos.indexOf(todo);
      createAttribute(a, 'href', '#');
      createAttribute(a, 'data-js', positionTodo);
      li.appendChild(a);
      addFragment(li, fragment, $ul);
      deleteTodo(positionTodo);
    }
  }

  function addTodo() {
    const inputValue = $input.value;
    if(!!!inputValue) return alert('Empty Field');
    todos.push(inputValue);
    $input.value = '';
    createTagFromArray();
    saveToStorage();
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

  function deleteTodo(positionTodo) {
    let delTodo = doc.querySelector('[data-js="' +positionTodo+ '"');
    delTodo.addEventListener('click', function() {
          todos.splice(positionTodo, 1)
          createTagFromArray();
          saveToStorage();
        }, false);
  }

  function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
  }

})(window, document);