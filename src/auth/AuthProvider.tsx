import { useContext, createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../vars';
import ToastContainer from '../components/toast/toast';

export interface AuthContextType {
  token: null | string,
  user: null | string,
  loginAction: (username: string, password: string) => void,
  signupAction: (email: string, username: string, password: string) => void,
  logOut: () => void,
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('site') || null);
  const navigate = useNavigate();
  const [addToast, setAddToast] = useState<(type: string, message?: string) => void>(() => () => {}); 

  const loginAction = async (username: string, password: string) => { 
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();
      if (res.success) {
        console.log('Login successful');
        addToast('success', 'Login successful!');
        setUser(username);
        setToken(res.token);
        localStorage.setItem('site', res.token);
        console.log('Token:', res.token);
        navigate('/');
        return;
      } else {
        addToast('error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const signupAction = async (email: string, username: string, password: string) =>{
    try {
      //check if username exists && maybe also if the email exists need to bring this up?
      let response = await fetch(`${BASE_URL}/username-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      let res = await response.json();
      if (res.message === 'User exists') {
        addToast('warning', 'Username already exists. Please choose a different one.');
        return;
      }
  
      //if the username they use doesnt exist can still work!!
      response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      res = await response.json();
      if (res.success) {
        addToast('success', 'Signup successful!');
        //need to log the user aftermaybe??? double checking perhaps not still need to get them to login still??
        setUser(username);
        setToken(res.token);
        localStorage.setItem('site', res.token);
        navigate('/'); // when we get an actual login separate page refer it to that lol 
        return;
      } else {
        addToast('error', 'An error occurred during signup.');
      }
    } catch (error) {
      console.error(error);
      addToast('error', 'An error occurred during signup.');
    }
  };  


  const logOut = () =>{
    setUser(null);
    setToken(null);
    localStorage.removeItem('site');
    navigate('/login');
  };
  
  return (
  /*<AuthContext.Provider value={{ token, user, loginAction, logOut, signupAction}}>
      <ToastContainer>
        {(addToast) => (
          <>
            {children}
          </>
        )}
      </ToastContainer>
    </AuthContext.Provider>   DK why it doesnt let me wrong within */

    <ToastContainer>
      {addToast => (
        <AuthContext.Provider value={{
          token, user,
          loginAction, //trying refer within
          signupAction, // --> update: nope just stick it outer
          logOut
        }}>
          {children}
        </AuthContext.Provider>
      )}
    </ToastContainer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

