import React, { Fragment, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import SetDate from './SetDate';
import TimeVote from './TimeVote';
import { EventsContext } from '../../contexts/EventsContext';

const AvailabilityCheck = () => {
  const { eventId } = useParams();
  const { eventData } = useContext(EventsContext);
  const event = eventData.find((e) => e.id === eventId);
  const start = new Date(event.start);

  return (
    <Fragment>
      <Link to={`/events/${eventId}`}>{`< Back to event info`}</Link>
      <SetDate eventId={eventId} start={start} event={event} />
      <TimeVote eventId={eventId} event={event} />
    </Fragment>
  );
};

export default AvailabilityCheck;
