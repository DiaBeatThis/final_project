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

(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();

// <!-- getting a week number -->
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return d.getFullYear() + "-W" + (weekNo < 10 ? '0' : '') + weekNo
}

// <!-- global variables -->
var insulin
var bloodSugar
var insulinTimestamp
var steps
var water
var bloodSugarTimestamp
var waterTimestamp
var currentUser = $('#userId').val()
var insulinWeek = $('#insulinWeek').val()
var glucoseWeek = $('#glucoseWeek').val()
var currentDateName = new Date($('#currentDate').val()).getDayName()
var screenSize
var calories
var carbs
var fat
var protein
var sugar

// <!-- functions called when page is loaded -->
screenSize()
getGlucose()
getWater()
getSteps()
getInsulin()
getNutritions()

// <!-- function is checking a screen size and changing a steps chart  size-->
function screenSize(){
    if($('#userCal').val() == 'None'){
        $(".remindersInfo").hide();
    }
    var x = screen.width
    if (x > 767){
        screenSize = '140%'
    }
    else{
        screenSize = '100%'
    }
}


// <!-- getting results for past 7 days -->
function getInsulin (){
    insulin = []
    insulinTimestamp = []
    insulinWeek = $('#insulinWeek').val()
    $.ajax('/api/insulin?ordered=time_stamp').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            d = new Date(res[i]['time_stamp'])
            time = d.toLocaleTimeString().replace(/:\d{2}\s/,' ');
            var dayName =  d.getDayName()
            week = getWeekNumber(d)
            if(res[i]['profile_id'] == currentUser && insulinWeek === week){
                insulin.push(parseFloat(res[i]['mcU_ml']))
                insulinTimestamp.push(dayName + ', ' + time)
            }
        }
        insulinCharts()
    })
}

// <!-- getting glucose for selected week -->
function getGlucose (){
    bloodSugar = []
    bloodSugarTimestamp = []
    glucoseWeek = $('#glucoseWeek').val()
    $.ajax('/api/blood_sugar?ordered=time_stamp').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            d = new Date(res[i]['time_stamp'])
            time = d.toLocaleTimeString().replace(/:\d{2}\s/,' ');
            var dayName =  d.getDayName()
            week = getWeekNumber(d)
            if(res[i]['profile_id'] == currentUser && glucoseWeek === week){
                bloodSugar.push(parseFloat(res[i]['mg_dL']))
                bloodSugarTimestamp.push(dayName + ', ' + time)
            }
        }
        glucoseCharts()
    })
}

// <!-- getting water for selected date -->
function getWater (){
    date = $('#waterDay').val()
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

// <!-- getting steps for selected date -->
function getSteps (){
    date = $('#activityDay').val()
    $.ajax('/api/physical_activity/').done(function (stuff){
        var sum = 0
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser && date === res[i]['date']){
                sum += parseInt(res[i]['distance'])
            }
        }
        steps = [sum]
        // stepsChart()
    })
}

// <!-- getting water for selected date -->
function getNutritions (){
    date = $('#foodDay').val()
    $.ajax('/api/meals/').done(function (stuff){
        calories = 0
        carbs = 0
        fat = 0
        protein = 0
        sugar = 0
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser && date === res[i]['time_eaten'].slice(0, 10)){
                var mealId = res[i]['nutritional_facts']
                $.ajax('/api/nutrition/' + mealId + '/').done(function (data){
                    calories += parseFloat(data['calories'])
                    carbs += parseFloat(data['carbs'])
                    fat += parseFloat(data['fat'])
                    protein += parseFloat(data['protein'])
                    sugar += parseFloat(data['sugar'])
                    foodChart()
                })
            }
            else{
                foodChart()
            }
        }
    })
}

// chart font options
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Helvetica Neue',
            color: '#091019'
        }
    }
});


// <!-- building insulin chart -->
function insulinCharts(){
    Highcharts.chart('containerInsulin', {
        chart: {
            type: 'column'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Insulin Dosage'
        },

        xAxis: {
            categories: insulinTimestamp
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'units'
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
            zones: [
                {color: 'rgba(36, 140, 150, .75)'}] //teal
        }]
    });
}

