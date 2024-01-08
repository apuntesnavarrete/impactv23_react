import  { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { EquiposType } from "../../types/equipostype";

function Equipos() {
    const [data, setData] = useState<EquiposType[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://18.188.110.39:83/api/v1/teams');
          const result: EquiposType[] = await response.json();
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
        <p>lectura de Equipos</p>
        <NavLink to="/Equipos/Crear">
      Crear Nuevo Participante
    </NavLink>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo electrónico</th>
            {/* Agrega más encabezados según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {data.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.id}</td>
              <td>{jugador.name}</td>
              {/* Renderiza más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
      
    )
  }
  
  export default Equipos