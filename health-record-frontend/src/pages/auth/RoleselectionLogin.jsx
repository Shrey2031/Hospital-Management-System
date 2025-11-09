import { useNavigate } from 'react-router-dom';

// const RoleSelectionLogin = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//       <h2 className="text-2xl font-semibold mb-6">Login As</h2>
//       <div className="space-y-4">
//         <button
//           onClick={() => navigate('/login/user')}
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//         >
//           Patient
//         </button>
//         <button
//           onClick={() => navigate('/login/doctor')}
//           className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//         >
//           Doctor
//         </button>
//         <button
//           onClick={() => navigate('/login/facility')}
//           className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
//         >
//           Health Facility
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoleSelectionLogin;

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


