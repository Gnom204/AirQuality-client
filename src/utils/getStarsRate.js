/**
 * Вычисляет рейтинг на основе массива звезд
 * @function
 * @param {number[]} stars - Массив оценок в виде звезд
 * @returns {string} Средний рейтинг, округленный до одного знака после запятой
 */
function calculateRate(stars) {
  const sum = stars.reduce((acc, curr) => acc + curr, 0);
  return (sum / stars.length).toFixed(1);
}

export default calculateRate;
