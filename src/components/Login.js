import { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

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
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="actions">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
