import { useEffect, useState } from 'react';
import './Ratings.css';
import { getLocations, IMAGE_URL } from '../../utils/api';
import calculateAirQuality from '../../utils/getRate';
import calculateRate from '../../utils/getStarsRate';
import { useNavigate } from 'react-router-dom';
import QualityIndex from '../../components/QualityIndex/QualitiIndex';

const Ratings = () => {
  const [complexes, setComplexes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('rating');
  const navigate = useNavigate();


  useEffect(() => {
    getLocations().then((locations) => setComplexes(locations));
  }, []);

  const getFilteredAndSortedComplexes = () => {
    return complexes
      .filter(complex => 
        complex.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortType === 'airQuality') {
          const aQuality = calculateAirQuality(a.humidity, a.sound, a.dust, a.gas);
          const bQuality = calculateAirQuality(b.humidity, b.sound, b.dust, b.gas);
          return bQuality - aQuality;
        } else {
          const aRating = a.starsRatings.length > 0 ? calculateRate(a.starsRatings) : 0;
          const bRating = b.starsRatings.length > 0 ? calculateRate(b.starsRatings) : 0;
          return bRating - aRating;
        }
      });
  };

const getMore = (id) => {
  navigate('/location/' + id);
}


  return (
    <div className="ratings-container">
      <h1 className="ratings-title">Рейтинг жилых комплексов</h1>
      
      <div className="ratings-filters">
        <input 
          type="text" 
          placeholder="Поиск по названию" 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="filter-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="rating">Сортировка по рейтингу</option>
          <option value="airQuality">Сортировка по качеству воздуха</option>
        </select>
      </div>
      
{console.log(complexes)}
      <div className="complexes-list">
      {getFilteredAndSortedComplexes().map((complex, index) => (
          <div key={index} className="complex-card">
            <div className="complex-header">
              <div className='complex-info'>
              {complex.image && <img className='complex-image' src={IMAGE_URL + complex.image} alt={complex.name} />}
              <h3>{complex.name}</h3>
              </div>
              <div className="complex-ratings">
              <QualityIndex gas={complex.gas.map((value, index, array) => {
              if (index === 0 || value / 15 > array[index - 1] / 15 * 1.5) {
                return value / 15;
              }
              return null;
            }).filter(Boolean)} dust={complex.dust} sound={complex.sound.map(value => Math.abs(value) / 15)} humidity={complex.humidity} />              { <span>Рейтинг экспертов: ⭐{complex.starsRatings.length > 0 ? calculateRate(complex.starsRatings) : 'Нет оценок'}</span>}
              </div>
            </div>
            
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Концентрация CO2</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill air-quality" 
                    style={{ width: `${complex.gas.reduce((acc, cur) => acc + cur) / complex.gas.length}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="metric-item">
                <span className="metric-label">Влажность</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill humidity" 
                    style={{ width: `${complex.humidity.reduce((acc, cur) => acc + cur) / complex.humidity.length}%` }}
                  ></div>
                </div>
              </div>

              <div className="metric-item">
                <span className="metric-label">Уровень шума</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill noise" 
                    style={{ width: `${complex.sound.map(value => Math.abs(value) / 15).reduce((acc, cur) => acc + cur) / complex.sound.length}%` }}
                  ></div>
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Количество пыли</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill dust" 
                    style={{ width: `${complex.dust.reduce((acc, cur) => acc + cur) / complex.dust.length}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <button onClick={() => getMore(complex._id)} className="details-button">Подробнее</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
