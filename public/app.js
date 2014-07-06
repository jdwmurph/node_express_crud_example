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

function deleteUser(){
    var deleteUserName = $('.delete-user-name').val()
    $('.delete-user-name').val('')
    console.log('delete ' + deleteUserName)
    $.ajax({
      url: '/users',
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
}

$(function(){
  initialize()
})
