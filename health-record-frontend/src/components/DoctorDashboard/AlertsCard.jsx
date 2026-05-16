const AlertsCard = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Alerts
        </h2>

        <span className="text-blue-400">View all</span>
      </div>

      <div className="space-y-4">
        <div className="bg-orange-500/10 p-4 rounded-2xl">
          <h3 className="font-semibold">
            Pending Lab Results
          </h3>

          <p className="text-sm text-gray-400">
            Review pending reports
          </p>
        </div>

        <div className="bg-purple-500/10 p-4 rounded-2xl">
          <h3 className="font-semibold">
            Appointment Reminders
          </h3>

          <p className="text-sm text-gray-400">
            Upcoming patient appointments
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertsCard;