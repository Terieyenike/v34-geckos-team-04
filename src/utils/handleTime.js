import moment from 'moment';

export default function handleTime(eventStart, eventEnd = null) {
  let start = moment(eventStart);
  let end;

  if (!eventStart && !eventEnd) {
    return null;
  }

  if (eventEnd) {
    end = moment(eventEnd);
    // if event starts and ends on the same day
    if (start.format('DDMM') === end.format('DDMM')) {
      return start.format('DD/MM HH:mm') + ' - ' + end.format('HH:mm');
    }
    //if events start and ends on a different day
    else {
      return start.format('DD/MM HH:mm') + ' - ' + end.format('DD/MM HH:mm');
    }
  } else return start.format('DD/MM HH:mm');
}
