import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const { userData } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => (userData.loggedIn ? children : <Redirect to='/' />)}
    />
  );
};
export default PrivateRoute;
