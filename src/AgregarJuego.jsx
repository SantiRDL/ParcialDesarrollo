import React, { useState } from "react";
import "./Modal.css";

const AgregarJuego = ({ onClose, onAgregar }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [players, setPlayers] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoJuego = { title, description, players, categories };
    onAgregar(nuevoJuego);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Agregar Nuevo Juego</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Jugadores:</label>
            <input
              type="text"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categorías:</label>
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
            />
          </div>
          <button type="submit">Agregar</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarJuego;