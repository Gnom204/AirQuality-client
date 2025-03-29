import React from 'react';
import './Missions.css';

const missions = [
  {
    title: "Прозрачность качества воздуха",
    icon: "🌍",
    description: "Создавать прозрачность в вопросах качества воздуха, предоставляя актуальные данные для улучшения здоровья и благополучия общества."
  },
  {
    title: "Забота о здоровье",
    icon: "💚",
    description: "Служить надежным источником данных о качестве воздуха, чтобы каждый мог дышать чистым воздухом и заботиться о своем здоровье."
  },
  {
    title: "Здоровый образ жизни",
    icon: "🏃‍♂️",
    description: "Содействовать формированию здорового образа жизни, предоставляя информацию о качестве воздуха в реальном времени для повышения осведомленности населения."
  },
];

const Missions = () => {
  return (
    <div className="missions-container">
      {missions.map((mission, index) => (
        <div className="mission-card" key={index}>
          <div className="mission-icon">{mission.icon}</div>
          <h3 className="mission-title">{mission.title}</h3>
          <p className="mission-description">{mission.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Missions;