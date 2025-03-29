function calculateRate(stars) {
  const sum = stars.reduce((acc, curr) => acc + curr, 0);
  return (sum / stars.length).toFixed(1);
}

export default calculateRate;
