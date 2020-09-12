(function() {
    'use strict';

    const users = [
      {
        name: 'Ewerton', 
        skills: ['JavaScript', 'ReactJS', 'Redux']
      },
      {
        name: 'Filipe',
        skills: ['VueJS', 'Ruby on Rails', 'Elixir']
      }
    ];

    function readObject() {
      for (let value of users) {
        console.log(value.name + ' has the skills: ' + value.skills.join(', '));
      }
    }

    readObject();
})();