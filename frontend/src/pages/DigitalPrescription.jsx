import React from 'react';
import { Printer, Download } from 'lucide-react';
import { Sidebar } from '../components/patient/Sidebar';
import { Topbar } from '../components/patient/Topbar';
import Footer from '../components/patient/Footer';

// --- Mock Data ---
// In a real application, this data would likely be fetched from an API
const prescriptionData = {
  issuedDate: 'October 24, 2026',
  hospital: {
    name: 'Medimate Central Hospital',
    address: '1200 Healthcare Plaza, Colombo',
    phone: '+94 00876500',
    email: 'contact@medsys.hospital',
  },
  physician: {
    name: 'Dr. Akash Smith, MD',
    specialty: 'Specialist - Internal Medicine',
    npi: '1920374850',
  },
  patient: {
    name: 'Akash Samitha',
    dob: 'May 14, 1982 (41y)',
  },
  medications: [
    {
      id: 1,
      name: 'Amoxicillin 500mg',
      type: 'Oral Capsule',
      dosage: '1 Capsule',
      frequency: 'Three times a day (TID)',
      duration: '10 Days',
    },
    {
      id: 2,
      name: 'Ibuprofen 400mg',
      type: 'Oral Tablet',
      dosage: '1 Tablet',
      frequency: 'Every 6 hours as needed',
      duration: '7 Days',
    },
    {
      id: 3,
      name: 'Loratadine 10mg',
      type: 'Non-drowsy Antihistamine',
      dosage: '1 Tablet',
      frequency: 'Once daily',
      duration: '30 Days',
    },
  ],
  instructions: [
    'Complete the full course of antibiotics even if symptoms improve. Take Amoxicillin with food to avoid stomach upset.',
    'Avoid alcohol during the duration of this prescription.',
  ],
  prescriptionId: 'RX-2023-9981-AB4',
  signedDate: '10/24/2026 14:32 EST',
};

// --- Sub-Components ---

/**
 * PageHeader displays the page title and primary actions (Print/Download).
 */
const PageHeader = ({ date, darkMode = false }) => (
  <div className="flex justify-between items-end mb-6">
    <div>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Digital Prescription</h1>
      <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Issued on {date}</p>
    </div>
    <div className="flex space-x-3">
      <button
        className={`flex items-center space-x-2 py-2 px-4 rounded-md transition-colors font-medium ${
          darkMode ? 'bg-blue-950 hover:bg-blue-900 text-blue-300' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
        }`}
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
      <button
        className={`flex items-center space-x-2 py-2 px-4 rounded-md transition-colors font-medium ${
          darkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
        }`}
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>
    </div>
  </div>
);

/**
 * HospitalAndPhysicianInfo renders the top section of the prescription card.
 */
