class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
    this.token = localStorage.getItem('token');
  }

  // Set token for authenticated requests
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get headers for requests
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.includeAuth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        this.setToken(null);
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false,
    });
    
    this.setToken(data.token);
    return data;
  }

  async register(userData) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      includeAuth: false,
    });
    
    this.setToken(data.token);
    return data;
  }

  async getCurrentUser() {
    return await this.request('/api/auth/me');
  }

  async updateProfile(profileData) {
    return await this.request('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return await this.request('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // User progress methods
  async getProgress() {
    return await this.request('/api/user/progress');
  }

  async updateProgress(progressData) {
    return await this.request('/api/user/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  // User inventory methods
  async getInventory() {
    return await this.request('/api/user/inventory');
  }

  async addToInventory(item, quantity = 1) {
    return await this.request('/api/user/inventory', {
      method: 'POST',
      body: JSON.stringify({ item, quantity }),
    });
  }

  async removeFromInventory(item) {
    return await this.request(`/api/user/inventory/${encodeURIComponent(item)}`, {
      method: 'DELETE',
    });
  }

  // User stats methods
  async getStats() {
    return await this.request('/api/user/stats');
  }

  async updateCharacter(characterData) {
    return await this.request('/api/user/character', {
      method: 'PUT',
      body: JSON.stringify({ character: characterData }),
    });
  }

  // Leaderboard
  async getLeaderboard() {
    return await this.request('/api/leaderboard', { includeAuth: false });
  }

  // Chat/doubts
  async getDoubts() {
    return await this.request('/api/doubts', { includeAuth: false });
  }

  // Health check
  async healthCheck() {
    return await this.request('/api/health', { includeAuth: false });
  }

  // Logout
  logout() {
    this.setToken(null);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get token
  getToken() {
    return this.token;
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
