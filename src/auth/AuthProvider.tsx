import { useContext, createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const URL = 'http://192.168.1.196:10000/login';
const URL = 'https://pi-backend-179v.onrender.com/login';

interface AuthContextType {
  token: null | string,
  user: null | string,
  loginAction: (username: string, password: string) => void,
  logOut: () => void,

}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('site') || null);
  const navigate = useNavigate();

  const loginAction = async (username: string, password: string) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();
      if (res.success) {
        console.log('Login successful');
        setUser(username);
        setToken(res.token);
        localStorage.setItem('site', res.token);
        console.log('Token:', res.token);
        navigate('/');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () =>{
    setUser(null);
    setToken(null);
    localStorage.removeItem('site');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{token, user, loginAction, logOut}}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
