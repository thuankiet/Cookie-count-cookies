const shortId = require('shortid');

const db = require('../db.js');

module.exports.index = (request, response) => {
  response.render('./books/book.pug', {
    books: db.get('books').value()
  })
};

module.exports.create = (request, response) => {
  response.render('./books/create.book.pug');
}

module.exports.postCreate = (request, response) => {
  request.body.id = shortId.generate();
  db.get('books').push(request.body).write();
  response.redirect('/books');
};

module.exports.edit = (request, response) => {
  var id = request.params.id;
  db.get('books').value().filter(book => {
    if(book.id === id) {
      response.render('./books/edit.book.pug', {
        book: book
      })
    }
  })
};

module.exports.postEdit = (request, response) => {
  var id = request.params.id;
  db.get('books')
    .find({ id: id })
    .assign(request.body)
    .write()
  response.redirect('/books');
};

module.exports.delete = (request, response) => {
  var id = request.params.id;
  db.get('books')
    .remove({ id: id })
    .write();
  response.redirect('/books');
};