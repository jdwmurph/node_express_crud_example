function displayUsers(){
  $.ajax({
  url: '/users',
  method: 'get',
  dataType: 'json',
  success: function(users){
    $('.users').html('')
    _.each(users, function(user){
      $('.users').append($('<li>').html(user.name))
    })
  }
  })
}

function createNewUser(){
    var newUserName = $('.new-user-name').val()
    $('.new-user-name').val('')
    console.log(newUserName)
    $.ajax({
      url: '/users',
      method: 'post',
      dataType: 'json',
      data: {name: newUserName},
      success: function(data){
        displayUsers()
      }
    })
}

function editUser(){
    var userName = $('.edit-user-name').val()
    var newUserName = $('.new-edit-user-name').val()
    $('.edit-user-name').val('')
    $('.new-edit-user-name').val('')
    $.ajax({
      url: '/users/:id',
      method: 'put',
      dataType: 'json',
      data: {name: userName, newName: newUserName},
      success: function(){
        displayUsers()
      }
    })
}

function deleteUser(){
    var deleteUserName = $('.delete-user-name').val()
    $('.delete-user-name').val('')
    console.log('delete ' + deleteUserName)
    $.ajax({
      url: '/users/:id',
      method: 'delete',
      dataType: 'json',
      data: {name: deleteUserName},
      success: function(){
        displayUsers()
      }
    })
}

function initialize(){
  displayUsers()
  $('.new-user-form').on('submit', function(e){
    e.preventDefault();
    createNewUser();
  })

  $('.delete-user-form').on('submit', function(e){
    e.preventDefault();
    deleteUser();
  })

  $('.edit-user-form').on('submit', function(e){
    e.preventDefault();
    editUser();
  })
}

$(function(){
  initialize()
})
