const newFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('div[name="post-id"]').value.trim();
  const body = document.querySelector('#commentBody').value.trim();

  if (title && content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to create post');
    }
  }
};
