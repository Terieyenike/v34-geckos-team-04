import React, { useContext, useState, useEffect } from 'react';
import { EventsContext } from '../contexts/EventsContext';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

export default function EventSubMenu(props) {
  const { eventData } = useContext(EventsContext);
  const [selectedEvent] = eventData.filter((e) => e.selected);

  const eventSubMenu = [
    {
      name: 'Availability',
      icon: 'fa-solid:user-clock',
      isNavLink: true,
      path: `/events/${selectedEvent.id}/availability`,
    },
    {
      name: 'Share',
      icon: 'fa-solid:share-alt',
      isNavLink: false,
    },
    {
      name: 'Edit',
      icon: 'bx:bxs-edit',
      isNavLink: false,
    },
  ];

  const {
    name,
    desc,
    start,
    end,
    timezone,
    id,
    googleEventId,
    googleEventLink,
  } = props.event;
  const { dispatch } = props;
  const { edit, setEdit } = props.edit;
  const [copy, setCopy] = useState(false);

  useEffect(() => setCopy(false), [props.event]);

  const publishTheCalendarEvent = (event) => {
    if (!googleEventId) {
      try {
        window.gapi.client.load('calendar', 'v3', () => {
          var request = window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute((event) => {
            navigator.clipboard
              .writeText(event.htmlLink)
              .then(() => setCopy(true))
              .then(() => window.open(event.htmlLink))
              .catch((err) => {
                console.error('Async: Could not copy text: ', err);
                setCopy(false);
              });
            dispatch({
              type: 'addGoogleEventId',
              eventId: id,
              googleEventId: event.id,
              googleEventLink: event.htmlLink,
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn('Event already created.');
      navigator.clipboard
        .writeText(googleEventLink)
        .then(() => setCopy(true))
        .catch((err) => {
          console.error('Async: Could not copy text: ', err);
          setCopy(false);
        });
    }
  };

  function handleIconClick(iconClicked) {
    if (iconClicked === 'Share') {
      let event = {
        summary: name,
        description: desc,
        end: {
          dateTime: end,
          timeZone: timezone,
        },
        start: {
          dateTime: start,
          timeZone: timezone,
        },
      };
      publishTheCalendarEvent(event);
    } else if (iconClicked === 'Edit') {
      setEdit(!edit);
    }
  }

  const icon = eventSubMenu.map((icon) => {
    return (
      <li key={icon.name} className="lg:flex lg:items-center">
        {icon.isNavLink ? (
          <NavLink to={icon.path}>
            <Icon
              icon={icon.icon}
              className="text-[#F0D2AC] cursor-pointer hover:text-yellow-400 active:text-yellow-600"
              width={36}
              height={36}
            />
          </NavLink>
        ) : (
          <React.Fragment>
            <Icon
              icon={icon.icon}
              width={36}
              height={36}
              onClick={() => handleIconClick(icon.name)}
              className="text-[#F0D2AC] cursor-pointer hover:text-yellow-400 active:text-yellow-600"
            />
            {copy && icon.name === 'Share' && (
              <div className="absolute h-10 px-2 leading-10 text-white bg-gray-600 bottom-12 lg:top-12 lg:bottom-0 rounded-xl">
                <p>Event link copied!</p>
                <span className="absolute w-3 h-3 transform rotate-45 bg-gray-600 lg:-top-1 -bottom-1 left-4"></span>
              </div>
            )}
          </React.Fragment>
        )}
      </li>
    );
  });

  return (
    <nav className="bg-[#f9fafb] w-full h-10 fixed bottom-20 lg:w-1/4 lg:flex lg:flex-col lg:-top-0 lg:-right-0">
      <ul className="flex items-center justify-around h-full">{icon}</ul>
    </nav>
  );
}
