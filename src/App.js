import React, { useState, useReducer, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { UserContext } from './contexts/UserContext';
import { EventsContext } from './contexts/EventsContext';
import EventsPage from './pages/EventsPage';
import events from './utils/eventData';
import eventsReducer from './utils/eventsReducer';
import PrivateRoute from './components/shared/PrivateRoute';
import { getSignedInUserInfo, initClient } from './utils/api';

const App = () => {
  // Passed to UserContext.Provider to set and share user data
  // with different components
  const [userData, setUserData] = useState({
    loggedIn: false,
    name: null,
    email: null,
    imageUrl: null,
  });

  const [eventData, dispatch] = useReducer(eventsReducer, events);
  useEffect(() => {
    initClient((success) => {
      if (success) {
        getGoogleAuthedInfo();
      }
    });
  }, []);

  const getGoogleAuthedInfo = async () => {
    let info = await getSignedInUserInfo();
    if (info) {
      setUserData({
        loggedIn: true,
        ...info,
      });
    }
  };

  return (
    <div className='h-screen'>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <EventsContext.Provider value={{ eventData, dispatch }}>
            <Switch>
              <Route exact path='/'>
                {userData.loggedIn ? <Redirect to='/events' /> : <LoginPage />}
              </Route>
              <React.Fragment>
                <PrivateRoute path='/events'>
                  <EventsPage />
                </PrivateRoute>
              </React.Fragment>
            </Switch>
          </EventsContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
