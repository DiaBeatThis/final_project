// google INSERT EVENT
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3');
}

function insertCalendar(){
  var request = gapi.client.calendar.insert({
     'name': 'diabeatthis',
     'summary': 'diabeatthis',
     'timeZone': 'American/Cancun',
  });
  request.execute(function() {
     appendPre('Event created: ' + event.htmlLink);
  });
}

var b_summary
var b_description
var b_time_stamp
var l_summary
var l_description
var l_time_stamp
var d_summary
var d_description
var d_time_stamp

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
	  'calendarId': 'primary',
	  'resource': event
	});
	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	});
}

function setLunchReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': 'primary',
	  'resource': event
	});
	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	});
}

function setDinnerReminder(){
	var request = gapi.client.calendar.events.insert({
	  'calendarId': 'primary',
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
	bInsertReminders()
	lInsertReminders()
	dInsertReminders()
});
