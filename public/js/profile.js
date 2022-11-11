

const ButtonHandler = async (event) => {
  
  if(event.target.id==='del-link') {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
     
      alert(event.target.id);
      let response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  } else if (event.target.id==='edit-link') {

      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        document.location.replace(`/update/${id}`);

      } 
      else {
        alert('Failed to retrieve the recipe.');
      }

  }
};


document
  .querySelector('#recipe-list')
  .addEventListener('click', ButtonHandler);
