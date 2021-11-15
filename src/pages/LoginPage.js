import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import loginPagePic from '../assets/login_page.png';
import GoogleLogo from '../components/shared/GoogleLogo';
import Alert from '../components/shared/Alert';
import { getSignedInUserInfo, signInToGoogle } from '../utils/api';

const LoginPage = () => {
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState(null);

  const getAuthToGoogle = async () => {
    let successful = await signInToGoogle();
    if (successful) {
      getGoogleAuthedInfo();
    }

  };

  const getGoogleAuthedInfo = async () => {
    let info = await getSignedInUserInfo();
    if (info) {
      setUserData({
        loggedIn: true,
        ...info,
      });
    }
  };

  return (
    <div className='flex flex-col justify-around items-center h-screen py-20'>
      <div className='flex flex-col items-center'>
        <h1 className='text-5xl lg:text-6xl font-bold text-center mb-8'>
          Meeting App?
        </h1>
        <img src={loginPagePic} alt='Meeting app' className='self-center' />
      </div>
      <button
        className='flex justify-center items-center w-64 h-12 pr-4 bg-white border rounded-full transition duration-200 hover:bg-blue-100 hover:border-blue-300'
        onClick={() => getAuthToGoogle()}
      >
        <GoogleLogo width='48px' height='48px' />
        <span className='text-md md:text-lg'>Sign in with Google</span>
      </button>
      {error && <Alert error='Login failed!' detail={error} />}
    </div>
  );
};
export default LoginPage;
