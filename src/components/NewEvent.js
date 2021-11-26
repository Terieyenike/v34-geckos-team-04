import { useContext, useState, useEffect } from 'react';
import { EventsContext } from '../contexts/EventsContext';
import { UserContext } from '../contexts/UserContext';
import { Icon } from '@iconify/react';

const NewEvent = (props) => {
  const { userData } = useContext(UserContext);
  const { dispatch } = useContext(EventsContext);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  // dispatches a new event to reducer
  // resets form state to default
  const handleForm = (e) => {
    e.preventDefault();
    dispatch({
      type: 'addNewEvent',
      name,
      desc,
      creator: userData.name,
    });
    setName('');
    setDesc('');
    props.setActiveEvent(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        if (name !== '' && desc !== '') {
          event.preventDefault();
          handleForm(event);
        }
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [name, desc]);

  return (
    <div className='h-full mb-20 flex justify-center'>
      <form className='h-full w-80 flex flex-col justify-center items-center space-y-4'>
        <div className='flex items-center'>
          <label htmlFor='name' className='w-24'>
            Name:
          </label>
          <input
            type='text'
            id='name'
            className='form-input rounded-full'
            autoComplete='off'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter an event name'
            required
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='description' className='w-24'>
            Description:
          </label>
          <input
            type='text'
            id='description'
            className='form-input rounded-full'
            autoComplete='off'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Enter event description'
            required
          />
        </div>
        <button
          onClick={handleForm}
          disabled={(name === '' || desc === '') && true}
          className='self-end'
        >
          <Icon
            icon='fluent:checkmark-12-filled'
            className='w-12 h-12 text-green-500'
          />
        </button>
      </form>
    </div>
  );
};
export default NewEvent;