// <!-- building glucose chart -->
function glucoseCharts(){
    Highcharts.chart('containerGlucose', {
        chart: {
            type: 'column'
        },

        legend: {
          enabled: false
        },

        title: {
            text: 'Glucose Levels'
        },

        xAxis: {
            categories: bloodSugarTimestamp
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'mg/dL'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Glucose Level',
            data: bloodSugar,
            zones: [
              {value: 60,
                color: '#fb0000'}, //red
                {value: 70,
                  color: 'rgba(255, 163, 25, .9)'}, //orange
                {value: 140,
                color: 'rgba(36, 140, 150, .8)'}, //teal
                {color: 'rgba(251, 17, 17, .75)'}] //redtrans
        }]
    });
}


//<!-- building water chart -->
function waterCharts(){
    Highcharts.chart('containerWater', {
        chart: {
            type: 'column'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Daily Water Intake'
        },

        xAxis: {
            categories: currentDateName
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            max: 15,
            title: {
                text: 'Cups'
            },
            plotLines: [{
                    value: $('#waterGoal').val(),
                    color: '#091019',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: 'Daily Goal'
                    }}]
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y;
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
            zones: [
                {color: 'rgba(153, 220, 228, .85)'}] //blue
        }]
    });
}

// <!-- building steps chart -->
// function stepsChart(){
//     $(function () {
//         var gaugeOptions = {
//
//             chart: {
//                 type: 'solidgauge'
//             },
//
//             title: 'Total Daily Steps',
//
//             pane: {
//                 center: ['50%', '85%'],
//                 size: screenSize,
//                 startAngle: -90,
//                 endAngle: 90,
//                 background: {
//                     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
//                     innerRadius: '60%',
//                     outerRadius: '100%',
//                     shape: 'arc'
//                 }
//             },
//
//             tooltip: {
//                 enabled: false
//             },
//
//             // the value axis
//             yAxis: {
//                 stops: [
//                     [0.1, '#FB1111'], // Red
//                     [0.25, '#C53032'], // Violet
//                     [0.5, '#904F54'], // Purple
//                     [0.75, '#5A6D75'], // Blue
//                     [0.9, '#248C96'] // Teal
//                 ],
//                 lineWidth: 0,
//                 minorTickInterval: null,
//                 tickAmount: 2,
//                 title: {
//                     y: -120
//                 },
//                 labels: {
//                     y: 16
//                 }
//             },
//
//             plotOptions: {
//                 solidgauge: {
//                     dataLabels: {
//                         y: 5,
//                         borderWidth: 0,
//                         useHTML: true
//                     }
//                 }
//             }
//         };
//
//         // The steps gauge
//         var chartSteps = Highcharts.chart('stepsChart', Highcharts.merge(gaugeOptions, {
//             yAxis: {
//                 min: 0,
//                 max: $('#stepsGoal').val(),
//                 title: {
//                     text: 'Total Daily Steps'
//                 }
//             },
//
//             credits: {
//                 enabled: false
//             },
//
//             series: [{
//                 name: 'Steps',
//                 data: steps,
//                 dataLabels: {
//                     format: '<div style="text-align:center"><span style="font-size:1.5em;color:' +
//                         ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
//                            '<span style="font-size:14px;color:silver">steps</span></div>'
//                 },
//                 tooltip: {
//                     valueSuffix: 'steps'
//                 }
//             }]
//
//         }));
//
//     });
// }

function foodChart(){

    Highcharts.chart('foodChart', {
    title: {
        text: 'Combination chart'
    },
    subtitle: {
        text: 'Total calories: ' + calories,
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {y:.1f} g',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [ {
        type: 'pie',
        name: 'Total consumption',
        data: [{
            name: 'Carbs',
            y: carbs,
            color: Highcharts.getOptions().colors[0] // John's color
        }, {
            name: 'Fat',
            y: fat,
            color: Highcharts.getOptions().colors[1] // Joe's color
        }, {
            name: 'Protein',
            y: protein,
            color: Highcharts.getOptions().colors[2] // Joe's color
        },{
            name: 'Sugar',
            y: sugar,
            color: Highcharts.getOptions().colors[3] // Joe's color
        }]
    }]
});
}

