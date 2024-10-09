import React from "react";
import "./Modal.css";

const Modal = ({ deporte, onClose }) => {
  if (!deporte) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{deporte.title}</h3>
        <p>{deporte.description}</p>
        <p>Jugadores: {deporte.players}</p>
        <p>Categorías: {deporte.categories}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;