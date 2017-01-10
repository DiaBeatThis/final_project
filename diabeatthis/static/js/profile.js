$(document).ready(function(event){
  $(".buttonLeft").click(function(){
    $(".profileForm").show();
    $(".profileData").hide();
  });
});

$(document).ready(function(event){
  $(".buttonRight").click(function(){
    $(".profileForm").hide();
  });
});
