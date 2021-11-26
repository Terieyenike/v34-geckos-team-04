import React, { useState, useContext } from 'react';
import { Link, Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import EventItem from '../components/EventItem.js';
import EventInfo from '../components/EventInfo.js';
import { EventsContext } from '../contexts/EventsContext.js';
import { UserContext } from '../contexts/UserContext.js';
import ToDoList from '../components/ToDoList.js';
import Header from '../components/Header.js';
import MenuBar from '../components/MenuBar.js';
import NewEvent from '../components/NewEvent.js';
import AvailabilityCheck from '../components/Availability/AvailabilityCheck';

export default function EventsPage() {
  const [activeEvent, setActiveEvent] = useState(false);
  const { eventData: events } = useContext(EventsContext);
  const { userData } = useContext(UserContext);
  const { path } = useRouteMatch();
  const { dispatch } = useContext(EventsContext);
  const [title, setTitle] = useState('');

  function handleEventItemClick(eventName) {
    setActiveEvent(true);
    setTitle(eventName);
  }

  return (
    <React.Fragment>
      <Header
        title={activeEvent ? title : 'Events'}
        link={userData.imageUrl}
        returnBtn={true}
        setActiveEvent={setActiveEvent}
        activeEvent={activeEvent}
      />
      <MenuBar setActiveEvent={setActiveEvent} />
      <main className='flex flex-row justify-around h-[calc(100%-10rem)] lg:h-full lg:ml-40 xl:ml-56 relative top-20 lg:top-0'>
        {!activeEvent && <Redirect to='/events' />}
        <div
          className={`lg:w-1/3 flex justify-center overflow-y-auto overflow-x-hidden ${
            activeEvent && 'hidden lg:flex'
          } py-10`}
        >
          <ul className='flex flex-col space-y-10 items-center w-screen'>
            {events.map((event, index) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <EventItem
                  event={event}
                  onClick={() => {
                    handleEventItemClick(event.name);
                    dispatch({
                      type: 'selectEvent',
                      eventId: event.id,
                    });
                  }}
                />
              </Link>
            ))}
          </ul>
        </div>
        <div
          className={`w-screen lg:w-2/3 flex flex-col bg-gray-50 border-l overflow-y-auto px-8 py-4 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 ${
            !activeEvent && 'hidden lg:flex'
          }`}
        >
          <Switch>
            <Route path={`${path}/new`} exact>
              <NewEvent setActiveEvent={setActiveEvent} />
            </Route>
            <Route path={`/events/:eventId`} exact>
              <EventInfo setActiveEvent={setActiveEvent} />
            </Route>
            <Route path='/events/:eventId/todos'>
              <ToDoList />
            </Route>
            <Route path='/events/:eventId/availability'>
              <AvailabilityCheck />
            </Route>
            <Route path='*'>
              <p>Select an event to view</p>
            </Route>
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}
