import ToDoItem from './ToDoItem';
import React, { useContext, useState, useEffect } from 'react';
import handleTime from '../utils/handleTime';
import { EventsContext } from '../contexts/EventsContext';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import EventSubMenu from './EventSubMenu';
import { deleteCalendarEvent, editCalendarEvent } from '../utils/api';
import { Icon } from '@iconify/react';

export default function EventInfo(props) {
  const { eventId } = useParams();
  const { eventData, dispatch } = useContext(EventsContext);
  const { url } = useRouteMatch();
  const event = eventData.find((e) => e.id === eventId);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(event?.name);
  const [desc, setDesc] = useState(event?.desc);

  useEffect(() => {
    setName(event?.name);
    setDesc(event?.desc);
    setEdit(false);
  }, [event]);

  const handleEdit = () => {
    if (name.length > 0 && desc.length > 0) {
      if (name === event.name || desc === event.desc) {
        setEdit(false);
      }
      if (name !== event.name || desc !== event.desc) {
        dispatch({
          type: 'editEvent',
          name,
          desc,
          eventId,
        });
        setEdit(false);

        if (event.googleEventId) {
          let patch = {
            summary: name,
            description: desc,
          };
          editCalendarEvent(patch, event.googleEventId);
        }
      }
    }
  };

  const handleDelete = () => {
    if (event.googleEventId) {
      deleteCalendarEvent(event.googleEventId);
    }
    setEdit(false);
    props.setActiveEvent(false);
    dispatch({
      type: 'deleteEvent',
      eventId,
    });
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleEdit();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [name, desc]);

  if (event === undefined) {
    return <p>Event doesn't exist!</p>;
  }

  const todos = event.todos;

  return (
    <div className='mb-20 lg:mt-20 lg:mb-0 flex flex-col items-center'>
      <li className='list-none w-full'>
        {/* Link is temporary until menu/header merged */}
        {/* It adds ability to go back to events page on mobile screens */}
        {/* <Link
          to='/events'
          onClick={() => props.setActiveEvent(false)}
          className='inline-block lg:hidden'
        >
          {`< Back to events`}
        </Link> */}

        <div className='flex flex-row justify-around'>
          <div id='left'>
            <p>Name:</p>
            <p>Description:</p>
            {event.start && <p>Starts:</p>}
            {event.end && <p>Ends:</p>}
            <p>Creator:</p>
          </div>
          <div id='right'>
            {!edit && <p>{event.name}</p>}
            {edit && (
              <input
                type='text'
                className='form-input border h-6 w-full ml-3 rounded-full flex-shrink'
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            )}
            {!edit && <p>{event.desc}</p>}
            {edit && (
              <input
                type='text'
                className='form-input border h-6 w-full ml-3 rounded-full flex-shrink'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                autoFocus
              />
            )}
            {event.start && <p>{handleTime(event.start)}</p>}
            {event.end && <p>{handleTime(event.end)}</p>}
            <p>{event.creator}</p>
            {edit && (
              <React.Fragment>
                <button onClick={handleEdit}>
                  <Icon
                    icon='fluent:checkmark-12-filled'
                    className='w-12 h-12 text-green-500'
                  />
                </button>
                <button onClick={handleDelete}>
                  <Icon
                    icon='fluent:delete-16-filled'
                    className='w-12 h-12 text-red-500'
                  />
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
        <ul className='bg-red-400 text-black rounded-3xl flex flex-col items-center justify-center shadow-2xl py-6 px-6 max-w-full mt-8'>
          {todos.map((todo, index) => (
            <ToDoItem
              key={index}
              eventId={eventId}
              todo={todo}
              prio='hidden'
              index={index}
            />
          ))}
          <li>
            <Link to={`${url}/todos`} className=''>
              {todos.length === 0 ? (
                <p>No tasks set yet. Click to set new tasks.</p>
              ) : (
                <Icon
                  icon='fluent:more-horizontal-16-filled'
                  className='w-8 h-8 hover:bg-red-600 active:bg-red-800 rounded-full transition duration-200 mb-4'
                />
              )}
            </Link>
          </li>
        </ul>
      </li>
      <EventSubMenu
        dispatch={dispatch}
        event={event}
        edit={{ edit, setEdit }}
      />
    </div>
  );
}
