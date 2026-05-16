import Sidebar from "../../components/PatientDashboard/Sidebar";
import Topbar from "../../components/PatientDashboard/Topbar";
import HealthOverview from "../../components/PatientDashboard/HealthOverview";
import StatsCards from "../../components/PatientDashboard/StatsCards";
import RecentRecords from "../../components/PatientDashboard/RecentRecords";
import QuickActions from "../../components/PatientDashboard/QuickActions";
import AppointmentCard from "../../components/PatientDashboard/AppointmentCard";
import ReminderCard from "../../components/PatientDashboard/ReminderCard";

const Dashboard = () => {
  return (
    <div className="flex bg-[#dfe7ff] min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Topbar />

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* LEFT SIDE */}
          <div className="col-span-8 space-y-6">
            <HealthOverview />

            <StatsCards />

            <RecentRecords />

            <QuickActions />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-4 space-y-6">
            <AppointmentCard />

            <ReminderCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;