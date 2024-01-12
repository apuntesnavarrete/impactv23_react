
import { NavLink } from 'react-router-dom'
import './App.css'

function App() {

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


<NavLink to="/Spartaq">
     Spartaq
   </NavLink>
   <NavLink to="/LigaED">
   LigaED
   </NavLink>
   <NavLink to="/Pro/Libre_Platino">
   Prochampions
      </NavLink>
</main>

<footer>
<NavLink to="/Spartaq">
     Spartaq
   </NavLink>
   <NavLink to="/Pro/Libre_Platino/Partidos">
   Partidos
   </NavLink>
   <NavLink to="/Pro/Libre_Platino/Planteles">
Planteles    
  </NavLink>
</footer>

       </>
  
  )
}

export default App
