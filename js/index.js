
function getBooks() {
  fetch('http://localhost:3000/books')
  .then(resp => resp.json())
  .then(renderBooks);
}

function renderBooks(books) {
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = book.title;
    li.addEventListener('click', () => handleBookInfo(book))
    
    document.querySelector('#list').appendChild(li);
  })
}

function handleBookInfo(book) {
  const showPanel = document.querySelector('#show-panel');
  Array.from(showPanel.children).forEach(child => child.remove())

  const img = document.createElement('img');
  img.setAttribute('src', book.img_url);
  
  const title = document.createElement('h3');
  title.textContent = book.title;

  const subtitle = document.createElement('h3');
  subtitle.textContent = book.subtitle;

  const author = document.createElement('h3');
  author.textContent = book.author;

  const description = document.createElement('p');
  description.textContent = book.description;

  const usersLiked = document.createElement('ul');
  book.users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.username;
    usersLiked.appendChild(li);
  })

  const likeBtn = document.createElement('button');
  likeBtn.textContent = 'Like';
  likeBtn.addEventListener('click', e => handleUserLike(e, book));
  
  showPanel.append(img, title, subtitle, author, description, usersLiked, likeBtn);
}

function handleUserLike(e, book) {
  const user1 = {"id":1, "username":"pouros"};
  const likedList = document.querySelector('#show-panel').querySelector('ul');
  const userLiked = document.createElement('li');
  userLiked.textContent = user1.username;
  likedList.appendChild(userLiked);

  const updatedUserList = {
    users: [...book.users, user1]
  }

  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUserList)
  })
}



document.addEventListener("DOMContentLoaded", () => {
  getBooks();
});