const postId = document.querySelector("#hiddenBlogId").value

const editFormHandler = async (event) => {
    event.preventDefault();
  
    const editPost = {
      name:document.querySelector('#edit-name').value,
      description:document.querySelector('#edit-desc').value
    }

    if (editPost) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(editPost),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to create updated post');
      }
    }
  };

  document
    .querySelector('.edit-comment-form')
    .addEventListener('submit', editFormHandler);