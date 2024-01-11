
import { NavLink } from 'react-router-dom'

function Menu_Ligas() {

  return (
    <><header>
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
      
      
<main>
      {/* hacerlo dinamico */}


<NavLink to="/Libre_Golden">
Libre_Golden
   </NavLink>
   <NavLink to="/Pro/Libre_Platino">
   Libre_Platino
      </NavLink>
</main>

       </>
  
  )
}

export default Menu_Ligas