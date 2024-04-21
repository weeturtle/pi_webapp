import { useState } from 'react';
import { AuthContextType } from '../../auth/AuthProvider';
import { useToast } from '../toast/toast';

interface RegisterFormProps {
  auth: AuthContextType
}

const RegisterForm = ({auth}: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { addToast } = useToast();
  
  const handleSignupEvent = () =>{
    if (email && username && password) {
      auth.signupAction(email, username, password);
    } else {
      addToast('warning', 'Please fill in all fields properly!');
    }
  };

  return (
    <>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="submitbutton" onClick={handleSignupEvent}>Register</button>
    </>
  );
};

export default RegisterForm;