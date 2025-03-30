import React from 'react';
import calculateAirQuality from '../../utils/getRate';

// Компонент QualityIndex
const QualityIndex = ({ gas, dust, humidity, sound }) => {
//   const calculateQualityIndex = (gas, dust, humidity, sound) => {
//     // Применяем деление на 12 к каждому значению звука
//     const adjustedSound = sound.map(value => value / 12);

//     // Расчет оценок для каждого параметра
//     const gasScore = Math.max(0, Math.min(10, 10 - (gas.reduce((a, b) => a + b, 0) / gas.length) / 1)); // Нормируем на 1 ppm
//     const dustScore = Math.max(0, Math.min(10, 10 - (dust.reduce((a, b) => a + b, 0) / dust.length * 100))); // Приводим к мг/м^3
//     const avgHumidity = humidity.reduce((a, b) => a + b, 0) / humidity.length;
//     const humidityScore = Math.max(0, Math.min(10, (avgHumidity - 30) / 4)); // 30-70%
//     const soundScore = Math.max(0, Math.min(10, 10 - (adjustedSound.reduce((a, b) => a + b, 0) / adjustedSound.length / 5))); // Децибелы
// console.log({gasScore, dustScore, humidityScore, soundScore});
//     // Среднее значение оценки
//     const averageScore = (gasScore + dustScore + humidityScore + soundScore) / 4;
//     return Math.round(averageScore);
// };

    // const qualityIndex = calculateQualityIndex(gas, dust, humidity, sound);
const qualityIndex = calculateAirQuality(humidity, sound, dust, gas);    
    let backgroundColor;
    if (qualityIndex >= 7) {
        backgroundColor = '#8bc34a'; 
    } else if (qualityIndex >= 4) {
        backgroundColor = '#f7dc6f'; 
    } else {
        backgroundColor = '#e53935'; 
    }

    return (
        <div style={{ backgroundColor, padding: '20px', color: 'white', borderRadius: '5px' }}>
            Индекс качества: {qualityIndex}/10
        </div>
    );
};

export default QualityIndex;