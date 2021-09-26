import { Switch, Route } from 'react-router-dom';
import { LoginPage } from './components/login-page/LoginPage';
import { RegisterPage } from './components/register-page/RegisterPage';

export const useRoutes = (isAuthenticated: boolean) => {
  // TODO: Routes components
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={() => <h1>Authenticated</h1>} />
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
