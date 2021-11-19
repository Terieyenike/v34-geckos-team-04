let gapi = window.gapi;
const API_KEY = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
];

export const initClient = (callback) => {
  gapi.load('client:auth2', () => {
    try {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          () => {
            if (typeof callback === 'function') {
              callback(true);
            }
          },
          (error) => {
            console.error(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  });
};

export const checkSignInStatus = async () => {
  try {
    let status = await gapi.auth2.getAuthInstance().isSignedIn.get();
    return status;
  } catch (error) {
    console.error(error);
  }
};

export const signInToGoogle = async () => {
  try {
    let googleuser = await gapi.auth2
      .getAuthInstance()
      .signIn({ prompt: 'consent' });
    if (googleuser) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

export const signOutFromGoogle = () => {
  try {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      auth2.disconnect();
    });
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const getSignedInUserInfo = async () => {
  try {
    let status = await checkSignInStatus();
    if (status) {
      var auth2 = gapi.auth2.getAuthInstance();
      var profile = auth2.currentUser.get().getBasicProfile();
      return {
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const editCalendarEvent = (event, googleEventId) => {
  try {
    window.gapi.client.load('calendar', 'v3', () => {
      var request = window.gapi.client.calendar.events.patch({
        calendarId: 'primary',
        resource: event,
        eventId: googleEventId,
      });

      request.execute();
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCalendarEvent = (googleEventId) => {
  try {
    window.gapi.client.load('calendar', 'v3', () => {
      var request = window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: googleEventId,
      });

      request.execute();
    });
  } catch (error) {
    console.error(error);
  }
};
