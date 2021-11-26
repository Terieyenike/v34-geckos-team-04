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
    <div className="flex flex-col items-center justify-around h-screen py-20">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-5xl font-bold text-center lg:text-6xl">
          Meeting App?
    <main className='flex flex-col items-center justify-around h-screen py-20'>
      <div className='flex flex-col items-center'>
        <h1 className='mb-8 text-5xl font-bold text-center lg:text-6xl'>
          readyevent
        </h1>
        <img src={loginPagePic} alt="Meeting app" className="self-center" />
      </div>
      <button
        className="flex items-center justify-center w-64 h-12 pr-4 transition duration-200 bg-white border rounded-full hover:bg-blue-100 hover:border-blue-300"
        onClick={() => getAuthToGoogle()}>
        <GoogleLogo width="48px" height="48px" />
        <span className="text-md md:text-lg">Sign in with Google</span>
      </button>

      {error && <Alert error="Login failed!" detail={error} />}
    </div>
      {error && <Alert error='Login failed!' detail={error} />}
    </main>

  );
};
export default LoginPage;
