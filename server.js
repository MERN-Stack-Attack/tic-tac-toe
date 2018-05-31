const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up database
var mongoose = require('mongoose');
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds044229.mlab.com:44229/tic-tac-toe`,
  { promiseLibrary: global.Promise }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongoDB'); // we're connected!
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
