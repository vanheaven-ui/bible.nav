import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, Link,
} from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../redux/actions';
import '../styles/login.css';

const Login = ({ update }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const verseID = useSelector(state => state.verses.id);
  console.log(verseID);

  const [signingin, setSigningin] = useState(false);

  const lastLocation = useLastLocation();
  console.log(lastLocation);

  const hist = useHistory();
  const dispatch = useDispatch();

  const loginParams = {
    username,
    password,
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSigningin(true);

    fetch('https://biblenav-api.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginParams),
    })
      .then(res => {
        setSigningin(false);
        if (res.ok) {
          console.log('Log in successful!');
          return res.json();
        }
        throw Error('Could not login');
      })
      .then(data => {
        dispatch(getCurrentUser(data));
        update(true);
        if (lastLocation.pathname.indexOf('books') !== -1) {
          const bookID = lastLocation.pathname.split('/')[2];
          hist.push(`/books/${bookID}/verses/${verseID}`);
        } else {
          hist.push('/');
        }
      })
      .catch(err => console.log(err.message));
  };

  return (
    <section className="login">
      <h3 className="h5">Login into Bible.nav and manage your favorites</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="actions">
          { !signingin && <button type="submit" className="block-btn">Login</button> }
          { signingin && <button type="button" disabled className="block-btn">Logging in..</button> }
        </div>
      </form>
      <div className="other-action">
        Do not have an account?
        {' '}
        <Link to="/signup">Register Here</Link>
      </div>
    </section>
  );
};

Login.propTypes = {
  update: PropTypes.func.isRequired,
};

export default Login;
