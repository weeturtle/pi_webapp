import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import './login.scss';

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

  const [action, setAction] = useState('Sign up');

  return (
    <div className="login_container">
      <h2 className= "logintitle">{action}</h2>
      <div className="decorunder"></div>
      <div className = "submitbutton-container">
        <div className = {action=== 'Login'?'submitbuttons': 'submitbuttons gray'} onClick={() => {setAction('Login');}}>Login</div>
        <div className = {action=== 'Login'?'submitbuttons gray': 'submitbuttons'} onClick={() => {setAction('Sign up');}} >Sign up</div>
      </div>
      {action=== 'Login'?<div></div>: <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSubmitEvent}>{action}</button>
      {/*Might need to do a thingy*/}
    </div>
  );
};

export default LoginBox;