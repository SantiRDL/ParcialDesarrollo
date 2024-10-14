import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import AgregarJuego from "./AgregarJuego";
import "./styles.css";

const Home = () => {
  const [deportes, setDeportes] = useState([]);
  const [deporteSeleccionado, setDeporteSeleccionado] = useState(null);
  const [mostrarAgregarJuego, setMostrarAgregarJuego] = useState(false);

  useEffect(() => {
    axios.get('../api/games')
      .then((response) => {
        console.log('Respuesta de la API:', response.data); // Agregar registro de la respuesta
        if (Array.isArray(response.data)) {
          setDeportes(response.data);
        } else {
          throw new Error('Formato de datos incorrecto');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los deportes:', error);
      });
  }, []);

  const borrarDeporte = (id) => {
    axios.delete(`/api/games/${id}`)
      .then(() => {
        setDeportes(deportes.filter(deporte => deporte.id !== id));
      })
      .catch((error) => {
        console.error('Error al borrar el deporte:', error);
      });
  };

  const abrirModal = (deporte) => {
    setDeporteSeleccionado(deporte);
  };

  const cerrarModal = () => {
    setDeporteSeleccionado(null);
  };

  const agregarJuego = (nuevoJuego) => {
    axios.post('/api/games', nuevoJuego)
      .then((response) => {
        setDeportes([...deportes, response.data]);
      })
      .catch((error) => {
        console.error('Error al agregar el juego:', error);
      });
  };

  return (
    <div className="deportes-container">
      {deportes.map((deporte) => (
        <div key={deporte.id} className="deporte-card">
          <h3>{deporte.title}</h3>
          <p>{deporte.description}</p>
          <p>Jugadores: {deporte.players}</p>
          <p>Categorías: {deporte.categories}</p>
          <button onClick={() => abrirModal(deporte)}>Ver más</button>
          <button onClick={() => borrarDeporte(deporte.id)}>Borrar</button>
        </div>
      ))}
      {deporteSeleccionado && (
        <Modal deporte={deporteSeleccionado} onClose={cerrarModal} />
      )}
      <button onClick={() => setMostrarAgregarJuego(true)}>Agregar Juego</button>
      {mostrarAgregarJuego && (
        <AgregarJuego onClose={() => setMostrarAgregarJuego(false)} onAgregar={agregarJuego} />
      )}
    </div>
  );
};

export default Home;