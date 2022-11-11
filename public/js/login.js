//----------get the login email & password----------------------------------------
const logInForm = document.querySelector('.login-form');

const logInHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (email && password) {
    const reponse = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    //if response ok, redirect the user to the homepage.
    if (reponse.ok) {
      document.location.replace('/');
    } else {
      alert(reponse.statusText);
    }
  }
};

logInForm.addEventListener('submit', logInHandler);

//----------------------get the signup username & email & password-------------------------
const singUpForm = document.querySelector('.signup-form');

const signUpHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#signup-name').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  console.log(
    'dkjfkaj;sdklfjj;aklsdfjkdjflkjsdf;lkjsda;lkfjl;askdjfl;kjsd;fka;dsfkj'
  );

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    //directing to the home page first
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

singUpForm.addEventListener('submit', signUpHandler);
