import { useNavigate } from 'react-router-dom';

const RoleSelectionLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-semibold mb-6">Login As</h2>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/login/user')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Patient
        </button>
        <button
          onClick={() => navigate('/login/doctor')}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Doctor
        </button>
        <button
          onClick={() => navigate('/login/facility')}
          className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
        >
          Health Facility
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionLogin;
