const logoutBtn = document.querySelector('#logout');

const logoutHandler = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  //direct to homepage;
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

logoutBtn.addEventListener('click', logoutHandler);
