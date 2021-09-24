import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/header/Header';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './Routes';

const App: React.FC = () => {
  const auth = useAuth();
  const isAuthenticated = !!auth.accessToken;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ ...auth, isAuthenticated }}>
      <div className="app">
        <Router>
          <Header isAuthenticated={isAuthenticated} />
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
