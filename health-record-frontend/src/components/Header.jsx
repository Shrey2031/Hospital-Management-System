import { Link } from 'react-router-dom';
import logo from '../images/welltrack logo.png'
// import UserLogin from '../pages/Login/UserLogin';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl  mx-auto px-4 py-3 flex justify-between items-center">
       <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="HealthSync Logo" className="h-16 w-16 object-cover" />
          <span className="text-2xl font-bold text-blue-600">WellTrack</span>
        </Link>

        <nav className="space-x-6 hidden md:flex">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium">
            Contact
          </Link>
        </nav>

        <div className="space-x-3">
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
    
  );
};

export default Header;
