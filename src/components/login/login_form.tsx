import { useState } from 'react';
import { AuthContextType } from '../../auth/AuthProvider';
import ToastContainer from '../toast/toast';

interface LoginFormProps {
  auth: AuthContextType
}

const LoginForm = ({auth}: LoginFormProps) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ToastContainer>
      {addToast => (
        <>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="submitbutton" onClick={() => {
            if (username && password) {
              auth.loginAction(username, password);
            } else {
              addToast('warning', 'Please fill in all fields properly!');
            }
          }}>Login</button>
        </>
      )}
    </ToastContainer>
  );
};

export default LoginForm;