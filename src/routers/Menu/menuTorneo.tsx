
//import { NavLink } from 'react-router-dom'

import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { TorneoType } from "../../types/torneotype";
import { apiruta } from "../../config/apiruta";

function MenuTorneos() {
    const { liga } = useParams();

  const [datos, setDatos] = useState<TorneoType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiruta}/api/v1/tournaments`);
        if (!response.ok) {
          throw new Error('Error al consultar la API');
        }
        const data: TorneoType[] = await response.json();

        const resultadosFiltrados = data.filter(
            (item) => item.leagues && item.leagues.Alias === liga?.toUpperCase());
            const RESULTIRDENADOS = resultadosFiltrados.sort((b, a) => a.idName.localeCompare(b.idName));
            console.log(RESULTIRDENADOS)
        setDatos(RESULTIRDENADOS);
      } catch (error) {
        console.error('Error al consultar la API:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    {liga}
    <div>
      {/* Renderizar los datos */}
      
      {datos && (
        <ul>
          {datos.map(item => (
            <li key={item.id}>

              <NavLink to={item.categories.categorias}>
            Liga.-{liga}  {item.categories.categorias}
   </NavLink>

              </li>
          ))}
        </ul>
      )}
      {/* Renderizar el error si lo hay */}

      <NavLink to="Roll">
           Roll 
   </NavLink>
    </div>
       </>
  
  )
}

export default MenuTorneos