import { useState } from 'react';
import { AuthContextType } from '../../auth/AuthProvider';
import ToastContainer from '../toast/toast';

interface RegisterFormProps {
  auth: AuthContextType
}

const RegisterForm = ({auth}: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*const handleSignupEvent = () =>{
    if (email && username && password) {
      auth.signupAction(email, username, password);
      return;
    }
    alert('Please fill in all fields properly!');
  };*/

  return (
    <ToastContainer>
      {addToast => (
        <>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="submitbutton" onClick={() => {
            if (email && username && password) {
              auth.signupAction(email, username, password);
            } else {
              addToast('warning', 'Please fill in all fields properly!');
            }
          }}>Register</button>
        </>
      )}
    </ToastContainer>
  );
};

export default RegisterForm;