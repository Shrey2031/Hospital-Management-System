const departments = [
  {
    name: "Cardiology",
    occupancy: "78%",
    patients: 32,
    status: "Good",
  },
  {
    name: "Orthopedics",
    occupancy: "65%",
    patients: 28,
    status: "Good",
  },
  {
    name: "Emergency",
    occupancy: "91%",
    patients: 45,
    status: "Busy",
  },
];

const DepartmentTable = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">
        Department Overview
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-left">
            <th className="pb-4">Department</th>
            <th>Occupancy</th>
            <th>Patients</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((item, index) => (
            <tr
              key={index}
              className="border-t border-white/10"
            >
              <td className="py-4">{item.name}</td>
              <td>{item.occupancy}</td>
              <td>{item.patients}</td>
              <td
                className={`${
                  item.status === "Busy"
                    ? "text-orange-400"
                    : "text-green-400"
                }`}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;