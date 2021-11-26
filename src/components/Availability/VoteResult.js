import React, { useState } from 'react';
import { EventsContext } from '../../contexts/EventsContext';
import ScheduleSelector from 'react-schedule-selector';
import { useContext } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

const VoteResult = ({ eventId, userName, numberOfGrid, event }) => {
  const { dispatch } = useContext(EventsContext);
  const { eventData } = useContext(EventsContext);
  const availability = eventData.find((e) => e.id === eventId).availability;
  const schedule = availability.map((a) => a.schedules);
  const selectedTime = [];
  schedule.forEach((s1) => s1.forEach((s2) => selectedTime.push(s2)));
  const votingCount = {};
  selectedTime.forEach((e) =>
    votingCount[e] ? votingCount[e]++ : (votingCount[e] = 1)
  );
  const [date, setDate] = useState(event.start);

  const renderCustomDateCell = (time, selected, innerRef) => (
    <div style={{ textAlign: 'center' }} ref={innerRef}>
      {selected ? `${votingCount[time]}` : ' '}
    </div>
  );

  const editTime = (e) => {
    e.preventDefault();
    dispatch({ type: 'deleteSchedule', schedule, eventId, userName });
  };
  //show timeselector page again by deleting user's availability

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <h3 className='text-xl mt-4 mb-4 font-bold'>View Voting Results</h3>
      <div className='mb-8'>
        <DatePicker
          label='START DATE'
          openTo='day'
          views={['year', 'month', 'day']}
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <ScheduleSelector
          selection={selectedTime}
          startDate={date}
          numDays={numberOfGrid}
          minTime={8}
          maxTime={22}
          hourlyChunks={1}
          renderDateCell={renderCustomDateCell}
        />
      </div>
      <button
        className='w-16 h-8 bg-gray-400 text-white rounded my-3'
        onClick={editTime}
      >
        Edit
      </button>
    </LocalizationProvider>
  );
};

export default VoteResult;
