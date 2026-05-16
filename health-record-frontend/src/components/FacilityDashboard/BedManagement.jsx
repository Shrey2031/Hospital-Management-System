const BedManagement = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">
        Bed Management
      </h2>

      <div className="flex justify-center">
        <div className="w-52 h-52 rounded-full border-[18px] border-purple-500 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold">245</h1>
            <p className="text-gray-400 mt-2">
              Total Beds
            </p>
          </div>
        </div>
      </div>

      <button className="w-full mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-2xl">
        View Bed Dashboard
      </button>
    </div>
  );
};

export default BedManagement;