import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [signingin, setSigningin] = useState(false);

  const hist = useHistory();

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
          hist.push('/');
        }
      })
      .catch(err => console.log(err.message));
  };

  return (
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
        { !signingin && <button type="submit">Login</button> }
        { signingin && <button type="button" disabled>Logging in..</button> }
      </div>
    </form>
  );
};

export default Login;
