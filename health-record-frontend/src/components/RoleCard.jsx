import { Link } from 'react-router-dom';

const RoleCard = ({ role, description, route, icon }) => {
  return (
    <Link
      to={route}
      className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold mb-1">{role}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </Link>
  );
};

export default RoleCard;
