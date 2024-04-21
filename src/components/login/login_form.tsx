import { useState } from 'react';
import { AuthContextType } from '../../auth/AuthProvider';
import { useToast } from '../toast/toast';

interface LoginFormProps {
  auth: AuthContextType
}

const LoginForm = ({auth}: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { addToast } = useToast();

  const onSubmit = () => {
    if (username === '' || password === '') {
      addToast('error', 'Please fill in all fields');
      return;
    }
    auth.loginAction(username, password);
  };

  return (
    <>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="submitbutton" onClick={onSubmit}>Login</button>
    </>
  );
};

export default LoginForm;