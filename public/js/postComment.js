const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    // const description = document.querySelector('#comment-desc').value.trim();

    const comment = {
      description:document.querySelector('#comment-desc').value,
      post_id:document.querySelector('#hiddenBlogId').value
    }
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentFormHandler);