// Simulated database data
const posts = [
  {
    foodName: "Rice",
    quantity: "1 kg",
    contact: "9454236326",
    notes: "It is freshly cooked.",
    createdAt: "2025-05-23T09:08:37.194Z"
  },
  {
    foodName: "Bread",
    quantity: "5 loaves",
    contact: "9123456789",
    notes: "Whole grain and unsliced.",
    createdAt: "2025-05-22T15:30:00.000Z"
  }
];

function renderPosts(posts) {
  const container = document.getElementById("postContainer");
  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${post.foodName}</h2>
      <p><strong>Quantity:</strong> ${post.quantity}</p>
      <p><strong>Contact:</strong> ${post.contact}</p>
      <p><strong>Notes:</strong> ${post.notes}</p>
      <p class="date">${new Date(post.createdAt).toLocaleString()}</p>
      <div class="card-buttons">
        <a class="btn whatsapp" href="https://wa.me/${post.contact}" target="_blank">💬 WhatsApp</a>
        <a class="btn call" href="tel:${post.contact}">📞 Call</a>
      </div>
    `;
    container.appendChild(card);
  });
}

renderPosts(posts);
