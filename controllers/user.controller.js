const shortId = require('shortid');

const db = require('../db.js');

module.exports.index = (request, response, next) => {
  response.render('./users/list.user.pug', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
  next();
};

module.exports.create = (request, response) => {
  response.render('./users/create.user.pug');
};

module.exports.postCreate = (request, response) => {
  var id = shortId.generate();
  db.get('users')
  .push({ id: id, userName: request.body.userName })
  .write();
  response.redirect('/users');
};

module.exports.edit = (request, response) => {
  var userId = request.params.userId;
  db.get('users')
    .value()
    .filter(user => {
      if (user.id === userId) {
        response.render('./users/edit.user.pug', {
          user: user
        });
      }
    });
};

module.exports.postEdit = (request, response) => {
  var id = request.params.userId;
  db.get('users')
    .find({ id: id })
    .assign(request.body)
    .write();
  response.redirect('/users');
};

module.exports.delete = (request, response) => {
  var userId = request.params.userId;
  db.get('users')
    .remove({ id: userId })
    .write();
  response.redirect('/users');
};
