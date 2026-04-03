import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is still valid
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Token invalid');
      })
      .then(data => {
        onAuthSuccess(data.user, token);
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, [onAuthSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store token
      localStorage.setItem('token', data.token);
      
      setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');
      
      // Call success callback after a short delay
      setTimeout(() => {
        onAuthSuccess(data.user, data.token);
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Join the Adventure'}
          </h1>
          <p className="text-gray-300">
            {isLogin 
              ? 'Login to continue your coding journey' 
              : 'Start your coding adventure today'}
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-3 rounded-lg mb-6 text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
                      placeholder="Enter your last name"
                    />
                  </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-white/20"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder={isLogin ? 'Enter your password' : 'Create a password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isLogin ? 'Logging in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {isLogin ? 'Login' : 'Sign Up'}
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-2 text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Game Features Preview */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="text-center text-gray-300 text-sm">
            <p className="mb-2">🎮 Features:</p>
            <div className="flex justify-center gap-4 text-xs">
              <span>⚔️ RPG Battles</span>
              <span>🧙‍♂️ 4 Heroes</span>
              <span>🏰 12 Dungeons</span>
              <span>📊 Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
