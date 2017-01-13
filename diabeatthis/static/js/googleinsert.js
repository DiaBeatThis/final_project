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

// google INSERT EVENT
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3');
}

//makes new calendar
function insertCalendar(){
    if(cal_id == 'None'){
    	 var request = gapi.client.calendar.calendars.insert({
       	     'summary': 'diabeatthis'});
             request.execute(function(resp){
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
};setDinnerReminder()
}

function setBreakfastReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {

	  console.log("breakfast reminder");
	});
}

function setLunchReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	  console.log("lunch reminder");
	});
}

function setDinnerReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': cal_id,
	  'resource': event
	});
	request.execute(function(event) {
	  console.log("dinner reminder");
	});
}

$(document).on('opening', '[data-remodal-id=modalReminders]', function () {
  console.log('Modal is opening');
  handleAuthClick(event)
});

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
