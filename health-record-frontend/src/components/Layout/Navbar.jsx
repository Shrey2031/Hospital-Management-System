import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
   const navigate = useNavigate(); 
  return (
    <nav className="flex justify-between items-center px-8 py-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400">
          MediCare+
        </h1>
        <p className="text-sm text-gray-400">
          Health Record Management
        </p>
      </div>

      <ul className="hidden lg:flex gap-10 text-gray-300">
        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">Features</li>
        <li className="hover:text-blue-400 cursor-pointer">For Patients</li>
        <li className="hover:text-blue-400 cursor-pointer">For Doctors</li>
        <li className="hover:text-blue-400 cursor-pointer">For Facilities</li>
        <li className="hover:text-blue-400 cursor-pointer">How It Works</li>

      </ul>

      <div className="flex gap-4">
        <button className="border border-blue-500 px-5 py-2 rounded-xl"
         onClick={() => navigate('/Auth')}>
          Login
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl"
         onClick={() => navigate('/Auth')}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;