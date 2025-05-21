import { useEffect, useState } from 'react'
import { getLocationById, IMAGE_URL } from '../../utils/api';
import { useParams } from 'react-router-dom';
import SensorChart from '../../components/SensorChart/SensorChart';
import './BigLocation.css';
import QualityIndex from '../../components/QualityIndex/QualitiIndex';
import calculateRate from '../../utils/getStarsRate';
import normalizeAndSmoothGroups from '../../utils/smoothArray';

function BigLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocationById(id).then((location) => setLocation(location));
  }, [id]);

  return (
    <div>
      {location && (
        <div className="location-details">
          <div className='location-info'>
            <h2 className='location-name'>{location.name}</h2>
          <p className='location-description'>{location.description}</p>
          <div className='location-parameters'>
            <QualityIndex gas={location.gas.map((value, index, array) => {
              if (index === 0 || value / 15 > array[index - 1] / 15 * 1.5) {
                return value / 15;
              }
              return null;
            }).filter(Boolean)} dust={location.dust} sound={location.sound.map(value => Math.abs(value) / 15)} humidity={location.humidity} />
            <div>Оценка экспертов: ⭐{location.starsRatings.length > 0 ? calculateRate(location.starsRatings) : 'Нет оценок'}</div>
          </div>
          </div>
          <div className='location-image'>
          <img src={IMAGE_URL + `${location.image}`} alt={location.name} />
          </div>
        </div>
      )}
      <div className='location-charts'>
      <SensorChart dataValues={location?.gas} parameterName={'Качество воздуха'} unit={'ppm'} color={'#4dc9f6'} showPoints={true} />
      <SensorChart dataValues={location?.dust} parameterName={'Наличие пыли'} unit={'мг/м^3'} color={'#4dc9f6'} showPoints={true} />
      <SensorChart dataValues={location?.sound && normalizeAndSmoothGroups(location?.sound)} parameterName={'Уровень шума'} unit={'дБ'} color={'#4dc9f6'} showPoints={true} />
      <SensorChart dataValues={location?.humidity} parameterName={'Влажность воздуха'} unit={'%'} color={'#4dc9f6'} showPoints={true} />
      </div>
    </div>
  )
}

export default BigLocation