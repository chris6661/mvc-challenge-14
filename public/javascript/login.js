//signup button clicked
async function signupFormHandler(event) {
  event.preventDefault();

  // grab user input values
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // check if all fields have values
  if (username && email && password) {
    // POST the signup form info to server
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log("Response ok: ", response);
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please enter values for all fields.");
  }
};

// when login form button is clicked
async function loginFormHandler(event) {
  event.preventDefault();

  // grab values from form inputs
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // check if all fields have values
  if (email && password) {
    // POST the signup form info to server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if login successful redirect to user dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response.statusText);
      alert("Wrong Email or Password!");
    }
  } else {
    alert("Please enter your email and password.");
  }
};

// event listener for Signup form button
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// event listener for Login form button
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);