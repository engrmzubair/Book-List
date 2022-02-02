class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list')

    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#"> <i class="fa fa-close"></i></a></td>
    `;
    list.appendChild(row);

  }
  showAlert(message, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text 
    div.appendChild(document.createTextNode(message));
    //get parent
    const col = document.querySelector('#col');
    const form = document.querySelector('#book-form');
    col.insertBefore(div, form);
    //TimeOut After 3 second
    setTimeout(function () {
      div.remove();
    }, 3000);

  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }
  deleteBook(target) {
    if (target.className === 'fa fa-close' && confirm('Are You Sure?')) {
      //instantiate UI
      const ui = new UI();
      target.parentElement.parentElement.parentElement.remove();
      //show alert
      ui.showAlert('Book Removed!', 'error');
    }

  }
}

// local storage class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null)
      books = [];
    else
      books = JSON.parse(localStorage.getItem('books'));
    return books;

  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI()
      ui.addBookToList(book);
    });
  }
  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  }
  static removeBooks(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn)
        books.splice(index, 1);
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks())


//Event Listener for form submition
document.getElementById('book-form').addEventListener('submit', e => {

  //get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);
  //instantiate UI
  const ui = new UI();

  //validate
  if (isbn === '' || title === '' || author === '') {
    ui.showAlert('Please fill in all fields', 'error');
  }
  else {
    //add book to list
    ui.addBookToList(book);

    //add to local storage
    Store.addBooks(book);

    //show alert
    ui.showAlert('Book Added!', 'success')

    //clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

//Event Listener for delete book
document.querySelector('#book-list').addEventListener('click', e => {

  //instantiate UI
  const ui = new UI();

  //delete book from list
  ui.deleteBook(e.target);

  //isbn number
  let isbn = e.target.parentElement.parentElement.previousElementSibling.textContent;

  //remove book from storage
  Store.removeBooks(isbn)

  e.preventDefault();
}
);






