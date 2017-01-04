// $(document).ready(function(event){
//   // jQuery code
// });
var insulin = []
var bloodSugar = []
var insulinTimestamp = []
var currentUser = $('#userId').val()


getInsulin()
setTimeout(charts, 1000)

function getInsulin (){
    $.ajax('/api/insulin/').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser){
                insulin.push(parseFloat(res[i]['mcU_ml']))
                insulinTimestamp.push(res[i]['time_stamp'].slice(11, 16))
            }
        }
    })
    $.ajax('/api/blood_sugar/').done(function (stuff){
        res = stuff.results
        for (var i = 0; i < res.length; i++){
            if(res[i]['profile_id'] == currentUser){
                bloodSugar.push(parseFloat(res[i]['mg_dL']))
            }
        }
    })
}


function charts(){
    console.log(insulin),
    console.log(bloodSugar),
    Highcharts.chart('container', {
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
