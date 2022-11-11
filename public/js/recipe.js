//--------------------fetch to create new recipe-------------
const createRecipe = document.querySelector('#recipe-create');

const createRecipeHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#recipeName').value.trim();
  const description = document.querySelector('#recipeDescription').value.trim();
  const steps = document.querySelector('#recipeSteps').value.trim();

  if (name && description && steps) {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({ name, description, steps }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to ceate recipe');
    }
  }
};

createRecipe.addEventListener('submit', createRecipeHandler);

//------------------fetch to update recipe-----------------------
const updateRecipe = document.querySelector('#recipe-update');

const updateRecipeHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#recipeName').value.trim();
  const description = document.querySelector('#recipeDescription').value.trim();
  const steps = document.querySelector('#recipeSteps').value.trim();
  const id = window.location.toString().split('/')[
    window.location.toString.split('/').length - 1
  ];

  const response = await fetch(`/api/recipes/${id}`, {
    mother: 'PUT',
    body: JSON.stringify({ name, description, steps }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

updateRecipe.addEventListener('submit', updateRecipeHandler);

//----------------------fetch to delete recipe------------------------
const deleteRecipe = document.querySelector('#recipe-delete');

const deleteRecipeHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/recipes/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to delete comment');
  }
};

deleteRecipe.addEventListener('click', deleteRecipeHandler);
