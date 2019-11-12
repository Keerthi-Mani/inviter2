$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);

    //Image clicked

    $(".thumbnail").click(function () {
      var imagClicked = console.log($(this).attr('src'));
      //$('.thumbnail').remove();
      // Email code should go here
      $.get('/sendemail').then(function)
    })
  });

  $.get()
  

});


