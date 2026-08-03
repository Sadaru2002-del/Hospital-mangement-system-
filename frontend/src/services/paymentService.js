const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Process a new payment transaction
 */
export const processPayment = async (paymentData, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Payment processing failed');
  }

  return response.json();
};

/**
 * Fetch logged-in user's payment records
 */
export const fetchMyPayments = async (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/payments/my`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch payment history');
  }

  return response.json();
};

/**
 * Fetch patient billing summary
 */
export const fetchBillingSummary = async (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/payments/summary`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch billing summary');
  }

  return response.json();
};

/**
 * Fetch all payments (Admin / Staff)
 */
export const fetchAllPayments = async (token, filters = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const queryParams = new URLSearchParams();
  Object.keys(filters).forEach((key) => {
    if (filters[key]) queryParams.append(key, filters[key]);
  });

  const queryString = queryParams.toString();
  const url = `${API_URL}/payments${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch payments list');
  }

  return response.json();
};
