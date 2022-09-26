const id = document.querySelector('input[name="post-id"]').value;


const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('textarea[name="post-title"]').value.trim();
  const content = document.querySelector('textarea[name="post-content"]').value.trim();
 
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json'},
  });

  if (response.ok) {
    document.location.replace(`/dashboard`)
  }
}

const delButtonHandler = async () => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
};

document
  .querySelector('#edit-post')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);
