import DateTimePicker from './DateTimePicker';

const SetDate = ({ event, eventId, start }) => {
  return (
    <div className='mb-6'>
      <h3 className='text-xl mt-4 mb-2 font-bold'>Set Date</h3>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:pr-2'>
          <p>Starts</p>
          <DateTimePicker
            minDateTime={new Date()}
            setting='start'
            eventId={eventId}
            eventDate={event.start}
          />
        </div>
        <div className='lg:pl-2'>
          <p>Ends</p>
          <DateTimePicker
            minDateTime={start}
            setting='end'
            eventId={eventId}
            eventDate={event.end}
          />
        </div>
      </div>
    </div>
  );
};

export default SetDate;
