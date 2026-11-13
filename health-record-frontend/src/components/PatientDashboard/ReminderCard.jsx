// const ReminderCard = () => {
//   return (
//     <div className="bg-[#09153d] rounded-3xl p-6 text-white">
//       <div className="flex justify-between">
//         <h2 className="text-2xl font-bold">
//           Health Reminders
//         </h2>

//         <button>View all</button>
//       </div>

//       <div className="space-y-4 mt-6">
//         <div className="bg-white/5 p-4 rounded-2xl">
//           <h3 className="font-semibold">
//             Take your Vitamin D3
//           </h3>

//           <p className="text-gray-400 mt-1 text-sm">
//             1 tablet daily after breakfast
//           </p>
//         </div>

//         <div className="bg-white/5 p-4 rounded-2xl">
//           <h3 className="font-semibold">
//             Hydration Goal
//           </h3>

//           <p className="text-gray-400 mt-1 text-sm">
//             Drink 8 glasses of water today
//           </p>
//         </div>

//         <div className="bg-white/5 p-4 rounded-2xl">
//           <h3 className="font-semibold">
//             Daily Walk
//           </h3>

//           <p className="text-gray-400 mt-1 text-sm">
//             30 mins walk to stay active
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReminderCard;

import { Bell } from 'lucide-react';

const ReminderCard = () => {
  const reminders = [
    { title: 'Take your Vitamin D3', desc: '1 tablet daily after breakfast' },
    { title: 'Hydration Goal', desc: 'Drink 8 glasses of water today' },
    { title: 'Daily Walk', desc: '30 mins walk to stay active' },
  ];

  return (
    <div className="bg-white border border-[#E4E1D8] rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-serif font-medium text-[#12181B] flex items-center gap-2">
          <Bell size={17} className="text-[#0E6B64]" />
          Health Reminders
        </h2>
        <button className="text-xs font-semibold text-[#0E6B64] hover:text-[#0B4F4A] transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-3 mt-5">
        {reminders.map((reminder) => (
          <div key={reminder.title} className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E4E1D8]">
            <h3 className="font-semibold text-sm text-[#12181B]">
              {reminder.title}
            </h3>
            <p className="text-[#5B6470] mt-1 text-xs">
              {reminder.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderCard;