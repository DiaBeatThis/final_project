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



// google INSERT EVENT
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3');
}

var currentUser = $('#userId').val()
console.log(currentUser)

var cal_id
var b_summary
var b_description
var b_time_stamp
var l_summary
var l_description
var l_time_stamp
var d_summary
var d_description
var d_time_stamp

//makes new calendar
function insertCalendar(){
	 var request = gapi.client.calendar.calendars.insert({
   	'summary': 'diabeatthis'});
     request.execute(function(resp){
		 cal_id = resp.id
		 console.log(resp)
		 console.log(cal_id)
		saveId()
		bInsertReminders()
	 	lInsertReminders()
	 	dInsertReminders()
	 })
 }

 function saveId(){
	 $.ajax({
		 url:'/api/profile/' + currentUser + '/',
		 data:{'calendar_id':cal_id},
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
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': b_time_stamp,
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
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
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': l_time_stamp,
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
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
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': d_time_stamp,
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
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

function setBreakfastReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	});
}

function setLunchReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	});
}

function setDinnerReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	});
}


$(document).on('confirmation', '[data-remodal-id=modalReminders]', function () {
    b_summary = $("#breakfastSummary").val()
    b_description = $("#breakfastDescription").val()
	b_time_stamp = new Date($("#breakfastReminder").val()).toISOString()
	l_summary = $("#lunchSummary").val()
    l_description = $("#lunchDesc  ription").val()
	l_time_stamp = new Date($("#lunchReminder").val()).toISOString()
	d_summary = $("#dinnerSummary").val()
    d_description = $("#dinnerDescription").val()
	d_time_stamp = new Date($("#dinnerReminder").val()).toISOString()
	loadCalendarApi()
	insertCalendar()
});
