import { useState } from 'react';
import { AuthContextType } from '../../auth/AuthProvider';


interface LoginFormProps {
  auth: AuthContextType
}


const LoginForm = ({auth}: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitEvent = () => {
    if (username && password) {
      auth.loginAction(username, password);
      return;
    }
    alert('please provide a valid input');
  };

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="submitbutton" onClick={handleSubmitEvent}>Log in</button>
    </>
  );
};

export default LoginForm;