import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((userData) => {
    localStorage.setItem('authToken', userData.token);
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      // Здесь можно добавить запрос для проверки токена
      // Например: fetchUserData().then(login).catch(logout)
      setIsLoggedIn(true);
    }
  }, [user, login, logout]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};