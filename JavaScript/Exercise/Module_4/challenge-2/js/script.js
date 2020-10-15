(function(win, doc) {
  'use strict';

  let fragment = doc.createDocumentFragment();
  axios.defaults.baseURL = 'https://api.github.com/users/';
  const $userName = doc.querySelector('[data-js="userName"]');
  const $btnSearchUser = doc.querySelector('[data-js="search-user"]');
  const $load = doc.querySelector('[data-js="load"]');
  let $notification = doc.querySelector('[data-js="notification"]');
  let $repos = doc.querySelector('[data-js="repos"]');


  $btnSearchUser.addEventListener('click', startAplication, false);
  $userName.addEventListener('keyup', ({key}) => {
    if (key === 'Enter') startAplication();
  });
    
  function startAplication() {
    toggleLoad();
    removeListOfRepos();
    disableButton($btnSearchUser, 'disabled');
    removeNotification();
    setTimeout(() => {
    searchUser($userName.value);
    }, 2000);
  }

  function toggleLoad() {
    $load.classList.toggle('load-off');
  }

  function removeListOfRepos() {
    const $div = doc.querySelector('[data-js="repos"]');
    const $ol = doc.querySelector('[data-js="list-repos"]');
    if($ol)
      $div.removeChild($ol);
  }

  function disableButton(element, status) {
    createAttribute(element, status, '');
  }

  function createAttribute(element, status, value) {
    element.setAttribute(status, value);
  }

  // function removeNotification() {
  //   if($notification.classList.contains('showNotification'))
  //    return $notification.classList.remove('showNotification');
  // }

  function removeNotification() {
    $notification.removeChild($notification.firstElementChild);
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
      addNotification('not has repos.');
      enableButton($btnSearchUser);
      clearInput($userName);
      addFocus($userName);
      return;
    }
    return createRepos(response);
  }
  
  function addNotification(textNode) {
    const tagFull = createTagWithTextNode('p', 'User "' + $userName.value + '" ' + textNode);
    addFragmentInApp(tagFull, $notification);
    addClassInNotification();
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

  function addClassInNotification() {
    if(!$notification.classList.contains('showNotification'))
       $notification.classList.add('showNotification');
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
    showNotificationWithUser();
    let olOfRepos = createTag('ol');
    createAttribute(olOfRepos, 'data-js', 'list-repos');
    addRepoInLiAndOl(response, olOfRepos);
    addFragmentInApp(olOfRepos, $repos);
    enableButton($btnSearchUser);
    clearInput($userName);
    addFocus($userName);
  }

  function showNotificationWithUser() {
      $notification.classList.add('showNotification');
      $notification.removeChild($notification.firstElementChild);
      addNotification('List of repositories: ');
  }

  // function addNotification(text) {
  //   $notification.removeChild($notification.firstElementChild);
  //   const text = createTagWithTextNode('p', 'User "' + $userName.value + '" ' + text);
  //   addFragmentInApp(text, $notification);
  //   addClassInNotification();
  // }

  // function addElementChild(element, textNode) {
  //   const newNotification = createTagWithTextNode('p', textNode + $userName.value);
  //   addFragmentInApp(newNotification, $notification);
  // }

  function userNotFound() {
    toggleLoad();
    addNotification('not found.');
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

})(window, document);