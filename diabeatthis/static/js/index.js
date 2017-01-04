// cookie csrf function
function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var food_name

function enterWater(){
        profile = $('#userId').val()
        ounces = $('#waterAmount').val()
        time_stamp = $('#waterTime').val()
        var postdata = {'ounces': ounces, 'profile_id': profile,
                        'time_stamp': time_stamp}
        console.log(postdata)
        $.ajax({url:'/api/water/', data:postdata, type:'POST'}).done(function(){
            location = location
        })
}


function enterMeal(){
        food_name = 'rice'
        getNutrition()
        var postdata = {'food_name': food_name, 'food_portion': 3, 'profile_id': 2}
        console.log(postdata)
        $.ajax({url:'/api/meals/', data:postdata, type:'POST'}).done(function(){
            location = location
        })
}


function getNutrition(){
    food_name = 'rice'
    console.log(food_name)
    $.ajax('https://api.edamam.com/api/nutrition-data?app_id=50ec9c82&app_key=5a74672142eeb0cb34eb140e985abbce&ingr='
        + food_name).done(function (data){
        carbs = data['totalNutrients'].CHOCDF['quantity']
        fat = data['totalNutrients'].FAT['quantity']
        protein = data['totalNutrients'].PROCNT['quantity']
        sodium = data['totalNutrients'].NA['quantity']
        calories = data['totalNutrients'].ENERC_KCAL['quantity']
        var postdata = {'calories': calories, 'carbs': carbs, 'fat': fat,
                        'protein': protein, 'sugar': 1, 'sodium': sodium}
        console.log(postdata)
        $.ajax({url:'/api/nutrition/', data:postdata, type:'POST'}).done(function(){
            location = location
        })
     })
}



$("#enterMeal").click(getNutrition)
$("#water").click(enterWater)
