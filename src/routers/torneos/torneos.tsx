import  { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiruta } from "../../config/apiruta";
import { TorneoType } from "../../types/torneotype";

function Torneos() {
  const [data, setData] = useState<TorneoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiruta}/api/v1/tournaments`);
        const result: TorneoType[] = await response.json();
        setData(result);
        console.log(result)
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

      <NavLink to="/Torneos/Create">
      Crear Nuevo Torneo
    </NavLink>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Id Name</th>
            <th> descripcion</th>
            <th> fecha de creacion</th>
            <th>Liga</th>
            <th>Categoria</th>

            {/* Agrega más encabezados según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {data.map((torneo) => (
            <tr key={torneo.id}>
              <td>{torneo.id}</td>
              <td>{torneo.idName}</td>
              <td>{torneo.description}</td>
              <td>{torneo.date_fundation}</td>
              <td>{torneo.leagues.name}</td>
              <td>{torneo.categories.categorias}</td>

              {/* Renderiza más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Torneos;