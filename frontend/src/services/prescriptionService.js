const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all digital prescriptions (with optional query filters: patientId, doctorId, status, prescriptionId)
 */
export const fetchPrescriptions = async (token, params = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const queryParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      queryParams.append(key, params[key]);
    }
  });

  const queryString = queryParams.toString();
  const url = `${API_URL}/prescriptions${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch prescriptions');
  }

  return response.json();
};

/**
 * Fetch logged-in patient's digital prescriptions
 */
export const fetchMyPrescriptions = async (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/prescriptions/my-prescriptions`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch user prescriptions');
  }

  return response.json();
};

/**
 * Fetch single prescription by ID or RX identifier
 */
export const fetchPrescriptionById = async (id, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/prescriptions/${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch prescription details');
  }

  return response.json();
};

/**
 * Create a new digital prescription (Doctor/Staff/Admin)
 */
export const createPrescription = async (prescriptionData, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/prescriptions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(prescriptionData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create digital prescription');
  }

  return response.json();
};

/**
 * Forward prescription to in-house pharmacy
 */
export const forwardPrescriptionToPharmacy = async (id, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/prescriptions/${id}/forward`, {
    method: 'PUT',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to forward prescription to pharmacy');
  }

  return response.json();
};

/**
 * Update an existing prescription
 */
export const updatePrescription = async (id, updateData, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/prescriptions/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update prescription');
  }

  return response.json();
};

/**
 * Delete / Cancel a prescription
 */
export const deletePrescription = async (id, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/prescriptions/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete prescription');
  }

  return response.json();
};
