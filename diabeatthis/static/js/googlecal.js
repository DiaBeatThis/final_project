// console.log("google calendar auth")
var cal_id

var CLIENT_ID = '950183132798-6cnr1mbiq4on5bll0fsuubq6krv7i6p6.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];

var signoutButton = document.getElementById('signout-button');

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
 gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }
/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/

function handleAuthClick(event) {
 gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
 return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/

function loadCalendarApi() {
  gapi.client.load('calendar', 'v3');
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
     });
     request.execute(function(resp) {
        var events = resp.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            appendPre('Date: ' + ' (' + when + ')')
          }
        } else {
          appendPre('No upcoming events found.');
        }
     });
}

function listCalendars()
{
     var request = gapi.client.calendar.calendarList.list();

     request.execute(function(resp){
             var calendars = resp.items;
             console.log(calendars);
     });
}

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
 var pre = document.getElementById('output');
 var textContent = document.createTextNode(message + '\n');
 pre.appendChild(textContent);
}
