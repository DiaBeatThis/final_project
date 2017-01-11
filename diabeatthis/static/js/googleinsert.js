// google INSERT EVENT
function prepCalendarInsert() {
	console.log("prepCalendarInsert working")
  gapi.client.load('calendar', 'v3', insertReminders);
}

function insertReminders(){
	event = {
  'summary': 'trying an API insert',
  'description': 'successfully entering an event insert!',
  'start': {
    'dateTime': '2017-01-15T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2017-01-15T09:00:00-07:00',
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
};

var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  appendPre('Event created: ' + event.htmlLink);
});
}
