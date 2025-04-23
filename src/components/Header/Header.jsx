import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserByToken } from '../../utils/api';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoading(false);
        return;
      }
  
      try {
        const userData = await getUserByToken(token);
        login(userData);
      } catch (error) {
        console.error("Ошибка проверки токена:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
  
    checkAuth();
  }, [login, logout]); 

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <div>Загрузка...</div>; 
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">AirQuality</Link>
        <div className="header__links">
          <Link to="/ratings" className="header__link">Рейтинг ЖК</Link>
          {user ? (
            <>
              {user.user && user.user.role === 'admin' && (
                <Link to="/admin" className="header__link">Админ-панель</Link>
              )}
              <button className="header__button" onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__link">Вход</Link>
              <Link to="/register" className="header__link">Регистрация</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;