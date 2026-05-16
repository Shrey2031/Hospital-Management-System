// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';


// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const initAuth = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // ✅ Verify token with API
//         const response = await axios.get('http://localhost:3000/api/v1/users/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         setUser(response.data.user);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       } catch (error) {
//         // ✅ Token invalid → Clear storage
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setToken(null);
//         setUser(null);
//         delete axios.defaults.headers.common['Authorization'];
//       } finally {
//         setLoading(false); // ✅ Always stop loading
//       }
//     };

//     initAuth();
//   }, []);

//   const login = async (credentials) => {
//   try {
//     console.log('🔐 LOGIN:', credentials.email);
    
//     const res = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
//     console.log('✅ FULL RESPONSE:', res.data);
    
//     // 🔥 FIXED: Correct path for YOUR backend response
//     const accessToken = res.data.data?.accessToken;
    
//     if (!accessToken) {
//       throw new Error('No accessToken in response. Got: ' + JSON.stringify(res.data));
//     }
    
//     console.log('🔑 ACCESS TOKEN FOUND:', accessToken.substring(0, 20) + '...');
    
//     // 🔥 SAVE ACCESS TOKEN
//     localStorage.setItem('token', accessToken);
//     localStorage.setItem('accessToken', accessToken); // Backup
    
//     // 🔥 SET AXIOS HEADERS
//     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
//     // 🔥 SET STATE
//     setToken(accessToken);
//     setUser(res.data.data.user);
    
//     console.log('💾 TOKEN SAVED!');
//     console.log('👤 USER:', res.data.data.user);
    
//     toast.success('Login successful!');
//     navigate('/dashboard');
    
//   } catch (error) {
//     console.error('❌ LOGIN ERROR:', error.response?.data || error.message);
//     toast.error('Login failed: ' + (error.response?.data?.message || error.message));
//     throw error;
//   }
// };

  
//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     setToken(null);
//     navigate('/');
//   };

//   const value = { user, token, login, logout, loading };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // 🔥 REFRESH TOKEN VALIDATION
//   useEffect(() => {
//     const validateToken = async () => {
//       const storedToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
      
//       console.log('🔍 Token check:', !!storedToken);
      
//       if (!storedToken) {
//         setLoading(false);
//         return;
//       }

//       try {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//         setToken(storedToken);

//         const response = await axios.get('http://localhost:3000/api/v1/users/me', {
//           timeout: 5000
//         });
        
//         console.log('✅ Auth validated:', response.data);
//         setUser(response.data.data?.user || response.data.user);
//       } catch (error) {
//         console.error('❌ Token invalid:', error.response?.status);
//         localStorage.removeItem('token');
//         localStorage.removeItem('accessToken');
//         setToken(null);
//         setUser(null);
//         delete axios.defaults.headers.common['Authorization'];
//       } finally {
//         setLoading(false);  // ✅ CRITICAL
//       }
//     };

//     validateToken();
//   }, []);

//   // 🔥 LOGIN FUNCTION
//   const login = async (credentials) => {
//     try {
//       console.log('🔐 Logging in:', credentials.email);
      
//       const res = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
//       console.log('✅ Login response:', res.data);
      
//       const accessToken = res.data.data?.accessToken;
      
//       if (!accessToken) {
//         throw new Error('No accessToken in response');
//       }
      
//       // 🔥 PERSIST TOKEN
//       localStorage.setItem('token', accessToken);
//       localStorage.setItem('accessToken', accessToken);
      
//       // 🔥 SET HEADERS & STATE
//       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//       setToken(accessToken);
//       setUser(res.data.data.user);
      
//       toast.success('Welcome back!');
//       return { success: true };
//     } catch (error) {
//       const message = error.response?.data?.message || 'Login failed';
//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   // 🔥 LOGOUT
//   const logout = useCallback(() => {
//     localStorage.clear();
//     setToken(null);
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//     navigate('/login');
//     toast.success('Logged out');
//   }, [navigate]);

//   const value = {
//     user,
//     token,
//     loading,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;  // ✅ Default export too

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

    const response = await axios.get('http://localhost:3000/api/v1/users/me', {
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

  // const login = async (credentials) => {
  //   try {
  //     console.log('🔐 Logging in:', credentials.email);
      
  //     const res = await axios.post('http://localhost:3000/api/v1/users/login', credentials, {
  //       timeout: 10000
  //     });
      
  //     const accessToken = res.data.data?.accessToken;
      
  //     if (!accessToken) {
  //       throw new Error('No accessToken in response');
  //     }
      
  //     localStorage.setItem('token', accessToken);
  //     localStorage.setItem('accessToken', accessToken);
      
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //     setToken(accessToken);
  //     setUser(res.data.data.user);
      
  //     toast.success('Welcome back!');
  //     return { success: true };
  //   } catch (error) {
  //     const message = error.response?.data?.message || 'Login failed';
  //     toast.error(message);
  //     return { success: false, error: message };
  //   }
  // };

  const login = async (credentials) => {
  try {
    const res = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
    
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
    
    const res = await axios.post('http://localhost:3000/api/v1/users/refresh', {
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