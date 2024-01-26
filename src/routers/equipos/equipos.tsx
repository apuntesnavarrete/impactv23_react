import  { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { EquiposType } from "../../types/equipostype";
import { apiruta } from "../../config/apiruta";

function Equipos() {
    const [data, setData] = useState<EquiposType[]>([]);
    const [loading, setLoading] = useState(true);
  
    const [jugadoresfiltrados, setjugadoresfiltrados] = useState<EquiposType[]>([]);
    const [busqueda, setBusqueda] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiruta}/api/v1/teams`);
          const result: EquiposType[] = await response.json();

          const jugadoresOrdenados = result.sort((b, a) => a.id - b.id);
          // Tomar solo los primeros 100 resultados
          const primeros100Jugadores = jugadoresOrdenados.slice(0, 100);

          setData(result);
          setjugadoresfiltrados(primeros100Jugadores);

          setLoading(false);


          // Iterar sobre cada elemento del arreglo
          result.forEach(function(element) {
  // Verificar si el campo "participants" no es nulo
  if (element.participants) {
    // Acceder al campo "name" dentro de "participants"
    console.log(element.participants.name);
  }
});


          console.log(result[5].participants)
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
        <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={handleBusquedaChange}
      />
        <p>lectura de Equipos</p>
        <NavLink to="/Equipos/Crear">
      Crear Nuevo Equipo
    </NavLink>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Logo</th>
            <th>Entrenador</th>

            {/* Agrega más encabezados según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {jugadoresfiltrados.map((Equipo) => (
            <tr key={Equipo.id}>
              <td>{Equipo.id}</td>
              <td>{Equipo.name}</td>
              <td><img className="PhotoTablas" src={`${apiruta}/public/teams/${Equipo.logo}`} alt="Foto del equipo" /></td>

              <td>{Equipo.participants ? Equipo.participants.name : 'sin asignar'}</td>

              {/* Renderiza más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
      
    )
  }
  
  export default Equipos