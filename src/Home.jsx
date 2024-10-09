import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import AgregarJuego from "./AgregarJuego";
import "./styles.css";

const Home = () => {
  const [deportes, setDeportes] = useState([]);
  const [deporteSeleccionado, setDeporteSeleccionado] = useState(null);
  const [mostrarAgregarJuego, setMostrarAgregarJuego] = useState(false);

  useEffect(() => {
    // Obtener deportes del servidor
    fetch('/api/games')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDeportes(data);
        } else {
          console.error('La respuesta de la API no es un array', data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los deportes', error);
      });
  }, []);

  const borrarDeporte = (id) => {
    // Hacer la solicitud DELETE al servidor
    fetch(`/api/games/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        setDeportes(data);
      })
      .catch((error) => {
        console.error('Error al borrar el deporte', error);
      });
  };

  const abrirModal = (deporte) => {
    setDeporteSeleccionado(deporte);
  };

  const cerrarModal = () => {
    setDeporteSeleccionado(null);
  };

  const abrirAgregarJuego = () => {
    setMostrarAgregarJuego(true);
  };

  const cerrarAgregarJuego = () => {
    setMostrarAgregarJuego(false);
  };

  const agregarJuego = (nuevoJuego) => {
    setDeportes(nuevoJuego);
  };

  return (
    <div>
      <button
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={abrirAgregarJuego}
      >
        Agregar Juego
      </button>
      <div className="deportes-container">
        {deportes.map((deporte) => (
          <div key={deporte.id} className="deporte-card">
            <h3>{deporte.title}</h3>
            <button onClick={() => abrirModal(deporte)}>Detalles</button>
            <button onClick={() => borrarDeporte(deporte.id)}>Borrar</button>
          </div>
        ))}
      </div>
      <Modal deporte={deporteSeleccionado} onClose={cerrarModal} />
      {mostrarAgregarJuego && (
        <AgregarJuego onClose={cerrarAgregarJuego} onAgregar={agregarJuego} />
      )}
    </div>
  );
};

export default Home;