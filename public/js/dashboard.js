

const ButtonHandler = async (event) => {
  
  if(event.target.id==='del-link') {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      let response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  }
};


document
  .querySelector('#posts-list')
  .addEventListener('click', ButtonHandler);
