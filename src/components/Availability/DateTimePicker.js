import React, { useState, useContext } from 'react';
import { EventsContext } from '../../contexts/EventsContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { editCalendarEvent } from '../../utils/api';
import moment from 'moment';

const DateTimePicker = ({ minDateTime, setting, eventId, eventDate }) => {
  const { dispatch, eventData } = useContext(EventsContext);
  const [date, setDate] = useState(eventDate);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const changeDateHandler = (newDate) => {
    setDate(newDate);
    dispatch({ type: 'setNewDate', eventId, newDate, setting });
    dispatch({ type: 'setTimezone', eventId, timezone });

    // gets current event
    const event = eventData.find((event) => event.id === eventId);
    // converts date strings to miliseconds
    const endDateMiliseconds = parseInt(moment(event.end).format('x'));
    const newDateMiliseconds = parseInt(moment(newDate).format('x'));
    // patch object for google calendar api
    let patch = {
      [setting]: {
        dateTime: newDate.toISOString(),
        timeZone: timezone,
      },
    };
    // checks if there's a calendar event to edit
    // then checks if the start date is before the end date
    // if start date is later than the end date, changes the patch object accordingly
    if (event.googleEventId) {
      if (setting === 'start' && endDateMiliseconds < newDateMiliseconds) {
        patch = {
          start: {
            dateTime: newDate.toISOString(),
            timeZone: timezone,
          },
          end: {
            dateTime: newDate.toISOString(),
            timeZone: timezone,
          },
        };
      }
      editCalendarEvent(patch, event.googleEventId);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='hidden lg:flex'>
        <DesktopDateTimePicker
          value={date}
          inputFormat='dd/MM/yyyy hh:mm a'
          onChange={changeDateHandler}
          minDateTime={minDateTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className='flex lg:hidden'>
        <MobileDateTimePicker
          value={date}
          inputFormat='dd/MM/yyyy hh:mm a'
          onChange={changeDateHandler}
          minDateTime={minDateTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
