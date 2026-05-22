import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/users`;


  // 🔥 IMPROVED TOKEN VALIDATION WITH BETTER ERROR HANDLING
  useEffect(() => {
    // 🔥 REPLACE your validateToken COMPLETELY:
      // 🔥 REPLACE your validateToken COMPLETELY:
const validateToken = async () => {
  try {
    const storedToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
    
    console.log('🔍 Token check:', !!storedToken, 'Token length:', storedToken?.length);
    
    if (!storedToken) {
      console.log('❌ No token');
      setLoading(false);
      return;
    }

    // Set token FIRST
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    setToken(storedToken); // 🔥 IMMEDIATE
    console.log('✅ Token set:', !!storedToken);

    const response = await axios.get(`${API_BASE_URL}/me`, {
      timeout: 10000
    });
    
    console.log('✅ FULL API RESPONSE:', JSON.stringify(response.data, null, 2));
    
    // 🔥 FORCE USER EXTRACTION - Handle ALL possible structures
    let userData = null;
    
    if (response.data.data?.user) {
      userData = response.data.data.user;
    } else if (response.data.user) {
      userData = response.data.user;
    } else if (response.data.data) {
      userData = response.data.data;
    } else {
      userData = response.data;
    }
    
    console.log('👤 USER EXTRACTED:', userData);
    console.log('👤 Has _id:', !!userData?._id, 'Has id:', !!userData?.id);
    
    // 🔥 FORCE STATE UPDATE
    setUser(userData);
    
    // 🔥 DOUBLE CHECK state updated
    setTimeout(() => {
      console.log('🔄 State AFTER setUser:', { user, token });
    }, 100);
    
  } catch (error) {
    console.error('❌ FAILED:', error.response?.status, error.message);
    localStorage.clear();
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  } finally {
    setLoading(false);
    console.log('🏁 LOADING = FALSE');
  }
};

    validateToken();
  }, []);



  const login = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, credentials);

    const { accessToken, refreshToken } = res.data.data;
    
    // 🔥 STORE BOTH TOKENS
    localStorage.setItem('token', accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken); // 🔥 NEW
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setToken(accessToken);
    setUser(res.data.data.user);
    
    return { success: true };
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    return { success: false };
  }
};

const refreshAuth = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token');
    }
    
    console.log('🔄 Refreshing tokens...');
    
    const res = await axios.post(`${API_BASE_URL}/refresh`, {
      refreshToken
    });
    
    const { accessToken, refreshToken: newRefreshToken } = res.data.data;
    
    // 🔥 UPDATE TOKENS
    localStorage.setItem('token', accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setToken(accessToken);
    
    console.log('✅ Tokens refreshed!');
    return accessToken;
    
  } catch (error) {
    console.error('❌ Refresh failed:', error.response?.status);
    logout(); // Force logout on refresh failure
    throw error;
  }
};

// 🔥 AUTO-REFRESH ON 401
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await refreshAuth();
        // Retry original request with new token
        return axios(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

  const logout = useCallback(() => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login', { replace: true });
    toast.success('Logged out');
  }, [navigate]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    refreshAuth
  };

  // 🔥 SHOW LOADING SCREEN DURING AUTH CHECK
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="text-lg font-semibold text-sky-700">
            Authenticating{token ? ' user...' : ' token...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;