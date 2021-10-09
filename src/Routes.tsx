import { Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login-page/LoginPage';
import { RegisterPage } from './pages/register-page/RegisterPage';
import { HomePage } from './pages/home-page/HomePage';
import { DashboardPage } from './pages/dashboard-page/DashboardPage';

export const useRoutes = (isAuthenticated: boolean) => {
  // TODO: Routes components
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={LoginPage} />
        <Route path="/sign-up" component={RegisterPage} />
      </Switch>
    );
  }
};
