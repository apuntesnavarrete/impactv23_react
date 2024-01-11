import  { useEffect, useState } from "react";
import { Jugadorestype } from "../../types/jugadores";
import { NavLink } from "react-router-dom";
import { apiruta } from "../../config/apiruta";

function Jugadores() {
  const [data, setData] = useState<Jugadorestype[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiruta}/api/v1/participants`);
        const result: Jugadorestype[] = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <>
      <p>Lectura de jugadores</p>

      <NavLink to="/Jugadores/Crear">
      Crear Nuevo Participante
    </NavLink>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo electrónico</th>
            <th>Fecha de Nacimiento</th>
            <th>Foto</th>
            <th>Curp</th>

            {/* Agrega más encabezados según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {data.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.id}</td>
              <td>{jugador.name}</td>
              <td>{jugador.Email}</td>
              <td>{jugador.birthDate}</td>
              <td><img className="PhotoTablas" src={`${apiruta}/public/participants/${jugador.Photo}`} alt="Foto del jugador" /></td>
              <td>{jugador.Curp}</td>

              {/* Renderiza más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Jugadores;