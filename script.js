function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  function UI() {}
  
 
  UI.prototype.addBookToList = function(book) {
      const list = document.getElementById('book-list');
    


      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      `;

      list.appendChild(row);
  };
  

  UI.prototype.showAlert = function(message, className) {

    
      const div = document.createElement('div');

      div.className = `alert ${className}`;

      
      div.appendChild(document.createTextNode(message));

      
      const container = document.querySelector('.container');

      const form = document.querySelector('#book-form');

      container.insertBefore(div, form);

      setTimeout(function() {
          document.querySelector('.alert').remove();
      }, 3000);
  };
  

  UI.prototype.clearFields = function() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
  };


    UI.prototype.deleteBook = function(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    };
  

  document.getElementById('book-form').addEventListener('submit', (e) => {

      const title = document.getElementById('title'),
              author = document.getElementById('author'),
              isbn = document.getElementById('isbn');
  
      const book = new Book(title.value, author.value, isbn.value);
      const ui = new UI();
  
    
      if (title.value === '' || author.value === '' || isbn.value === '') {
          ui.showAlert('Please fill in all fields', 'error');
      } else {
          ui.addBookToList(book);
          ui.showAlert('Book Added', 'success');
          ui.clearFields();
      }
      e.preventDefault();
  });


    document.getElementById('book-list').addEventListener('click', (e) => {
        const ui = new UI();
        ui.deleteBook(e.target);
        ui.showAlert('Book Removed', 'success');
        e.preventDefault();
    });