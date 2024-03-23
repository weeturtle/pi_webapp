import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
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
    </nav>
  );
};

export default Navbar;