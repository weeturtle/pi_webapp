import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

const AccountButton = () => {
  const { token, logOut } = useAuth();

  if (token) {
    return (
      <button className='login_button_container' onClick={logOut}>
        Logout
      </button>
    );
  }

  return (
    <Link to="/login" className='login_button_container'>
      Login
    </Link>
  );
};

export default AccountButton;