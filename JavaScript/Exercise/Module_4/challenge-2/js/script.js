(function(win, doc) {
  'use strict';

  const $inputNameUser = doc.querySelector('[data-js="user"]');
  const $btnSearchUser = doc.querySelector('[data-js="search-user"]');
  const $repos = doc.querySelector('[data-js="repos"]');
  let fragment = doc.createDocumentFragment();

  $btnSearchUser.addEventListener('click', searchUser, false);
  
  
  function searchUser() {
    const user = $inputNameUser.value;
    axios.get('https://api.github.com/users/' + user + '/repos')
      .then(function(resolve) {
       createRepos(resolve);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function createRepos(resolve) {
    let ol = createTag('ol');
    createAttribute(ol, 'data-js', 'list-repos');
    addRepoInLiAndUl(resolve, ol);
    removeOl();
    addInFragment(fragment, ol)
  }

  function createTag(tag) {
    const element = doc.createElement(tag);
    return element;
  }

  function createAttribute(tag, attribute, value) {
    tag.setAttribute(attribute, value);
  }

  function addRepoInLiAndUl(resolve, ul) {
    for (const repos of resolve.data) {
      const li = createTagWithTextNode('li', repos.name)
      addValueInUl(ul, li);
    }
  }

  function createTagWithTextNode(tag, textNode) {
    const element = doc.createElement(tag);
    const text = doc.createTextNode(textNode);
    element.appendChild(text);
    return element;
  }

  function addValueInUl(ul, tagWithTextNode) {
    return ul.appendChild(tagWithTextNode);
  }

  function removeOl() {
    const $div = doc.querySelector('[data-js="repos"]');
    const $ol = doc.querySelector('[data-js="list-repos"]');
    if($ol)
      $div.removeChild($ol);
  }

  function addInFragment(fragment, ul) {
    fragment.appendChild(ul);
    return $repos.appendChild(fragment);
  }

})(window, document);