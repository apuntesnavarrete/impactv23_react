
//import { NavLink } from 'react-router-dom'

import { useEffect, useState } from "react";
import Ligatype from "../../types/ligastype";
import { NavLink } from "react-router-dom";
import { apiruta } from "../../config/apiruta";

function MenuTorneoOptions() {

  const [datos, setDatos] = useState<Ligatype[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiruta}/api/v1/leagues`);
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
    <p>Opciones de torneos</p>
    <div>
      
              
     <NavLink to="tablageneral">
    -- Tabla general --
   </NavLink>

   <NavLink to="partidos">
--Partidos--
   </NavLink>

   <NavLink to="plantelesView">
--plantelesView--
   </NavLink>

   <NavLink to="goleo">
--goleo--
   </NavLink>
   <NavLink to="Asistencia">
--asistencia--
   </NavLink>
   <NavLink to="equipos">
--equipos--
   </NavLink>
   </div>
<h3>Agregar Partidos</h3>
<NavLink to="Createpartidos">
--Agregar Partidos--
   </NavLink>
   <NavLink to="planteles">
--Agregar planteles--
   </NavLink>

       </>
  
  )
}

export default MenuTorneoOptions