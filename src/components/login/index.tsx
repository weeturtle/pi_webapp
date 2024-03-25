import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleSubmitEvent = () => {
    if (username && password) {
      auth.loginAction(username, password);
      return;
    }
    alert('please provide a valid input');
  };

  return (
    <div className="login_container">
      <h1>Login</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSubmitEvent}>Login</button>
    </div>
  );
};

export default LoginBox;