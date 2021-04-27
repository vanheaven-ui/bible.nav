import { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
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
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Signup;
