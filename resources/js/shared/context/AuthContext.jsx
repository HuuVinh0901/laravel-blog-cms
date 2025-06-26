import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, logoutUser } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setUser(null); // Đặt user về null nếu bị từ chối
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null); 
    } catch (err) {
      console.error('Lỗi khi gọi API logout:', err);
      setUser(null);
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);