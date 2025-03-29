// components/Footer/Footer.jsx
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>© 2025 AirQuality. Все права защищены</p>
        <div className="footer__links">
          <a href="/">О проекте</a>
          <a href="/contact">Контакты</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;