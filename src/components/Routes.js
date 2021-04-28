import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Navbar from './common/Navbar';
import LoggedInNavbar from './common/NavbarLogin';
import Login from './Login';
import Signup from './Signup';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      { loggedIn && <LoggedInNavbar /> }
      { !loggedIn && <Navbar /> }
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login update={setLoggedIn} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
