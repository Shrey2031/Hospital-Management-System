import Sidebar from "../FacilityDashboard/Sidebar";
import Header from "../FacilityDashboard/Header";
import OverviewCard from "../FacilityDashboard/OverviewCard";
import StatsCards from "../FacilityDashboard/StatsCards";
import DepartmentTable from "../FacilityDashboard/DepartmentTable";
import FacilityProfile from "../FacilityDashboard/FacilityProfile";
import SummaryCard from "../FacilityDashboard/SummaryCard";
import AlertsCard from "../FacilityDashboard/AlertsCard";
import BedManagement from "../FacilityDashboard/BedManagement";
import QuickActions from "../FacilityDashboard/QuickActions";

const FacilityDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <Header />

        <div className="grid grid-cols-12 gap-6 mt-6">
          
          {/* LEFT SECTION */}
          <div className="col-span-12 xl:col-span-9 space-y-6">
            <OverviewCard />

            <StatsCards />

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7">
                <DepartmentTable />
              </div>

              <div className="col-span-12 lg:col-span-5">
                <BedManagement />
              </div>
            </div>

            <QuickActions />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 xl:col-span-3 space-y-6">
            {/* <FacilityProfile /> */}
            <SummaryCard />
            <AlertsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacilityDashboard;