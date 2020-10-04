(function(win, doc) {
  'use strict';

  let fragment = doc.createDocumentFragment();
  const $inputNameUser = doc.querySelector('[data-js="user"]');
  const $btnSearchUser = doc.querySelector('[data-js="search-user"]');
  const $load = doc.querySelector('[data-js="load"]');
  let $subtitle = doc.querySelector('[data-js="subtitle"]');
  const $repos = doc.querySelector('[data-js="repos"]');

  $btnSearchUser.addEventListener('click', searchUser, false);
    
  function searchUser() {
    load();
    removeOl();
    disableButton($btnSearchUser, 'disabled');
    removeSubTitleWithUser();
    const user = $inputNameUser.value;
    setTimeout(() => {
      axios.get('https://api.github.com/users/' + user + '/repos')
      .then(function(resolve) {
        createRepos(resolve);
      })
      .catch(function(error) {
        console.log(error);
      });
    },2000)
  }

  function clearInput(input) {
    return input.value = '';
  }

  function load() {
    $load.classList.toggle('load-off');
  }

  function disableButton(btn, status) {
    createAttribute(btn, status, '');
  }

  function enableButton(btn) {
    btn.removeAttribute('disabled');
  }

  function showSubTitleWithUser($inputNameUser) {
    if(!$subtitle.classList.contains('showSubTitle')) {
      $subtitle.classList.add('showSubTitle');
      $subtitle.removeChild($subtitle.firstElementChild);
      addElementChild($subtitle, 'List of repositories:');
    }
  }

  function addElementChild(element, textNode) {
    const newSubTitle = createTagWithTextNode('h2', textNode + ' ' + $inputNameUser.value);
    return element.appendChild(newSubTitle);
  }

  function removeSubTitleWithUser() {
    if($subtitle.classList.contains('showSubTitle')) {
      $subtitle.classList.remove('showSubTitle');
    }
  }

  function createRepos(resolve) {
    load();
    showSubTitleWithUser($inputNameUser);
    let ol = createTag('ol');
    createAttribute(ol, 'data-js', 'list-repos');
    addRepoInLiAndOl(resolve, ol);
    addInFragment(fragment, ol)
    enableButton($btnSearchUser);
    clearInput($inputNameUser);
  }

  function createTag(tag) {
    const element = doc.createElement(tag);
    return element;
  }

  function createAttribute(tag, attribute, value) {
    tag.setAttribute(attribute, value);
  }

  function addRepoInLiAndOl(resolve, ol) {
    for (const repos of resolve.data) {
      const li = createTagWithTextNode('li', repos.name)
      addValueInOl(ol, li);
    }
  }

  function createTagWithTextNode(tag, textNode) {
    const element = doc.createElement(tag);
    const text = doc.createTextNode(textNode);
    element.appendChild(text);
    return element;
  }

  function addValueInOl(ol, tagWithTextNode) {
    return ol.appendChild(tagWithTextNode);
  }

  function removeOl() {
    const $div = doc.querySelector('[data-js="repos"]');
    const $ol = doc.querySelector('[data-js="list-repos"]');
    if($ol)
      $div.removeChild($ol);
  }

  function addInFragment(fragment, ol) {
    fragment.appendChild(ol);
    return $repos.appendChild(fragment);
  }

})(window, document);