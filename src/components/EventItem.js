import handleTime from '../utils/handleTime';

export default function EventItem(props) {
  const { event } = props;

  function handleClick() {
    props.onClick(event.id);
  }

  return (
    <li
      onClick={handleClick}
      className='bg-red-400 hover:bg-red-600 active:bg-red-800 transition duration-200 text-white rounded-3xl w-80 lg:w-72 xl:w-80 h-28 flex flex-col items-center justify-center shadow-2xl'
    >
      <p className='text-2xl lg:text-xl xl:text-2xl'>
        {handleTime(event.start, event.end)}
      </p>
      <p className='text-3xl lg:text-xl xl:text-3xl'>{event.name}</p>
    </li>
  );
}
