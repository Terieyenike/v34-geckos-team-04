import React from 'react';
import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import { Icon } from '@iconify/react';
import SignoutButton from './shared/SignoutButton';
import { useHistory, useRouteMatch } from 'react-router-dom';
//import profilePic from '../assets/profile-pic-dummy.jpg';

const menu = [
  { name: 'Home', icon: 'fa-solid:home' },
  { name: 'New Event', icon: 'fa-solid:plus' },
  { name: 'Google Calendar', icon: 'fa-solid:calendar-alt' },
];

const MenuBar = (props) => {
  const { userData } = useContext(UserContext);
  const [largeScreen, setLargeScreen] = useState(false);
  const history = useHistory();
  const { url } = useRouteMatch();

  const setNewWidth = () => {
    if (window.innerWidth >= 1023) {
      setLargeScreen(true);
    } else {
      setLargeScreen(false);
    }
  };

  //initial rendering
  useEffect(() => {
    setNewWidth();
  }, []);

  const handleIconClick = (iconClicked) => {
    if (iconClicked === 'New Event') {
      props.setActiveEvent(true);
      history.push(`${url}/new`);
    } else if (iconClicked === 'Home') {
      props.setActiveEvent(false);
      history.push(`/events`);
    } else if (iconClicked === 'Google Calendar') {
      window.open('https://calendar.google.com/calendar/');
    }
  };

  //detecting size change
  useLayoutEffect(() => {
    window.addEventListener('resize', setNewWidth);
    return () => window.removeEventListener('resize', setNewWidth);
  }, [setNewWidth]);

  const icon = menu.map((icon, index) => {
    return (
      <li
        key={icon.name}
        className='lg:flex lg:w-full lg:justify-start lg:items-center lg:my-8 cursor-pointer'
        onClick={() => handleIconClick(icon.name)}
      >
        <Icon
          icon={icon.icon}
          color='#4a3f3f'
          width='48'
          height='48'
          className='lg:w-3/5 lg:h-3/5 lg:mr-2'
        />
        {largeScreen && (
          <p className='lg:text-center lg:w-full lg:text-2xl'>{icon.name}</p>
        )}
      </li>
    );
  });

  return (
    <nav className='bg-white w-screen h-20 fixed -bottom-0 lg:bg-gray-400 lg:w-40 xl:w-56 lg:h-screen lg:py-10 lg:flex lg:flex-col lg:p-4'>
      <ul className='h-full flex justify-around items-center lg:flex-col lg:justify-start'>
        {icon}
      </ul>
      {largeScreen && (
        <React.Fragment>
          <div className='flex items-center'>
            <img
              src={userData.imageUrl}
              alt='Profile Avatar'
              className='h-12 w-12 m-2'
              referrerPolicy='no-referrer'
            />
            <div>
              <div>{userData.name}</div>
              <div className='truncate w-20 xl:w-32'>{userData.email}</div>
            </div>
          </div>
          <SignoutButton />
        </React.Fragment>
      )}
    </nav>
  );
};

export default MenuBar;
