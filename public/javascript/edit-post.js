async function editFormHandler(event) {
  event.preventDefault();

  // get id of post
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // get value of edited title in input box
  const title = document.querySelector('input[name="post-title"]').value.trim();
  // get value of edited content in text area
  const post_text = document.querySelector('textarea[name="post-text"]').value.trim();

  console.log(post_text);

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);