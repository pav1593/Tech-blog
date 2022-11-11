//--------------create comment----------------

const submitComment = document.querySelector('.comment-submit');

const submitCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#recipe-comment').value.trim();
  const rating = document.querySelector('#rating-comment').value.trim();
  const recipe_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log('kjdfaj;SVGAnimatedLength;kfjals;dfjl;aksdjflkdsjfl;kajsdk');

  if (comment && rating && recipe_id) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, rating, recipe_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //direct back to recipe if response ok.
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create a comment');
    }
  }
};

submitComment.addEventListener('submit', submitCommentHandler);

// -----------------delete comment--------------------
// const deleteComment = document.querySelector('#comment-delete');

// const deleteCommentHandler = async (event) => {
//     event.preventDefault();

//     if(event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/comments/${id}`, {
//             method:'DELETE',
//         });
//         //direct to the recipe page after deleting the comment;
//         if(response.ok) {
//             document.location.reload();
//         } else {
//             alert('Failed to delete comment');
//         }
//     }
// };

deleteComment.addEventListener('click', deleteCommentHandler);
