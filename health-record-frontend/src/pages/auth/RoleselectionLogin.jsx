import { useNavigate } from 'react-router-dom';


export default function LoginRoleSelectionPage() {
  const navigate = useNavigate();

  // const handleNavigate = (role) => {
  //   navigate(`/signup/${role}`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center px-4">
      <main className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-16 max-w-md w-full text-center shadow-lg">
        <h1 className="text-gray-500 text-4xl font-extrabold mb-14 select-none drop-shadow-lg">
          Login as
        </h1>
        <div className="flex flex-col space-y-8">
          <button
            onClick={() => navigate('/login/user')}
            className="py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-400 shadow-lg hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 transition-transform active:scale-95 select-none"
          >
            Patient
          </button>
          <button
            onClick={() => navigate('/login/doctor')}
            className="py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-400 shadow-lg hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 transition-transform active:scale-95 select-none"
          >
            Doctor
          </button>
          <button
            onClick={() => navigate('/login/facility')}
            className="py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-400 shadow-lg hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 transition-transform active:scale-95 select-none"
          >
            Facility
          </button>
        </div>
      </main>
    </div>
  );
}


