import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CatCard from './components/CatCard';
import './App.css';

function App() {
  const [cats, setCats] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);  // Стейт для выбранного изображения

  useEffect(() => {
    // Получаем данные с API
    axios.get('https://cats-api-hfgi.onrender.com/api/cats/')
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        console.error("Error fetching cats data:", error);
      });
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);  // Устанавливаем выбранное изображение для отображения
  };

  const closeModal = () => {
    setSelectedImage(null);  // Закрываем модальное окно, сбрасывая изображение
  };

  return (
    <div className="App">
      <h1>Каталог котиков</h1>
      <div className="cats-gallery">
        {cats.map(cat => (
          <div key={cat.id} className="cat-card" onClick={() => handleImageClick(cat.image_url)}>
            <CatCard
              title={cat.title}
              imageUrl={cat.image_url}
            />
          </div>
        ))}
      </div>

      {/* Модальное окно с картинкой */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="cat" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
