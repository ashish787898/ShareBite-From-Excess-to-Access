function addPost() {
  const name = document.getElementById('foodName').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!name || !quantity || !contact) {
    alert("Please fill in all required fields.");
    return;
  }

  const post = document.createElement('div');
  post.classList.add('post-card');

  post.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Quantity:</strong> ${quantity}</p>
    ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
    <div class="contact-box">
      <p><strong>Contact:</strong> ${contact}</p>
    </div>
  `;

  document.getElementById('postsContainer').prepend(post);

  // Clear form
  document.getElementById('foodName').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('contact').value = '';
  document.getElementById('notes').value = '';
}
if (response.ok) {
  document.getElementById('responseMessage').innerText = data.message || 'Food posted successfully!';
  document.getElementById('foodForm').reset();

  setTimeout(() => {
    closeModal('postModal');
    document.getElementById('responseMessage').innerText = '';
  }, 2000);
}
