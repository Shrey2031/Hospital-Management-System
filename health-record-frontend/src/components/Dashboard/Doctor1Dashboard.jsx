import DashboardLayout from "../../components/DoctorDashboard/DashboardLayout";
import Sidebar from "../../components/DoctorDashboard/Sidebar";
import Header from "../../components/DoctorDashboard/Header";
import OverviewCard from "../../components/DoctorDashboard/OverviewCard";
import StatsCards from "../../components/DoctorDashboard/StatsCard";
import ScheduleTable from "../../components/DoctorDashboard/ScheduleTable";
import ProfileCard from "../../components/DoctorDashboard/ProfileCard";
import AppointmentCard from "../../components/DoctorDashboard/AppointmentCard";
import QuickActions from "../../components/DoctorDashboard/QuickActions";
import AlertsCard from "../../components/DoctorDashboard/AlertsCard";

const DoctorDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex min-h-screen bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff]">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Header />

          <div className="grid grid-cols-12 gap-6 mt-6">
            
            {/* LEFT SIDE */}
            <div className="col-span-12 xl:col-span-9 space-y-6">
              <OverviewCard />

              <StatsCards />

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-7">
                  <ScheduleTable />
                </div>

                <div className="col-span-12 lg:col-span-5">
                  <QuickActions />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-12 xl:col-span-3 space-y-6">
              {/* <ProfileCard /> */}
              <AppointmentCard />
              <AlertsCard />
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;