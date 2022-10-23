const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#comment-name').value.trim();
    const description = document.querySelector('#comment-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);