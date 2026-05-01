const API_URL = 'http://localhost:5001/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  }
};

// Rider API calls
export const riderAPI = {
  getAllRiders: async () => {
    const response = await fetch(`${API_URL}/riders`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  getActiveRiders: async () => {
    const response = await fetch(`${API_URL}/riders/active`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  addRider: async (riderData) => {
    const response = await fetch(`${API_URL}/riders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(riderData),
    });
    return handleResponse(response);
  },

  updateRider: async (riderId, riderData) => {
    const response = await fetch(`${API_URL}/riders/${riderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(riderData),
    });
    return handleResponse(response);
  },

  updateLocation: async (riderId, coordinates) => {
    const response = await fetch(`${API_URL}/riders/${riderId}/location`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ coordinates }),
    });
    return handleResponse(response);
  }
}; 