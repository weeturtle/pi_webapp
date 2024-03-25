import { Link } from 'react-router-dom';
import './navstyle.scss';
import HomeButton from './home_button';
import AccountButton from './account_button';

const Navbar = () => {
  return (
    <nav className='nav_bar'>
      <div className='link_container'>
        <Link to="/" className='home_button_container'>
          <HomeButton />
        </Link>

        <ul className='inner_link_container'>
          <li>
            <Link to="/nutrition">
              Nutrition
            </Link>
          </li>
          <li>
            <Link to="/exercise">
              Exercise
            </Link>
          </li>
          <li>
            <Link to="/glucose">
              Glucose
            </Link>
          </li>
        </ul>

        <AccountButton />
      </div>

      <div className='nav_break' />
    </nav>
  );
};

export default Navbar;