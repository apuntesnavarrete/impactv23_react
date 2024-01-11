import  { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { EquiposType } from "../../types/equipostype";
import { apiruta } from "../../config/apiruta";

function Equipos() {
    const [data, setData] = useState<EquiposType[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiruta}/api/v1/teams`);
          const result: EquiposType[] = await response.json();
          setData(result);
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
    return (
      <>
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
          {data.map((Equipo) => (
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