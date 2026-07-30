const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch appointments (user specific or all if admin/doctor, supports filtering parameters)
 */
export const fetchAppointments = async (token, params = {}) => {
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
  const url = `${API_URL}/appointments${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch appointments');
  }

  return response.json();
};

/**
 * Fetch logged-in user's appointments
 */
export const fetchMyAppointments = async (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/appointments/my`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch user appointments');
  }

  return response.json();
};

/**
 * Create a new appointment
 */
export const createAppointment = async (appointmentData, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to book appointment');
  }

  return response.json();
};

/**
 * Update an existing appointment
 */
export const updateAppointment = async (id, updateData, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update appointment');
  }

  return response.json();
};

/**
 * Cancel an appointment (Soft cancellation)
 */
export const cancelAppointment = async (id, cancellationReason, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/appointments/${id}/cancel`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ cancellationReason }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to cancel appointment');
  }

  return response.json();
};

/**
 * Delete / hard cancel an appointment
 */
export const deleteAppointment = async (id, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete appointment');
  }

  return response.json();
};


