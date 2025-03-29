import React from 'react';
import './SensorChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorChart = ({ 
  dataValues,
  parameterName = 'Parameter',
  unit = '',
  color = '#4dc9f6',
  showPoints = true
}) => {
  // Преобразование данных в подходящий формат
  const chartData = {
    labels: Array.isArray(dataValues) 
      ? dataValues.map((_, i) => i + 1) 
      : [1],
    datasets: [{
      label: parameterName,
      data: Array.isArray(dataValues) ? dataValues : [dataValues],
      borderColor: color,
      backgroundColor: color + '80',
      borderWidth: 2,
      pointRadius: showPoints ? 4 : 0,
      tension: 0.4,
      fill: false
    }]
  };

  // Конфигурация графика
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: parameterName,
        padding: 20,
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.raw} ${unit}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Временные точки',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: unit,
          font: {
            weight: 'bold'
          }
        },
        grid: {
          color: '#eee'
        }
      }
    }
  };

  return (
    <div className="sensor-chart">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SensorChart;

