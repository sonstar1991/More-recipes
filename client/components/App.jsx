import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import LandingPage from './recipes/LandingPage';
import SignUp from './signupPage/connectedComponent/SignUp';
import SignIn from './recipes/SignIn';


const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
