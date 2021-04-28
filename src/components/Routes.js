import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Navbar from './common/Navbar';
import Login from './Login';
import Signup from './Signup';

const Routes = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
