import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Login from './Login';
import Signup from './Signup';

const Routes = () => (
  <Router>
    <Navbar />
    <Switch>
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
