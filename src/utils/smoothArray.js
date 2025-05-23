/**
 * @function normalizeAndSmoothGroups
 * @description Нормализует и сглаживает группы чисел в массиве.
 * @param {number[]} arr - Массив чисел для нормализации и сглаживания.
 * @param {number} [targetMin=30] - Минимальное значение в целевом диапазоне.
 * @param {number} [targetMax=80] - Максимальное значение в целевом диапазоне.
 * @param {number} [groupSize=10] - Размер группы для сглаживания.
 * @returns {number[]} Нормализованный и сглаженный массив.
 */
function normalizeAndSmoothGroups(
  arr,
  targetMin = 30,
  targetMax = 80,
  groupSize = 10
) {
  if (arr.length === 0) return arr;

  const srcMin = Math.min(...arr);
  const srcMax = Math.max(...arr);
  const normalized =
    srcMin === srcMax
      ? arr.map(() => targetMin)
      : arr.map(
          (num) =>
            ((num - srcMin) / (srcMax - srcMin)) * (targetMax - targetMin) +
            targetMin
        );

  const smoothed = [];
  for (let i = 0; i < normalized.length; i += groupSize) {
    const group = normalized.slice(i, i + groupSize);
    const avg =
      Math.round(
        (group.reduce((sum, x) => sum + x, 0) / group.length) * 10 + 5
      ) / 10;

    for (let j = 0; j < group.length; j++) {
      if (i === 0 && j === 0) {
        smoothed.push(avg); // Первый элемент
      } else {
        const prevVal = smoothed[smoothed.length - 1];
        smoothed.push(
          Math.round((prevVal + (avg - prevVal) * 0.3) * 10 + 5) / 10
        );
      }
    }
  }

  return smoothed
    .slice(0, arr.length)
    .map((num) => Math.max(targetMin, Math.min(targetMax, num)));
}

export default normalizeAndSmoothGroups;
