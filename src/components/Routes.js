import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Book from './Book';
import Navbar from './common/Navbar';
import LoggedInNavbar from './common/NavbarLogin';
import Login from './Login';
import Signup from './Signup';
import Verse from './Verse';

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
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/verse/:id">
          <Verse />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
