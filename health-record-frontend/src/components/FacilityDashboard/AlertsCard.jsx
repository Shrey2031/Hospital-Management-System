const alerts = [
  "Low stock: IV Fluid",
  "Bed 203 requires maintenance",
  "Expired item in Pharmacy",
  "High wait time in OPD",
];

const AlertsCard = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6 text-white">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Recent Alerts
        </h2>

        <span className="text-blue-400">
          View all
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-4"
          >
            <h3 className="font-semibold">
              {alert}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Needs attention
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsCard;