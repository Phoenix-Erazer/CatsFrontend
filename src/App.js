import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CatCard from "./components/CatCard";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState(""); // Главная категория для фильтра
  const [formCategory, setFormCategory] = useState(""); // Категория для формы добавления котика

  // Функция для получения котиков с фильтром
  const fetchCats = useCallback(() => {
    const url = category
      ? `https://cats-api-hfgi.onrender.com/api/cats/?category=${encodeURIComponent(category)}`
      : "https://cats-api-hfgi.onrender.com/api/cats/"; // Если категория не выбрана

    console.log("Загружаем котиков с фильтром:", url); // Лог для проверки URL
    axios
      .get(url)
      .then((response) => {
        console.log("Полученные данные:", response.data);
        setCats(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке котиков:", error);
      });
  }, [category]);

  useEffect(() => {
    fetchCats(); // Загружаем котиков при изменении категории
  }, [category, fetchCats]);

  // Обработчик клика по изображению
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Обработчик добавления нового котика
  const handleAddCat = () => {
    if (!title || !imageUrl) {
      alert("Введите название и URL изображения!");
      return;
    }

    const newCat = { title, image_url: imageUrl, category: formCategory };

    axios
      .post("https://cats-api-hfgi.onrender.com/api/cats/", newCat)
      .then((response) => {
        setCats([...cats, response.data]);
        setTitle("");
        setImageUrl("");
        setFormCategory(""); // Сбросить категорию формы после добавления котика
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении котика:", error);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Каталог котиков</h1>
        <div className="filter-container">
          <select
            className="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Обновляем состояние категории при выборе
          >
            <option value="">Все</option>
            <option value="cute">Милый</option>
            <option value="funny">Смешной</option>
            <option value="sleepy">Сонный</option>
            <option value="playful">Игривый</option>
          </select>
        </div>
        <button className="add-cat-button" onClick={() => setShowForm(true)}>
          +
        </button>
      </div>

      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Добавить котика</h2>
            <input
              className="input-field"
              type="text"
              placeholder="Название котика"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="URL изображения"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <select
              className="input-field"
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)} // Обновляем категорию только в форме
            >
              <option value="">Выберите категорию</option>
              <option value="cute">Милый</option>
              <option value="funny">Смешной</option>
              <option value="sleepy">Сонный</option>
              <option value="playful">Игривый</option>
            </select>
            <button onClick={handleAddCat}>Добавить</button>
            <button className="close-button" onClick={() => setShowForm(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      <div className="cats-gallery">
        {cats.map((cat) => (
          <div key={cat.id} className="cat-card" onClick={() => handleImageClick(cat.image_url)}>
            <CatCard title={cat.title} imageUrl={cat.image_url} />
          </div>
        ))}
      </div>

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
