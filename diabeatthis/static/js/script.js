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


// <!-- global variables -->
var insulin = []
var bloodSugar = []
var insulinTimestamp = []
var steps = []
var water = []
var bloodSugarTimestamp = []
var waterTimestamp = []
var currentUser = $('#userId').val()
var currentDate = $('#currentDate').val()
var date = $('#insulinDay').val()
var week = $('#insulinWeek').val()

// <!-- functions called when page is loaded -->
// getInsulin()
//insulinByDate()
getGlucose()
getWater()
getSteps()
getLastWeekInsulin()
lastXDays()

// <!-- updating charts for date -->
function chartsForDate (){
    insulinByDate()
    getGlucose()
    getWater()
    getSteps()
}

// <!-- getting results for past 7 days -->
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

// <!-- getting insulin for selected date -->
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

// <!-- getting glucose for selected date -->
function getGlucose (){
    date = $('#insulinDay').val()
    bloodSugar = []
    bloodSugarTimestamp = []
    $.ajax('/api/blood_sugar/').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser){
                bloodSugar.push(parseFloat(res[i]['mg_dL']))
                bloodSugarTimestamp.push(res[i]['time_stamp'].slice(11, 16))
            }
        }
        glucoseCharts()
    })
}

// <!-- getting water for selected date -->
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

// <!-- getting steps for selected date -->
function getSteps (){
    date = $('#insulinDay').val()
    $.ajax('/api/physical_activity/').done(function (stuff){
        var sum = 0
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser && date === res[i]['date']){
                sum += parseInt(res[i]['distance'])
            }
        }
        steps = [sum]
        stepsChart()
    })
}


function lastXDays(){
    var days = 7
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
    return (day, month, year)
}

// <!-- building insulin chart -->
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

// <!-- building insulin chart -->
function glucoseCharts(){
    Highcharts.chart('containerGlucose', {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Blood sugar'
        },

        xAxis: {
            categories: bloodSugarTimestamp
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Amount of blood sugar'
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
            name: 'Blood sugar',
            data: bloodSugar,
        }]
    });
}


// <!-- building water chart -->
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
            },
            plotLines: [{
                    value: $('#waterGoal').val(),
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: 'Goal'
                    }}]
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


// <!-- building steps chart -->
function stepsChart(){
    $(function () {
        var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

        // The speed gauge
        var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: $('#stepsGoal').val(),
                title: {
                    text: 'Steps'
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Speed',
                data: steps,
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                           '<span style="font-size:12px;color:silver">steps</span></div>'
                },
                tooltip: {
                    valueSuffix: ' steps'
                }
            }]

        }));

    });
}

// <!-- glucose modal -->
$(document).on('confirmation', '[data-remodal-id=modalGlucose]', function () {
    var glucose = $("#glucoseLevel").val()
    var time_stamp = $("#glucoseDateTime").val()
    var postdata = {'mg_dL':glucose, 'time_stamp':time_stamp, 'profile_id':currentUser}
    $.ajax({url:'/api/blood_sugar/', data:postdata, type:'POST'}).done(function(){
        location = location
    })
});

// <!-- insuin modal -->
$(document).on('confirmation', '[data-remodal-id=modalInsulin]', function () {
  var insulin = $("#insulinLevel").val()
  var time_stamp = $("#insulinDateTime").val()
  var postdata = {'mcU_ml':insulin, 'time_stamp':time_stamp, 'profile_id':currentUser}
  $.ajax({url:'/api/insulin/', data:postdata, type:'POST'}).done(function(){
      location = location
      insulinByDate()
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
    time_stamp = currentDate
    var postdata = {'distance':steps, 'date':time_stamp, 'profile_id':currentUser}
    $.ajax({url:'/api/physical_activity/', data:postdata, type:'POST'}).done(function(){
        location = location
        getSteps()
    })
});


$('#dateSubmit').click(chartsForDate)
// fitbit API request
// https://api.fitbit.com/1/user/5BZ85Q/activities/date/2016-08-08.json?access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Qlo4NVEiLCJhdWQiOiIyMjg3NjMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNDgzNjgwMzY5LCJpYXQiOjE0ODM2NTE1Njl9.m6ZiS8uR-4rEGrAepgjQZ6ddlhErRNj1Jkdh1VH43EE
