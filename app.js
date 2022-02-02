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
//show alert
UI.prototype.showAlert = function (message, className) {
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
    div .remove();
  }, 3000);
}



//clear fields
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

  //validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  }
  else {
    //add book to list
    ui.addBookToList(book);

    //show alert
    ui.showAlert('Book Added!', 'success')

    //clear fields
    ui.clearFields();
  }




  e.preventDefault();
});

