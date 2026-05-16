const ReminderCard = () => {
  return (
    <div className="bg-[#09153d] rounded-3xl p-6 text-white">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">
          Health Reminders
        </h2>

        <button>View all</button>
      </div>

      <div className="space-y-4 mt-6">
        <div className="bg-white/5 p-4 rounded-2xl">
          <h3 className="font-semibold">
            Take your Vitamin D3
          </h3>

          <p className="text-gray-400 mt-1 text-sm">
            1 tablet daily after breakfast
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl">
          <h3 className="font-semibold">
            Hydration Goal
          </h3>

          <p className="text-gray-400 mt-1 text-sm">
            Drink 8 glasses of water today
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl">
          <h3 className="font-semibold">
            Daily Walk
          </h3>

          <p className="text-gray-400 mt-1 text-sm">
            30 mins walk to stay active
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;