import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import './login.scss';
import LoginForm from './login_form';
import RegisterForm from './register_form';

enum FormType {
  LOGIN = 'Log in',
  SIGNUP = 'Sign Up'
}

const LoginBox = () => {
  const auth = useAuth();

  const [currentForm, setCurrentForm] = useState<FormType>(FormType.LOGIN);

  return (
    <div className="login_container">
      <h2 className= "logintitle">{currentForm}</h2>
      <div className="decorunder"></div>
      <div className = "formselector-container">
        <button className={`form-option${currentForm === FormType.SIGNUP && ' gray'}`} onClick={() => setCurrentForm(FormType.LOGIN)}>Login</button>
        <button className={`form-option${currentForm === FormType.LOGIN && ' gray'}`} onClick={() => setCurrentForm(FormType.SIGNUP)} >Sign up</button>
      </div>
      {
        currentForm === FormType.LOGIN ? <LoginForm auth={auth} /> : <RegisterForm auth={auth} />
      }
    </div>
  );
};

export default LoginBox;