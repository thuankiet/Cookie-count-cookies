// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const bookRoute = require('./routes/book.route.js');
const userRoute = require('./routes/user.route.js');
const transactionRoute = require('./routes/transaction.route.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', (request, response) => {
  if(request.cookies.id) {
    var count = parseInt(request.cookies.id);
  } else {
    var count = 0;
  }
  count += 1;
  
  response.cookie('id', count);
  response.render('./index.pug');
  console.log(count);
});

app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
