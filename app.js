//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() { }
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')

  //create tr element
  const row = document.createElement('tr');
  console.log(book);

  //insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#"> <i class="fa fa-close"></i></a></td>
  `;
  list.appendChild(row);
  console.log(row)
}
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


//Event Listeners 
document.getElementById('book-form').addEventListener('submit', e => {

  //get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //add book to list
  ui.addBookToList(book);

  //clear fields
  ui.clearFields();



  e.preventDefault();
});