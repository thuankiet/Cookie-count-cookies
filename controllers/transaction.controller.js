const shortId = require('shortid');

const db = require('../db.js');

module.exports.index = (request, response) => {
  response.render('./transactions/transactions.pug', {
    transactions: db.get('transactions').value()
  })
};

module.exports.create = (request, response) => {
  response.render('./transactions/create.transactions.pug', {
    users: db.get('users').value(),
    books: db.get('books').value()
  })
};

module.exports.postCreate = (request, response) => {
  var transactionsId = shortId.generate();
  var userName = request.body.userName;
  var bookName = request.body.bookName;
  var status = request.body.status;
  var userId = db.get('users').value().find(user => {
    if(user.userName === userName) {
      return user.id;
    }
  });

  var bookId = db.get('books').value().find(book => {
    if(book.title === bookName) {
      return book.id;
    }
  });
  
  db.get('transactions')
    .push({id: transactionsId, userId: userId.id, bookId: bookId.id, status: status})
    .write();
  response.redirect('/transactions');
};

module.exports.complete = (request, response) => {
  var id = request.params.transactionId;
  db.get('transactions').value().filter(transaction => {
    if(transaction.id === id) {
      response.render('./transactions/complete.transaction.pug', {
        transaction: transaction
      })
    }
  })
  response.render('./transactions/failed.transaction.pug');
};

module.exports.postComplete = (request, response) => {
  var id = request.params.transactionId;
  db.get('transactions').find({id: id}).assign(request.body).write();
  response.redirect('/transactions');
};