(function() {
    'use strict';

    const skills = ['JavaScript', 'ReactJS', 'React Native'];

    hasSkill(skills);

    function hasSkill(skills) {
      if( skills.indexOf('JavaScript') !== -1) 
        return console.log(true);

        return console.log(false);
    }



})();