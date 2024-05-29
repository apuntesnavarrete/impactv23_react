import  { useEffect, useState } from "react";
import { Jugadorestype } from "../../types/jugadores";
import { NavLink } from "react-router-dom";
import { apiruta } from "../../config/apiruta";
import { getAllParticipants } from "../Partidos/functions/getAllParticipants";

function Jugadores() {
  const [data, setData] = useState<Jugadorestype[]>([]);
  const [loading, setLoading] = useState(true);

  const [jugadoresfiltrados, setjugadoresfiltrados] = useState<Jugadorestype[]>([]);
  const [busqueda, setBusqueda] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllParticipants();
        console.log(result);

        const jugadoresOrdenados = result.sort((b: { id: number; }, a: { id: number; }) => a.id - b.id);
        // Tomar solo los primeros 100 resultados
        const primeros100Jugadores = jugadoresOrdenados.slice(0, 100);

        setData(result);
        setjugadoresfiltrados(primeros100Jugadores);

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

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);
    // Filtrar los datos basándonos en la búsqueda
   const datosFiltrados = data.filter((jugador) =>
   jugador.name.toLowerCase().includes(valorBusqueda.toLowerCase())
    );
    setjugadoresfiltrados(datosFiltrados)
  }

  return (
    <>
      <p>Lectura de jugadores</p>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={handleBusquedaChange}
      />


      <NavLink to="/Jugadores/Crear">
      Crear Nuevo Participante
    </NavLink>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Sexo</th>

            <th>Correo electrónico</th>
            <th>Fecha de Nacimiento</th>
            <th>Foto</th>
            <th>Curp</th>
            <th>Editar</th>

            {/* Agrega más encabezados según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {jugadoresfiltrados.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.id}</td>
              <td>{jugador.name}</td>
              <td>{jugador.sex}</td>

              <td>{jugador.Email}</td>
              <td>{jugador.birthDate}</td>
              <td><img className="PhotoTablas" src={`${apiruta}/public/participants/${jugador.Photo}`} alt="Foto del jugador" /></td>
              <td>{jugador.Curp}</td>
              <td>  
              <NavLink to={`edit/${jugador.id}`}>
              Edit 
          </NavLink>
   </td>
              {/* Renderiza más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Jugadores;