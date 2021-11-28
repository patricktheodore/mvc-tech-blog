const editFormHandler = async (event) => {

    event.preventDefault();
  
    const id = event.target.getAttribute('data-id');
    const content = document.querySelector('#post-desc').value.trim();

    if (content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

   

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('#editBtn')
  .addEventListener('click', editFormHandler);