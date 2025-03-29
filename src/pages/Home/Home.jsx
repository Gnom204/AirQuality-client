// pages/Home/Home.jsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Missions from '../../components/Missions/Missions';
import './Home.css';
import { getLocations } from '../../utils/api';
import SensorChart from '../../components/SensorChart/SensorChart';
import CentralNodeComponent from '../../components/BigCircle/BigCircle';

const Home = () => {
  const navigate = useNavigate();
  const [allLocations, setAllLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    getLocations().then((locations) => {
      setAllLocations(locations);
      if (locations.length > 0) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        setLocation(randomLocation);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRandomLocation = () => {
    const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
    setLocation(randomLocation);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const filtered = allLocations.filter(loc =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsSuggestionsOpen(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  };

  const handleSuggestionClick = (location) => {
    navigate(`/location/${location._id}`);
    window.scrollTo(0, 0);
    setSearchTerm(location.name);
    setIsSuggestionsOpen(false);
  };

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">Ваш надежный источник данных</h1>
        <h1 className='highlight-text'>о качестве воздуха</h1>
        <p className='home__desc'>Наш сайт предоставляет актуальные данные о чистоте воздуха, влажности и уровне шума в жилых комплексах. Используйте наш удобный интерфейс для быстрого поиска информации и анализа состояния окружающей среды</p>
        <button className="home__cta" onClick={() => navigate('/ratings')}>Узнать больше</button>
      </section>
      
      <section className="home__search">
        <h2 className="home__subtitle">Поиск информации о жилых комплексах</h2>
        <div className="search-box" ref={searchBoxRef}>
          <input 
            type="text" 
            placeholder="Введите название ЖК" 
            className="search__input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {isSuggestionsOpen && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(location => (
                <li
                  key={location.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(location)}
                >
                  {location.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className='section-border'></div>

      <section className="home__mission">
        <h2 className="home__subtitle">Наши цели</h2>
        <Missions />
      </section>

      <section className="home__about">
        <h2 className="home__subtitle">Компоненты станции для оценки комфорта</h2>
        <div className='home__about-grid'>
          <div className="home__about-grid-info">
            <h3 className="home__about-title">Датчики</h3>
            <p className="home__about-text">Для оценки качествa воздуха в жилом комплексе используются наиболее чувствительные и точные датчики:</p>
            <ul className="home__about-list">
              <li className="home__about-list-item">MQ-135 - датчик качествa воздуха</li>
              <li className="home__about-list-item">GP2Y1010AU0F - датчик пыли</li>
              <li className="home__about-list-item">KY-038 - микрофон для измерения уровня шума</li>
              <li className="home__about-list-item">DHT11 - датчик температуры и влажности</li>
            </ul>
            <p className='home__about-article-text'>Нажмите или наведитесь на датчик, чтобы узнать подробную информацию о нем</p>
          </div>
        <CentralNodeComponent/>
        </div>
        </section>

      {location && (
        <div className="home__data">
        <h2 className="home__subtitle">Примерные данные о районе {location.name}</h2>
        <button className="home__data-button" onClick={getRandomLocation}>Случайный район</button>
        <div className="home__data-grid">
          <div className="data-card">
            <SensorChart dataValues={location.gas} parameterName="Качество воздуха" unit="ppm" color="#4dc9f6" showPoints={true} />
          </div>
          <div className="data-card">
            <SensorChart dataValues={location.humidity} parameterName="Влажность" unit="%" color="#4dc9f6" showPoints={true} />
          </div>
          <div className="data-card">
            <SensorChart dataValues={location.sound.map(value => value / 12)} parameterName="Уровень шума" unit="дБ" color="#4dc9f6" showPoints={true} />
          </div>
        <div className="data-card">
            <SensorChart dataValues={location.dust} parameterName="Наличие пыли" unit="мг/м^3" color="#4dc9f6" showPoints={true} />
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;
