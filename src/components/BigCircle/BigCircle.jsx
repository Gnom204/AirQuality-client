import React, { useState } from 'react';
import arduinoImg from '../../utils/images/aruino.jpg';
import ArduinoEsp from '../../utils/images/ArduinoEsp.webp';
import DHT11 from '../../utils/images/DHT11.webp';
import GP2Y from '../../utils/images/GP2Y.webp';
import KY038 from '../../utils/images/KY038.webp';
import MQ135 from '../../utils/images/MQ-135.webp'; 

import './BigCircle.css';
const CentralNodeComponent = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  
  const nodes = [
    { id: 1, title: "Микроконтроллер", angle: 0, image: ArduinoEsp, info: "Микроконтроллер Arduino с интернет модулем esp8266, который позволяет отправлять данные на сервер" },
    { id: 2, title: "Датчик темепературы и влажности", angle: 72, image: DHT11, info: "Датчик DHT11, который позволяет измерять температуру и влажность воздуха" },
    { id: 3, title: "Датчик пыли", angle: 144, image: GP2Y, info: "Датчик GP2Y, который позволяет измерять уровень пыли в воздухе" },
    { id: 4, title: "Датчик звука", angle: 216, image: KY038, info: "Датчик KY038, который позволяет измерять уровень шума" },
    { id: 5, title: "Датчик воздуха", angle: 288, image: MQ135, info: "Датчик MQ135, который позволяет измерять качество воздуха, концентрацию газов, содержание CO2 и наличие вредных испарений" },
  ];

  return (
    <div className="container">
      <div className="main-circle">
        <img 
          src={arduinoImg} 
          alt="arduino" 
          className="main-image" 
        />
      </div>

      {nodes.map((node) => {
        const radius = 200;
        const angleInRadians = (node.angle - 90) * (Math.PI / 180);
        
        return (
          <div 
            key={node.id}
            className="node-wrapper"
            style={{
              left: `calc(50% + ${radius * Math.cos(angleInRadians)}px)`,
              top: `calc(50% + ${radius * Math.sin(angleInRadians)}px)`,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
             <div 
        className="connection-line"
        style={{
          transform: `rotate(${node.angle - 270}deg)`,
          width: `${radius - 100}px`,
        }}
      ></div>

            <div className="small-circle">
              <img 
                src={node.image} 
                alt={node.title} 
                className="small-image" 
              />
            </div>
            
            {hoveredNode === node.id && (
              <div className="info-box">
                {node?.info}
              </div>
            )}
            
            <h3 className="node-title">{node.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CentralNodeComponent;


