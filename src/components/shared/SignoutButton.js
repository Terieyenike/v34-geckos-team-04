import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import { signOutFromGoogle } from '../../utils/api';

const SignoutButton = () => {
  const { setUserData } = useContext(UserContext);

  const onLogoutSuccess = () =>
    setUserData({
      loggedIn: false,
      name: null,
      email: null,
      imageUrl: null,
    });

  const signOut = () => {
    signOutFromGoogle();
    onLogoutSuccess();
  };

  return (
    <button
      className='bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-200 rounded text-white'
      onClick={signOut}
    >
      SIGN OUT
    </button>
  );
};
export default SignoutButton;
