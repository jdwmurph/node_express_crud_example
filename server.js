var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'jdwmurph',
    password: '',
    database: 'node_express_crud_example'
  }
});
var path        = require('path');
var bookshelf = require('bookshelf')(knex);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('bookshelf', bookshelf);

app.get('/users', function(req, res){
  var bookshelf = app.get('bookshelf');
  var User = bookshelf.Model.extend({
  tableName: 'users'
  });
  User.fetchAll({}).then(function(collection){
    res.send(collection);
  });
});

app.get('/authors/:id', function(req, res){
  var bookshelf = app.get('bookshelf');
  var User = bookshelf.Model.extend({
  tableName: 'users'
  });
  User.where({id: req.params.id}).fetch().then(function(collection){
    res.send(collection);
  });
});


app.post('/users', function(req, res){

  console.log(req.body);
  var bookshelf = app.get('bookshelf');

  var Author = bookshelf.Model.extend({
    tableName: 'authors'
  });

  var newAuthor = new Author({name: req.body.authorName})

  newAuthor.save().then(function(model){
    res.send(model);
  })
})

var server = app.listen(3000, function(){
  console.log('listening on port %d', server.address().port);
})


// var firstAuthor = Author.where({id: 15}).fetch().then(
//   function(model){
//     //logic goes here
//     console.log(model)
//   });
