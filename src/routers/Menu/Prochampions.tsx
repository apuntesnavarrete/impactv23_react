
//import { NavLink } from 'react-router-dom'

import { useEffect, useState } from "react";
import Ligatype from "../../types/ligastype";
import { NavLink } from "react-router-dom";
import '../../App.css'

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

  function handleLogout() {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redireccionar a la página de inicio de sesión u otra página relevante
    window.location.href = '/login'; // Cambia esto por la URL deseada
  }
  return (
    <>

<header>
      <nav>
   
   <NavLink to="/">
     Home
   </NavLink>
   <NavLink to="/Login">
     Login
   </NavLink>
   <NavLink to="/Jugadores">
     Jugadores
   </NavLink>
   <NavLink to="/Equipos">
     Equipos
   </NavLink>
   <NavLink to="/Torneos">
   Torneos
   </NavLink>
  </nav>
      </header> 

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

    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
       </>
  
  )
}

export default Menu_Ligas