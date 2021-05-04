import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const hist = useHistory();

  const [registering, setRegistering] = useState(false);

  const signupParams = {
    username,
    email,
    password,
    password_confirmation: passwordAgain,
  };

  const handleSubmit = e => {
    e.preventDefault();
    setRegistering(true);
    fetch('https://biblenav-api.herokuapp.com/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupParams),
    })
      .then(res => {
        setRegistering(false);
        if (res.ok) {
          hist.push('/login');
        }
      });
  };

  return (
    <section className="signup">
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
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        <div className="form-group">
          <input
            type="text"
            placeholder="Type password again"
            value={passwordAgain}
            onChange={e => setPasswordAgain(e.target.value)}
          />
        </div>
        <div className="actions">
          { !registering && <button type="submit">Register</button> }
          { registering && <button type="button" disabled>Registering...</button> }
        </div>
      </form>
      Already registered?
      {' '}
      <Link to="/login">Login Here</Link>
    </section>
  );
};

export default Signup;
