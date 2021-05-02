import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Book from './Book';
import Navbar from './common/Navbar';
import LoggedInNavbar from './common/NavbarLogin';
import Favorites from './Favorites';
import Login from './Login';
import Signup from './Signup';
import Verse from './Verse';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <Router>
      <header>
        { loggedIn && <LoggedInNavbar status={handleLogin} /> }
        { !loggedIn && <Navbar /> }
      </header>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login update={handleLogin} />
        </Route>
        <Route exact path="/books/:id">
          <Book login={loggedIn} />
        </Route>
        <Route path="/books/:id/verses/:verse">
          <Verse />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
