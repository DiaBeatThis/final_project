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


var b_summary
var b_description
var b_time_stamp
var l_summary
var l_description
var l_time_stamp
var d_summary
var d_description
var d_time_stamp
var currentUser = $('#userId').val()
var cal_id = $('#userCal').val()

Date.prototype.addHours= function(h){
   this.setHours(this.getHours()+h);
   return this;
}

// google INSERT EVENT
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3');
}

//makes new calendar
function insertCalendar(){
    if(cal_id == 'None'){
    	 var request = gapi.client.calendar.calendars.insert({
       	     'summary': 'diabeatthis',
		 });
             request.execute(function(resp){
				 console.log(resp)
    		 cal_id = resp.id
    		    saveId()
                bInsertReminders()
        	 	lInsertReminders()
        	 	dInsertReminders()
                })
        }
        else{
            var request = gapi.client.calendar.calendars.get({
          	    'calendarId': cal_id});
                request.execute(function(resp){
                bInsertReminders()
           	 	lInsertReminders()
           	 	dInsertReminders()
        })}

 }


function saveId(){
	 $.ajax({
		 url:'/api/profile/' + currentUser + '/',
		 data:{'calendar_id':cal_id.slice(0, 26)},
		 type:'PATCH'}).done(function(){
		 location = location
	 })
 }


function bInsertReminders(){
	event = {
  'summary': b_summary,
  'description': b_description,
  'start': {
    'dateTime': b_time_stamp,
	'timeZone': 'America/New_York'
  },
  'end': {
    'dateTime': b_time_stamp,
	'timeZone': 'America/New_York'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};setBreakfastReminder()
}

function lInsertReminders(){
	event = {
  'summary': l_summary,
  'description': l_description,
  'start': {
    'dateTime': l_time_stamp,
    'timeZone': 'America/New_York'
  },
  'end': {
    'dateTime': l_time_stamp,
    'timeZone': 'America/New_York'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};setLunchReminder()
}

function dInsertReminders(){
	event = {
  'summary': d_summary,
  'description': d_description,
  'start': {
    'dateTime': d_time_stamp,
    'timeZone': 'America/New_York'
  },
  'end': {
    'dateTime': d_time_stamp,
    'timeZone': 'America/New_York'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};setDinnerReminder()
}

function setBreakfastReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	});
}

function setLunchReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	});
}

function setDinnerReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	});
}

$(document).on('opening', '[data-remodal-id=modalReminders]', function () {
  console.log('Modal is opening');
});

$(document).on('confirmation', '[data-remodal-id=modalReminders]', function () {
    b_summary = $("#breakfastSummary").val()
    b_description = $("#breakfastDescription").val()
	b_time_stamp = new Date($("#breakfastReminder").val()).addHours(5).toISOString()
	l_summary = $("#lunchSummary").val()
    l_description = $("#lunchDesc  ription").val()
	l_time_stamp = new Date($("#lunchReminder").val()).addHours(5).toISOString()
	d_summary = $("#dinnerSummary").val()
    d_description = $("#dinnerDescription").val()
	d_time_stamp = new Date($("#dinnerReminder").val()).addHours(5).toISOString()
	loadCalendarApi()
	insertCalendar()
});
