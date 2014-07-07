var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'jdwmurph',
    password: '',
    database: 'node_express_crud_example'
  }
});

var path = require('path');
var bookshelf = require('bookshelf')(knex);
var methodOverride = require ('method-override');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('bookshelf', bookshelf);
app.use(methodOverride());

app.get('/users', function(req, res){
  var bookshelf = app.get('bookshelf');
  var User = bookshelf.Model.extend({
  tableName: 'users'
  });
  User.fetchAll({}).then(function(collection){
    res.send(collection);
  });
});

app.post('/users', function(req, res){
  var bookshelf = app.get('bookshelf');
  var User = bookshelf.Model.extend({
    tableName: 'users'
  });
  var newUser = new User({name: req.body.name})
  newUser.save().then(function(model){
    res.send(model);
  })
})

app.put('/users/:id', function(req, res){
  console.log(req.body)
  var bookshelf = app.get('bookshelf');
  var User = bookshelf.Model.extend({
    tableName: 'users'
  });
  User.where({name: req.body.name}).fetch().then(function(model){
    model.set('name', req.body.newName);
    model.save();
    res.send(model);
  });
})

app.delete('/users/:id', function(req, res){
  var bookshelf = app.get('bookshelf');
  var User = bookshelf.Model.extend({
    tableName: 'users'
  });
  User.where({name: req.body.name}).fetch().then(function(model){
    var returnModel = model
    model.destroy()
    res.send(returnModel)
  });
})


var server = app.listen(3000, function(){
  console.log('listening on port %d', server.address().port);
})
