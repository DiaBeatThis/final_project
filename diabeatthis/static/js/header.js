// mobile nav click functionality
$(document).ready(function(event){
  $(".menuimg").click(function(){
    $(".right li").slideToggle("slow");
    console.log ("nav toggle working");
  });
});
