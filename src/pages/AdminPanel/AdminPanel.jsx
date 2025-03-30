// pages/AdminPanel/AdminPanel.jsx
import { useEffect, useState } from 'react';
import AdminModal from '../../components/AdminModal/AdminModal';
import './AdminPanel.css';
import { deleteLocation, getLocations, rateLocation, updateDescription, updateLocation } from '../../utils/api';

const AdminPanel = () => {
  
const [sensors, setSensors] = useState([]);

useEffect(() => {
  getLocations().then((locations) => setSensors(locations));
}, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const handleSaveImage = (image) => {
    console.log('Сохраненные данные:', image);
    console.log(selectedSensor)
    console.log(image)
    updateLocation(selectedSensor.name, image.image).then((res) => {
      console.log(res)
    })
  };

  const handleSaveRating = (rating) => {
    console.log('Сохраненные данные:', rating);
    console.log(selectedSensor)
    rateLocation(selectedSensor.name, rating).then((res) => {
      console.log(res)
    })
  };

  const handleSaveDescription = (description) => {
    console.log('Сохраненные данные:', description);
    console.log(selectedSensor)
    updateDescription(selectedSensor.name, description).then((res) => {
      console.log(res)
    })
  };

  const handleDelete = (id) => {
deleteLocation(id).then((res) => {
  console.log(res)
})
  };

  const handleEdit = (sensor) => {
    setSelectedSensor(sensor);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Панель управления</h1>
      
      <div className="admin-actions">
      </div>

      <table className="sensors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Локация</th>
            <th>Дата создания</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor._id}>
              <td>{sensor._id.slice(0, 5)}...</td>
              <td>{sensor.name}</td>
              <td>{new Date(sensor.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="table-button edit" onClick={() => handleEdit(sensor)}>Редактировать</button>
                <button onClick={() => handleDelete(sensor._id)} className="table-button delete">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveImage={handleSaveImage}
        onSaveRating={handleSaveRating}
        onSaveDescription={handleSaveDescription}
        sensor={selectedSensor}
      />
    </div>
  );
};

export default AdminPanel;
