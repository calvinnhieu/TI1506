var homeModule = (function() {
  'use strict';

  window.onload = function() {
    init();
  };

  function init() {
    var signupBtn = document.getElementsByClassName('signup')[0];
    signupBtn.onclick = signup;
  }

  function signup() {
    var email = document.getElementsByClassName('email-field')[0].value;
    var pw = document.getElementsByClassName('pw-field')[0].value;

    if (email !== '' && pw !== '') {
      console.log('signed up!');
      // TODO: send auth to server, redirect on callback
      window.location = 'todo.html';
    } else {
      console.error('You must fill in both Email and Password fields.');
    }
  }
})();