const HospitalAndPhysicianInfo = ({ hospital, physician, darkMode = false }) => (
  <div className={`flex justify-between items-start mb-8 border-b pb-6 ${darkMode ? 'border-slate-800' : 'border-gray-100'}`}>
    <div>
      <h2 className={`text-xl font-bold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>{hospital.name}</h2>
      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{hospital.address}</p>
      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{hospital.phone} | {hospital.email}</p>
    </div>
    <div className="text-right">
      <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Physician Details</p>
      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{physician.name}</h3>
      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{physician.specialty}</p>
      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>NPI: {physician.npi}</p>
    </div>
  </div>
);

/**
 * PatientInfoBar highlights the patient's basic details.
 */
const PatientInfoBar = ({ patient, darkMode = false }) => (
  <div className={`rounded-lg p-4 flex mb-8 ${darkMode ? 'bg-blue-950/50' : 'bg-blue-50'}`}>
    <div className="flex-1">
      <p className={`text-xs font-semibold uppercase mb-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Patient Name</p>
      <p className={`font-medium ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>{patient.name}</p>
    </div>
    <div className="flex-1">
      <p className={`text-xs font-semibold uppercase mb-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Date of Birth</p>
      <p className={`font-medium ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>{patient.dob}</p>
    </div>
  </div>
);

/**
 * MedicationTable renders the list of prescribed medications.
 */
const MedicationTable = ({ medications, darkMode = false }) => (
  <div className="mb-8">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className={darkMode ? 'bg-blue-950/40' : 'bg-blue-100/50'}>
          <th className={`py-3 px-4 text-xs font-bold uppercase ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Medicine Name</th>
          <th className={`py-3 px-4 text-xs font-bold uppercase ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Dosage</th>
          <th className={`py-3 px-4 text-xs font-bold uppercase ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Frequency</th>
          <th className={`py-3 px-4 text-xs font-bold uppercase ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Duration</th>
        </tr>
      </thead>
      <tbody className={darkMode ? 'divide-y divide-slate-800' : 'divide-y divide-gray-100'}>
        {medications.map((med) => (
          <tr key={med.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
            <td className="py-4 px-4">
              <p className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{med.name}</p>
              <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{med.type}</p>
            </td>
            <td className={`py-4 px-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>{med.dosage}</td>
            <td className={`py-4 px-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>{med.frequency}</td>
            <td className={`py-4 px-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>{med.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * DoctorInstructions displays specific advice from the physician.
 */
const DoctorInstructions = ({ instructions, darkMode = false }) => (
  <div className={`border rounded-lg p-5 mb-12 ${darkMode ? 'bg-blue-950/30 border-blue-900' : 'bg-blue-50/70 border-blue-100'}`}>
    <p className={`text-xs font-bold uppercase mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Doctor's Instructions</p>
    <ul className={`list-disc pl-5 space-y-1 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
      {instructions.map((inst, index) => (
        <li key={index}>{inst}</li>
      ))}
    </ul>
  </div>
);

/**
 * PrescriptionCardFooter shows the ID and signature details.
 */
const PrescriptionCardFooter = ({ prescriptionId, physicianName, signedDate, darkMode = false }) => (
  <div className={`flex justify-between items-end border-t pt-6 ${darkMode ? 'border-slate-800' : 'border-gray-100'}`}>
    <div>
      <p className={`text-xs font-semibold uppercase mb-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Prescription ID</p>
      <p className={`font-bold tracking-wide ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>{prescriptionId}</p>
    </div>
    <div className="text-right flex flex-col items-end">
      <div className={`mb-2 border px-4 py-2 rounded ${darkMode ? 'border-blue-900 bg-blue-950/40' : 'border-blue-100 bg-blue-50/30'}`}>
        <span className={`font-script italic opacity-80 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>{physicianName}</span>
      </div>
      <p className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-gray-800'}`}>Electronically Signed by {physicianName.split(',')[0]}</p>
      <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Date: {signedDate}</p>
    </div>
  </div>
);

/**
 * PharmacyForwarding allows sending the prescription directly to the pharmacy.
 */
const PharmacyForwarding = ({ darkMode = false }) => (
  <div className={`rounded-xl p-6 flex items-center justify-between shadow-sm ${darkMode ? 'bg-blue-950/40 border border-blue-900' : 'bg-blue-100/60'}`}>
    <div>
      <h3 className={`font-bold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>Ready for pickup?</h3>
      <p className={`text-sm ${darkMode ? 'text-blue-200/80' : 'text-blue-800'}`}>Forward this prescription to our in-house pharmacy for 15-minute fulfillment.</p>
    </div>
    <button className={`font-medium py-3 px-6 rounded-lg transition-colors shadow-sm text-white ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-700 hover:bg-blue-800'}`}>
      Forward to In-house Pharmacy
    </button>
  </div>
);

// --- Main Page Component ---

/**
 * DigitalPrescription Page
 * 
 * Assembles the digital prescription view using modular components.
 * This structure improves readability, maintainability, and testability.
 */
/**
 * DigitalPrescription Page
 *
 * Assembles the digital prescription view using modular components.
 * Uses the same Sidebar + Topbar + Footer chrome as every other patient
 * page, so navigation and the dark-mode/profile/settings icons are
 * consistent everywhere.
 */
const DigitalPrescription = ({
  activeTab: activeNav,
  setActiveTab: setActiveNav,
  darkMode = false,
  setDarkMode = () => {},
}) => {
  // In a real app, you would use useEffect/SWR/React Query to fetch `prescriptionData` here
  const data = prescriptionData;

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-slate-800'
      }`}
    >
      <Sidebar activeTab={activeNav} setActiveTab={setActiveNav} darkMode={darkMode} />

      <div className="flex-1 flex flex-col">
        <Topbar
          title="Prescriptions"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onProfileClick={() => setActiveNav && setActiveNav('settings')}
          onSettingsClick={() => setActiveNav && setActiveNav('settings')}
        />

        <main className="flex-1 px-4 py-8 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-4xl">
            <PageHeader date={data.issuedDate} darkMode={darkMode} />

            {/* Main Prescription Card */}
            <div
              className={`rounded-xl shadow-sm border p-8 mb-6 relative transition-colors ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
              }`}
            >
              <HospitalAndPhysicianInfo hospital={data.hospital} physician={data.physician} darkMode={darkMode} />
              <PatientInfoBar patient={data.patient} darkMode={darkMode} />
              <MedicationTable medications={data.medications} darkMode={darkMode} />
              <DoctorInstructions instructions={data.instructions} darkMode={darkMode} />
              <PrescriptionCardFooter
                prescriptionId={data.prescriptionId}
                physicianName={data.physician.name}
                signedDate={data.signedDate}
                darkMode={darkMode}
              />
            </div>

            {/* Legal Disclaimer */}
            <p className={`text-center text-sm max-w-2xl mx-auto mb-6 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              This is a legally binding digital prescription. For your safety, the original record is stored securely in the MedSys cloud and is accessible by licensed pharmacists via the QR code or ID provided.
            </p>

            <PharmacyForwarding darkMode={darkMode} />
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default DigitalPrescription;
