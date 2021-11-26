import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { EventsContext } from '../../contexts/EventsContext';
import TimeSelector from './TimeSelector';
import VoteResult from './VoteResult';
import { UserContext } from '../../contexts/UserContext';

const TimeVote = ({ event, eventId }) => {
  const { eventData } = useContext(EventsContext);
  const { userData: name } = useContext(UserContext);
  const availability = eventData.find((e) => e.id === eventId).availability;
  const usernames = availability.map(a => a.username);
  const submitted = usernames.includes(name);
  const [numberOfGrid, setNumberOfGrid] = useState();

  const setNewWidth = () => {
    if (window.innerWidth >= 1023) {
      setNumberOfGrid(5)
    } else {
      setNumberOfGrid(3)
    }
  };

  //initial rendering
  useEffect(() => {
    setNewWidth();
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('resize', setNewWidth);
    return () => window.removeEventListener('resize', setNewWidth);
  }, [setNewWidth]);

  return (
    <div>
      {/* if user already select their available time */}
      {submitted ? (
        <VoteResult eventId={eventId} userName={name} numberOfGrid={numberOfGrid} event={event}/>
      ) : (
        <TimeSelector event={event} eventId={eventId} userName={name} numberOfGrid={numberOfGrid}/>
      )}
    </div>
  );
};

export default TimeVote;
