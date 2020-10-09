(function(win, doc) {
  'use strict';

  let fragment = doc.createDocumentFragment();
  axios.defaults.baseURL = 'https://api.github.com/users/';
  const $inputNameUser = doc.querySelector('[data-js="user"]');
  const $btnSearchUser = doc.querySelector('[data-js="search-user"]');
  const $load = doc.querySelector('[data-js="load"]');
  let $subtitle = doc.querySelector('[data-js="subtitle"]');
  let $repos = doc.querySelector('[data-js="repos"]');


  $btnSearchUser.addEventListener('click', startAplication, false);
    
  function startAplication() {
    load();
    removeOl();
    disableButton($btnSearchUser, 'disabled');
    removeClassInSubTitle();
    setTimeout(() => {
    searchUser($inputNameUser.value);
    }, 2000);
  }

  function searchUser(user) {
      axios.get(user + '/repos')
      .then(function(response) {
        createRepos(response);
      })
      .catch(function(error) {
        userNotFound();
      });
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
    const newSubTitle = createTagWithTextNode('h3', textNode + ' ' + $inputNameUser.value);
    return element.appendChild(newSubTitle);
  }

  function removeClassInSubTitle() {
    if($subtitle.classList.contains('showSubTitle'))
     return $subtitle.classList.remove('showSubTitle');
  }

  function createRepos(response) {
    load();
    showSubTitleWithUser($inputNameUser);
    let ol = createTag('ol');
    createAttribute(ol, 'data-js', 'list-repos');
    addRepoInLiAndOl(response, ol);
    addFragmentInApp(ol, $repos);
    enableButton($btnSearchUser);
    clearInput($inputNameUser);
  }

  function userNotFound() {
    load();
    addSubTitleUserNotFound();
  }

  function addClassInSubtitle() {
    if(!$subtitle.classList.contains('showSubTitle'))
       $subtitle.classList.add('showSubTitle');
  }

  function addSubTitleUserNotFound() {
    $subtitle.removeChild($subtitle.firstElementChild);
    const notUser = createTagWithTextNode('h3', 'User not found.');
    addFragmentInApp(notUser, $subtitle);
    addClassInSubtitle();
  }

  function createTag(tag) {
    const element = doc.createElement(tag);
    return element;
  }

  function createAttribute(tag, attribute, value) {
    tag.setAttribute(attribute, value);
  }

  function addRepoInLiAndOl(response, ol) {
    for (const repos of response.data) {
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

  function addFragmentInApp(element, appLocation) {
    fragment.appendChild(element);
    return appLocation.appendChild(fragment);
  }

})(window, document);