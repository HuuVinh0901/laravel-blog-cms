import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log('Current user:', res.data);
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };
  const logout = () => {
    setUser(null);
    // Gọi API logout nếu cần
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
