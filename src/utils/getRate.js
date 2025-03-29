function calculateAirQuality(
  humidityValues,
  soundValues,
  dustValues,
  gasValues
) {
  // Нормативные значения
  // const DUST_NORM = 0.025; // мг/м³ (PM2.5 по ВОЗ)
  const GAS_NORM = 50; // ppm (для бытовых газов)
  const HUMIDITY_IDEAL = 45; // идеальная влажность
  const SOUND_NORM = 55; // дБ

  // Рассчитываем компоненты оценки
  const dustPenalty = Math.sqrt(
    (dustValues.reduce((a, b) => a + b) / dustValues.length) * 10
  );
  const gasPenalty =
    gasValues.reduce((a, b) => a + b) / gasValues.length / GAS_NORM;
  const humidityDiff =
    Math.abs(
      humidityValues.reduce((a, b) => a + b) / humidityValues.length -
        HUMIDITY_IDEAL
    ) / 20;
  const soundPenalty =
    soundValues.reduce((a, b) => a + b) / soundValues.length / 12 > SOUND_NORM
      ? (soundValues.reduce((a, b) => a + b) / soundValues.length / 12 -
          SOUND_NORM) /
        10
      : 0;

  // Итоговая оценка с ограничением от 1 до 10
  let score = 10 - (dustPenalty + gasPenalty + humidityDiff + soundPenalty);

  return Math.min(Math.max(score.toFixed(1), 1), 10);
}

export default calculateAirQuality;
