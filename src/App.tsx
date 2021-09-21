import React from 'react';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

const App: React.FC = () => {
  const auth = useAuth();
  const isAuthenticated = !!auth.accessToken;

  return (
    <AuthContext.Provider value={{ ...auth, isAuthenticated }}>
      <div className="app">
        <h1>Hello, world!</h1>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
