const rows = [
  {
    time: "09:00 AM",
    patient: "John Smith",
    type: "Consultation",
    status: "Completed",
  },
  {
    time: "10:00 AM",
    patient: "Sarah Johnson",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    time: "11:00 AM",
    patient: "Michael Brown",
    type: "Consultation",
    status: "Pending",
  },
];

const ScheduleTable = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Today's Schedule
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="pb-4">Time</th>
            <th>Patient</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-t border-white/10"
            >
              <td className="py-4">{row.time}</td>
              <td>{row.patient}</td>
              <td>{row.type}</td>
              <td className="text-green-400">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;