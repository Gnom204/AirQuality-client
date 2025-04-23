import './AdminModal.css';
import StarRating from '../StarRating/StarRating';
import { useState, useEffect } from 'react';

const AdminModal = ({ 
  isOpen, 
  onClose, 
  onSaveRating, 
  onSaveDescription, 
  onSaveImage, 
  sensor 
}) => {
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(sensor?.rating || 0);
  const [description, setDescription] = useState(sensor?.description || '');

  useEffect(() => {
    if (sensor) {
      setRating(sensor.rating || 0);
      setDescription(sensor.description || '');
    }
  }, [sensor]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveRating = (e) => {
    e.preventDefault();
    onSaveRating(rating);
    onClose();
  };

  const handleSaveDescription = (e) => {
    e.preventDefault();
    onSaveDescription(description);
    onClose();
  };

  const handleSaveImage = (e) => {
    e.preventDefault();
    onSaveImage({ image, description });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактирование информации</h2>

        <form onSubmit={handleSaveRating}>
          <div className="form-group">
            <label>Выставить оценку:</label>
            <StarRating rating={rating} onRate={setRating} />
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>Отмена</button>
            <button className="save-btn" type="submit">Сохранить</button>
          </div>
        </form>

        <form onSubmit={handleSaveDescription}>
          <div className="form-group">
            <label>Описание:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>Отмена</button>
            <button className="save-btn" type="submit">Сохранить</button>
          </div>
        </form>

        <form onSubmit={handleSaveImage}>
          <div className="form-group">
            <label>Добавить изображение:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>Отмена</button>
            <button className="save-btn" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