// <!-- glucose modal -->
$(document).on('confirmation', '[data-remodal-id=modalGlucose]', function () {
    var glucose = $("#glucoseLevel").val()
    var time_stamp = $("#glucoseDateTime").val()
    var postdata = {'mg_dL':glucose, 'time_stamp':time_stamp, 'profile_id':currentUser}
    $.ajax({url:'/api/blood_sugar/', data:postdata, type:'POST'}).done(function(){
        location = location
        getGlucose()
    })
});

// <!-- insuin modal -->
$(document).on('confirmation', '[data-remodal-id=modalInsulin]', function () {
  var insulin = $("#insulinLevel").val()
  var time_stamp = $("#insulinDateTime").val()
  var postdata = {'mcU_ml':insulin, 'time_stamp':time_stamp, 'profile_id':currentUser}
  $.ajax({url:'/api/insulin/', data:postdata, type:'POST'}).done(function(){
      location = location
      getInsulin()
  })
});

// <!-- water modal -->
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

// <!-- steps modal -->
$(document).on('confirmation', '[data-remodal-id=stepsTaken]', function () {
    steps = $("#stepsTaken").val()
    time_stamp = $('#currentDate').val()
    var postdata = {'distance':steps, 'date':time_stamp, 'profile_id':currentUser}
    $.ajax({url:'/api/physical_activity/', data:postdata, type:'POST'}).done(function(){
        location = location
        getSteps()
    })
});

// <!-- food modal -->
$(document).on('confirmation', '[data-remodal-id=foodTaken]', function () {
    app_id='50ec9c82'
    app_key='5a74672142eeb0cb34eb140e985abbce'
    food_name = $("#foodName").val()
    food_portion = $('#foodAmount').val()
    time_eaten = $("#foodDateTime").val()
    $.ajax('https://api.edamam.com/api/nutrition-data?app_id=' + app_id + '&app_key=' + app_key + '&ingr=' + food_portion + 'g%20' + food_name).done(function (stuff){
        calories = parseFloat(stuff['calories']).toFixed(2)
        console.log(stuff)
        if (stuff['ingredients'][0]['parsed'][0]['nutrients']['CHOCDF'] === undefined){
            carbs = 0
        } else {
            carbs = parseFloat(stuff['ingredients'][0]['parsed'][0]['nutrients']['CHOCDF']['quantity']).toFixed(2)
        }
        if (stuff['ingredients'][0]['parsed'][0]['nutrients']['FAT'] === undefined){
            fat = 0
        } else {
            fat = parseFloat(stuff['ingredients'][0]['parsed'][0]['nutrients']['FAT']['quantity']).toFixed(2)
        }
        if (stuff['ingredients'][0]['parsed'][0]['nutrients']['PROCNT'] === undefined){
            protein = 0
        } else {
            protein = parseFloat(stuff['ingredients'][0]['parsed'][0]['nutrients']['PROCNT']['quantity']).toFixed(2)
        }
        if (stuff['ingredients'][0]['parsed'][0]['nutrients']['SUGAR'] === undefined){
            sugar = 0
        } else {
            sugar = parseFloat(stuff['ingredients'][0]['parsed'][0]['nutrients']['SUGAR']['quantity']).toFixed(2)
        }
        var postdata = {'calories':calories, 'carbs':carbs, 'fat':fat, 'protein':protein, 'sugar':sugar}
        console.log(postdata)
        $.ajax({url:'/api/nutrition/', data:postdata, type:'POST'}).done(function(item){
            var postdata = {'food_name':food_name, 'time_eaten':time_eaten, 'nutritional_facts':item['id'].toString(), 'food_portion': food_portion, 'profile_id':currentUser}
            console.log(postdata)
            $.ajax({url:'/api/meals/', data:postdata, type:'POST'}).done(function(){
                location = location
                getNutritions()
            })
        })
    })
});

$('#waterDateSubmit').click(getWater)
$('#activityDateSubmit').click(getSteps)
$('#glucoseWeekSubmit').click(getGlucose)
$('#insulinWeekSubmit').click(getInsulin)
$('#foodDateSubmit').click(getNutritions)
