import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginPage } from './components/login-page/LoginPage';
import { RegisterPage } from './components/register-page/RegisterPage';

export const useRoutes = (isAuthenticated: boolean) => {
  // TODO: Routes components
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={() => <h1>Hello, world!</h1>} />
        <Route path="/sign-in" component={LoginPage} />
        <Route path="/sign-up" component={RegisterPage} />
      </Switch>
    );
  }
};
