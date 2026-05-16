const Footer = () => {
  return (
    <footer className="bg-[#020B2D] border-t border-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between gap-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">
            MediCare+
          </h1>

          <p className="text-gray-400 mt-4 max-w-md">
            Secure digital healthcare platform for patients,
            doctors, and medical facilities.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Patients</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Records</li>
              <li>Appointments</li>
              <li>Reports</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Doctors</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Dashboard</li>
              <li>Prescriptions</li>
              <li>Patients</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Privacy</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12">
        © 2026 MediCare+. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;