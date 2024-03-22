
//import { NavLink } from 'react-router-dom'

import { useEffect, useState } from "react";
import Ligatype from "../../types/ligastype";
import { NavLink } from "react-router-dom";

function Menu_Ligas() {

  const [datos, setDatos] = useState<Ligatype[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://18.188.110.39:83/api/v1/leagues');
        if (!response.ok) {
          throw new Error('Error al consultar la API');
        }
        const data: Ligatype[] = await response.json();
        console.log()
        setDatos(data);
      } catch (error) {
        console.error('Error al consultar la API:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div>
      {/* Renderizar los datos */}
      {datos && (
        <ul>
          {datos.map(item => (
            <li key={item.id}>
              
     <NavLink to={item.Alias}>
            Liga.-  {item.Alias}
   </NavLink>
              </li>
          ))}
        </ul>
      )}
      {/* Renderizar el error si lo hay */}
    </div>
       </>
  
  )
}

export default Menu_Ligas