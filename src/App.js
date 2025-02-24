import React, { useEffect, useState } from "react";
import axios from "axios";
import CatCard from "./components/CatCard";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://cats-api-hfgi.onrender.com/api/cats/")
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке котиков:", error);
      });
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleAddCat = () => {
    if (!title || !imageUrl) {
      alert("Введите название и URL изображения!");
      return;
    }

    const newCat = { title, image_url: imageUrl };

    axios
      .post("https://cats-api-hfgi.onrender.com/api/cats/", newCat)
      .then((response) => {
        setCats([...cats, response.data]);
        setTitle("");
        setImageUrl("");
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
        <button className="add-cat-button" onClick={() => setShowForm(true)}>
          +
        </button>
      </div>

      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Добавить котика</h2>
            <input
              type="text"
              placeholder="Название котика"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL изображения"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
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
