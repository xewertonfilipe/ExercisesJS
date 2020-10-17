(function(win, doc) {
  'use strict';

  axios.defaults.baseURL = 'https://api.github.com/users/';
  const fragment = doc.createDocumentFragment();
  const $userName = doc.querySelector('[data-js="userName"]');
  const $btnSearchUser = doc.querySelector('[data-js="search-user"]');
  const $load = doc.querySelector('[data-js="load"]');
  const $notification = doc.querySelector('[data-js="notification"]');
  const $repos = doc.querySelector('[data-js="repos"]');

  $btnSearchUser.addEventListener('click', startAplication, false);
  $userName.addEventListener('keyup', ({key}) => {
    if (key === 'Enter') startAplication();
  });
    
  function startAplication() {
    toggleLoad();
    clearInfo();
    disableButton($btnSearchUser);
    setTimeout(() => {
    searchUser($userName.value);
    }, 2000);
  }

  function toggleLoad() {
    $load.classList.toggle('load-off');
  }

  function clearInfo() {
    if($repos.firstElementChild) {
      $repos.removeChild($repos.firstElementChild);
    }
    if($notification.firstElementChild) {
      $notification.removeChild($notification.firstElementChild);
    }
  }

  function disableButton(element) {
    createAttribute(element, 'disabled', '');
  }

  function createAttribute(element, name, value) {
    element.setAttribute(name, value);
  }

  function searchUser(user) {
      axios.get(user + '/repos')
      .then(function(response) {
        hasRepo(response);
      })
      .catch(function(error) {
        userNotFound();
      });
  }

  function hasRepo(response) {
    if(!response.data.length) {
      toggleLoad();
      addNotification('User not has repos: ');
      enableButton($btnSearchUser);
      clearInput($userName);
      addFocus($userName);
      return;
    }
    return createRepos(response);
  }
  
  function addNotification(textNode) {
    const tagFull = createTagWithTextNode('p', textNode + $userName.value);
    addFragmentInApp(tagFull, $notification);
  }

  function createTagWithTextNode(tag, textNode) {
    const element = doc.createElement(tag);
    const text = doc.createTextNode(textNode);
    element.appendChild(text);
    return element;
  }
  
  function addFragmentInApp(element, appLocation) {
    fragment.appendChild(element);
    return appLocation.appendChild(fragment);
  }

  function enableButton(btn) {
    btn.removeAttribute('disabled');
  }

  function clearInput(input) {
    return input.value = '';
  }

  function addFocus(element) {
    element.focus();
  }

  function createRepos(response) {
    toggleLoad();
    addNotification('List of repositories: ');
    let olRepos = createTag('ol');
    createAttribute(olRepos, 'data-js', 'list-repos');
    addRepoInLiAndOl(response, olRepos);
    addFragmentInApp(olRepos, $repos);
    enableButton($btnSearchUser);
    clearInput($userName);
    addFocus($userName);
  }

  function createTag(tag) {
    const element = doc.createElement(tag);
    return element;
  }

  function addRepoInLiAndOl(response, ol) {
    for (const repos of response.data) {
      const li = createTagWithTextNode('li', repos.name)
      addValueInOl(ol, li);
    }
  }

  function addValueInOl(ol, tagWithTextNode) {
    return ol.appendChild(tagWithTextNode);
  }

  function userNotFound() {
    toggleLoad();
    addNotification('User not found: ');
    enableButton($btnSearchUser);
    clearInput($userName);
    addFocus($userName);
  }

})(window, document);