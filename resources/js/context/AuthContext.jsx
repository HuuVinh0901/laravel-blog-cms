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
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Lỗi khi gọi API logout:", err);
    } finally {
      setUser(null);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
