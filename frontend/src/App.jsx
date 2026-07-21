import React from 'react';
import PatientLayout from './layouts/PatientLayout';
import Records from './pages/patient/Records';

function App() {
  return (
    <PatientLayout activeTab="records">
      <Records />
    </PatientLayout>
  );
}

export default App;
