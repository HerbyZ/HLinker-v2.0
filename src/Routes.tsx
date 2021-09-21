import { Switch, Route } from 'react-router-dom';

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
        <Route path="/sign-in" component={() => <h1>Sign in</h1>} />
        <Route path="/sign-up" component={() => <h1>Sign up</h1>} />
      </Switch>
    );
  }
};
