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


// photo upload JS
$(function(){
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

function imageIsLoaded(e) {
    $('.profilephoto').attr('src', e.target.result);
};
});


var insulin = []
var bloodSugar = []
var insulinTimestamp = []
var water = []
var waterTimestamp = []
var currentUser = $('#userId').val()
var currentDate = $('#currentDate').val()
var date = $('#insulinDay').val()
var week = $('#insulinWeek').val()


// getInsulin()
//insulinByDate()
getGlucose()
getWater()
getLastWeekInsulin()
lastXDays()
console.log(currentDate)

function getLastWeekInsulin (){
    $.ajax('/api/insulin/').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser && currentDate === res[i]['time_stamp'].slice(0, 10)){
                insulin.push(parseFloat(res[i]['mcU_ml']))
                insulinTimestamp.push(res[i]['time_stamp'].slice(11, 16))
            }
        }
        insulinCharts()
    })
}


function insulinByDate (){
    date = $('#insulinDay').val()
    insulin = []
    insulinTimestamp = []
    $.ajax('/api/insulin/').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser && date === res[i]['time_stamp'].slice(0, 10)){
                insulin.push(parseFloat(res[i]['mcU_ml']))
                insulinTimestamp.push(res[i]['time_stamp'].slice(11, 16))
            }
        }
        insulinCharts()
    })
}


function getGlucose (){
    $.ajax('/api/blood_sugar/').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser){
                bloodSugar.push(parseFloat(res[i]['mg_dL']))
            }
        }
        insulinCharts()
    })
}

function getWater (){
    date = $('#insulinDay').val()
    $.ajax('/api/water/').done(function (stuff){
        var sum = 0
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser && date === res[i]['time_stamp'].slice(0, 10)){
                sum += parseFloat(res[i]['ounces'])
            }
        }
        water = [sum]
        waterCharts()
    })
}


function lastXDays(){
    var days = 7
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
    console.log(year, "-", month, "-", day)
    return (day, month, year)
}


function insulinCharts(){
    Highcharts.chart('containerInsulin', {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Insulin/blood sugar'
        },

        xAxis: {
            categories: insulinTimestamp
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Amount of insulin/blood sugar'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Insulin',
            data: insulin,
        }, {
            name: 'Blood sugar',
            data: bloodSugar,
        }]
    });
}


function waterCharts(){
    Highcharts.chart('containerWater', {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Water'
        },

        xAxis: {
            categories: 'Water'
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Ounces'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Water',
            data: water,
        },]
    });
}


$(document).on('confirmation', '[data-remodal-id=modalGlucose]', function () {
    var glucose = $("#glucoseLevel").val()
    var time_stamp = $("#glucoseDateTime").val()
    var postdata = {'mg_dL':glucose, 'time_stamp':time_stamp, 'profile_id':currentUser}
    $.ajax({url:'/api/blood_sugar/', data:postdata, type:'POST'}).done(function(){
        location = location
    })
});


$(document).on('confirmation', '[data-remodal-id=modalInsulin]', function () {
  var insulin = $("#insulinLevel").val()
  var time_stamp = $("#insulinDateTime").val()
  var postdata = {'mcU_ml':insulin, 'time_stamp':time_stamp, 'profile_id':currentUser}
  $.ajax({url:'/api/insulin/', data:postdata, type:'POST'}).done(function(){
      location = location
      insulinByDate()
  })
});


$(document).on('confirmation', '[data-remodal-id=waterIntake]', function () {
    size = $("#waterSize").val()
    cups = $("#waterIntake").val()
    var water = parseFloat(size) * parseFloat(cups)
    var time_stamp = $("#waterDateTime").val()
    var postdata = {'ounces':water, 'time_stamp':time_stamp, 'profile_id':currentUser}
    $.ajax({url:'/api/water/', data:postdata, type:'POST'}).done(function(){
        location = location
        getWater()
    })
});


$('#dateSubmit').click(insulinByDate)
// fitbit API request
// https://api.fitbit.com/1/user/5BZ85Q/activities/date/2016-08-08.json?access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Qlo4NVEiLCJhdWQiOiIyMjg3NjMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNDgzNjgwMzY5LCJpYXQiOjE0ODM2NTE1Njl9.m6ZiS8uR-4rEGrAepgjQZ6ddlhErRNj1Jkdh1VH43EE
