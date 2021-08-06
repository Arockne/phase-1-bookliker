
function getBooks() {
  fetch('http://localhost:3000/books')
  .then(resp => resp.json())
  .then(renderBooks);
  //.then(books => renderBooks(books));
}

//id
  //number
//title
  //string
//subtitle
  //string
//description
  //string
//author
  //string
//img_url
  //string
//users
  //array of object
    //id
      //number
    //username
      //string

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
  
  const title = document.createElement('h1');
  title.textContent = book.title;

  const subtitle = document.createElement('h2');
  subtitle.textContent = book.subtitle;

  const author = document.createElement('h3');
  author.textContent = book.author;

  const description = document.createElement('p');
  description.textContent = book.description;

  const usersLiked = document.createElement('ul');
  usersLiked.id = book.id;
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
  const likedList = document.getElementById(`${book.id}`)
  const userLiked = document.createElement('li');
  userLiked.textContent = user1.username;
  likedList.appendChild(userLiked);

  const updatedUserList = {
    users: [...book.users, user1]
  }

  fetch(`http://localhost:3000/books/${user1.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUserList)
  })
  .then(resp => console.log(resp))
}



document.addEventListener("DOMContentLoaded", () => {
  getBooks();
});