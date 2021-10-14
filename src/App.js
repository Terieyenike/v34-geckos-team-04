import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import { UserContext } from './contexts/UserContext';
const App = () => {
  const [userData, setUserData] = useState({});
  console.log('userData', userData);
  return (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <LoginPage />
      </UserContext.Provider>
    </div>
  );
};

export default App;
