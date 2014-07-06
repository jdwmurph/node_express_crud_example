
function initialize(){
  $('.new-user-form').on('submit', function(e){
    e.preventDefault();
    var newUserName = $('.user-name').val()
    $('.user-name').val('')
    $.ajax({
      url: '/users',
      method: 'post',
      dataType: 'json',
      data: {name: newUserName},
      success: function(){

      }
    })
  })
}

$(function(){
  initialize()
})
