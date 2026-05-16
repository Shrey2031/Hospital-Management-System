const actions = [
  "Add New Patient",
  "Book Appointment",
  "Manage Staff",
  "Inventory Check",
  "Generate Report",
];

const QuickActions = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500 hover:to-blue-500 transition rounded-2xl p-5"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;