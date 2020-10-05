(function(win, doc) {
  'use strict';

  let fragment = doc.createDocumentFragment();
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
    removeSubTitleWithUser();
    searchUser($inputNameUser.value);
  }

  function searchUser(user) {
    setTimeout(() => {
      axios.get('https://api.github.com/users/' + user + '/repos')
      .then(function(resolve) {
        createRepos(resolve);
      })
      .catch(function(error) {
        userNotFound(error);
      });
    }, 1800)
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

  function removeSubTitleWithUser() {
    if($subtitle.classList.contains('showSubTitle')) {
      $subtitle.classList.remove('showSubTitle');
    }
  }

  function createRepos(resolve) {
    if(userNotFound(resolve)) return;
    load();
    showSubTitleWithUser($inputNameUser);
    let ol = createTag('ol');
    createAttribute(ol, 'data-js', 'list-repos');
    addRepoInLiAndOl(resolve, ol);
    addFragmentInApp(ol, $repos);
    enableButton($btnSearchUser);
    clearInput($inputNameUser);
  }

  function userNotFound(resolve, error) {
    if(resolve.data.length === 0) {
      load();
      enableButton($btnSearchUser);
      console.log("User not found: ", error);
      return true;
    }
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

  function addFragmentInApp(element, appLocation) {
    fragment.appendChild(element);
    return appLocation.appendChild(fragment);
  }

})(window, document);