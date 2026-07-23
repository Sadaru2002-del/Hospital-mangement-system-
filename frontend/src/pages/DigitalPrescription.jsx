import React from 'react';
import { Search, Moon, User, Settings, Printer, Download } from 'lucide-react';

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
 * TopNavigation handles the top app bar specific to the prescriptions view.
 */
const TopNavigation = () => (
  <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
    <div className="text-2xl font-bold text-blue-900">
      Prescriptions
    </div>
    <div className="relative w-1/3">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
    </div>
    <div className="flex space-x-4">
      <button aria-label="Toggle dark mode" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
        <Moon className="w-5 h-5" />
      </button>
      <button aria-label="User profile" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
        <User className="w-5 h-5" />
      </button>
      <button aria-label="Settings" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  </header>
);

/**
 * PageHeader displays the page title and primary actions (Print/Download).
 */
const PageHeader = ({ date }) => (
  <div className="flex justify-between items-end mb-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Digital Prescription</h1>
      <p className="text-gray-600 mt-1">Issued on {date}</p>
    </div>
    <div className="flex space-x-3">
      <button className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-md transition-colors font-medium">
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
      <button className="flex items-center space-x-2 bg-blue-200 hover:bg-blue-300 text-blue-900 py-2 px-4 rounded-md transition-colors font-medium">
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>
    </div>
  </div>
);

/**
 * HospitalAndPhysicianInfo renders the top section of the prescription card.
 */
const HospitalAndPhysicianInfo = ({ hospital, physician }) => (
  <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-1">{hospital.name}</h2>
      <p className="text-gray-500 text-sm">{hospital.address}</p>
      <p className="text-gray-500 text-sm">{hospital.phone} | {hospital.email}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold text-blue-600 mb-1">Physician Details</p>
      <h3 className="text-lg font-bold text-gray-900">{physician.name}</h3>
      <p className="text-gray-500 text-sm">{physician.specialty}</p>
      <p className="text-gray-500 text-sm">NPI: {physician.npi}</p>
    </div>
  </div>
);

/**
 * PatientInfoBar highlights the patient's basic details.
 */
const PatientInfoBar = ({ patient }) => (
  <div className="bg-blue-50 rounded-lg p-4 flex mb-8">
    <div className="flex-1">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Patient Name</p>
      <p className="text-gray-900 font-medium">{patient.name}</p>
    </div>
    <div className="flex-1">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Date of Birth</p>
      <p className="text-gray-900 font-medium">{patient.dob}</p>
    </div>
  </div>
);

/**
 * MedicationTable renders the list of prescribed medications.
 */
const MedicationTable = ({ medications }) => (
  <div className="mb-8">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-blue-100/50">
          <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase">Medicine Name</th>
          <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase">Dosage</th>
          <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase">Frequency</th>
          <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase">Duration</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {medications.map((med) => (
          <tr key={med.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4">
              <p className="font-bold text-blue-700">{med.name}</p>
              <p className="text-xs text-gray-500">{med.type}</p>
            </td>
            <td className="py-4 px-4 text-gray-800">{med.dosage}</td>
            <td className="py-4 px-4 text-gray-800">{med.frequency}</td>
            <td className="py-4 px-4 text-gray-800">{med.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * DoctorInstructions displays specific advice from the physician.
 */
const DoctorInstructions = ({ instructions }) => (
  <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-5 mb-12">
    <p className="text-xs font-bold text-blue-800 uppercase mb-2">Doctor's Instructions</p>
    <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
      {instructions.map((inst, index) => (
        <li key={index}>{inst}</li>
      ))}
    </ul>
  </div>
);

/**
 * PrescriptionCardFooter shows the ID and signature details.
 */
const PrescriptionCardFooter = ({ prescriptionId, physicianName, signedDate }) => (
  <div className="flex justify-between items-end border-t border-gray-100 pt-6">
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Prescription ID</p>
      <p className="text-gray-900 font-bold tracking-wide">{prescriptionId}</p>
    </div>
    <div className="text-right flex flex-col items-end">
      <div className="mb-2 border border-blue-100 bg-blue-50/30 px-4 py-2 rounded">
        <span className="font-script text-blue-800 italic opacity-80">{physicianName}</span>
      </div>
      <p className="text-xs text-gray-800 font-medium">Electronically Signed by {physicianName.split(',')[0]}</p>
      <p className="text-xs text-gray-500">Date: {signedDate}</p>
    </div>
  </div>
);

/**
 * PharmacyForwarding allows sending the prescription directly to the pharmacy.
 */
const PharmacyForwarding = () => (
  <div className="bg-blue-100/60 rounded-xl p-6 flex items-center justify-between shadow-sm">
    <div>
      <h3 className="font-bold text-blue-900 mb-1">Ready for pickup?</h3>
      <p className="text-blue-800 text-sm">Forward this prescription to our in-house pharmacy for 15-minute fulfillment.</p>
    </div>
    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm">
      Forward to In-house Pharmacy
    </button>
  </div>
);

/**
 * PageFooter displays legal links and copyright.
 */
const PageFooter = () => (
  <footer className="w-full bg-white border-t border-gray-200 py-4 px-6 flex justify-between items-center text-xs text-gray-500 mt-auto">
    <div>© {new Date().getFullYear()} CareConnect Health Systems. All rights reserved.</div>
    <div className="flex space-x-4">
      <a href="#privacy" className="hover:text-gray-800 transition-colors">Privacy</a>
      <a href="#terms" className="hover:text-gray-800 transition-colors">Terms</a>
      <a href="#audit" className="hover:text-gray-800 transition-colors">Audit Log</a>
    </div>
  </footer>
);

// --- Main Page Component ---

/**
 * DigitalPrescription Page
 * 
 * Assembles the digital prescription view using modular components.
 * This structure improves readability, maintainability, and testability.
 */
const DigitalPrescription = () => {
  // In a real app, you would use useEffect/SWR/React Query to fetch `prescriptionData` here
  const data = prescriptionData;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <TopNavigation />

      <main className="w-full max-w-4xl px-4 py-8 flex-grow">
        <PageHeader date={data.issuedDate} />

        {/* Main Prescription Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6 relative">
          <HospitalAndPhysicianInfo hospital={data.hospital} physician={data.physician} />
          <PatientInfoBar patient={data.patient} />
          <MedicationTable medications={data.medications} />
          <DoctorInstructions instructions={data.instructions} />
          <PrescriptionCardFooter 
            prescriptionId={data.prescriptionId}
            physicianName={data.physician.name}
            signedDate={data.signedDate}
          />
        </div>

        {/* Legal Disclaimer */}
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mb-6">
          This is a legally binding digital prescription. For your safety, the original record is stored securely in the MedSys cloud and is accessible by licensed pharmacists via the QR code or ID provided.
        </p>

        <PharmacyForwarding />
      </main>

      <PageFooter />
    </div>
  );
};

export default DigitalPrescription;
