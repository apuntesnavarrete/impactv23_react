
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
   <NavLink to="/equiposTournamentAll">
     Equipos ALL
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

<h3>
  estas rutas son provicionales debe hacer un menu
</h3>



<NavLink to="/ED/Mixta_Dominical/Createpartidos">
    Crear partidos Ed mixta Dominical
   </NavLink>



   <NavLink to="/ED/Mixta_Dominical/partidos">
    leer partidos Ed mixta Dominical
   </NavLink>
   <h3>
  Mixta Dominical
</h3>
   <NavLink to="/ED/Mixta_Dominical/tablageneral">
    Tabla General Mixta ED Dominical
   </NavLink>
   <h3>
Libre ed
</h3>
   <NavLink to="/ED/Libre/tablageneral">
    Tabla General Libre ED 
   </NavLink>
   <NavLink to="/ED/Libre/planteles">
    planteles Libre ED 
   </NavLink>

   <NavLink to="/ED/Libre/plantelesView">
    planteles tabla Libre ED 
   </NavLink>

   <NavLink to="/ED/Libre/Createpartidos">
   - Crear partidos libre ed -
   </NavLink>

   <NavLink to="/ED/Libre/partidos">
    partidos Libre ED 
   </NavLink>

   <NavLink to="/ED/Libre/partidos/">
   --Agregar goles--
   </NavLink>

   <NavLink to="/ED/Libre/goleo">
   --Goleo--
   </NavLink>
   <p>

<p>
<NavLink to="/ED/Mixta_Sabatina/partidos">
    leer partidos Ed mixta sabatina
   </NavLink>
   <NavLink to="/ED/Mixta_Sabatina/partidos">
    leer partidos Ed mixta sabatina
   </NavLink>
</p>

   <NavLink to="/ED/Mixta_Sabatina/tablageneral">
   - tabla Ed Mixta_Sabatina-
   </NavLink>
   <NavLink to="/ED/Mixta_Sabatina/Createpartidos">
   - Crear partidos Ed Mixta_Sabatina-
   </NavLink>
   </p>

   <h3>
ED femenil sabatina</h3>
<NavLink to="/ED/Femenil/Createpartidos">
   - Crear partidos Ed Femenil
   </NavLink>
   <NavLink to="/ED/Femenil/partidos">
   -- leer partidos Ed femenil --
   </NavLink>

   <NavLink to="/ED/Femenil/planteles">
   --- insertar planteles femenil ED ---
   </NavLink>

   <NavLink to="/ED/Femenil/plantelesView">
   -- planteles tabla femenil ED ---
   </NavLink>

   <NavLink to="/ED/Femenil/tablageneral">
    Tabla General Femenil ED 
   </NavLink>
   <h3>
Proo libre platinoa</h3>
<NavLink to="/Pro/Libre_Platino/Createpartidos">
   - Crear partidos Pro platino-
   </NavLink>
   <NavLink to="/Pro/Libre_Platino/tablageneral">
   - Libre general Pro platino-
   </NavLink>
   <NavLink to="/Pro/Libre_Platino/partidos">
   - Libre resultados platino-
   </NavLink>

   <NavLink to="/Pro/Libre_Platino/planteles">
   --- insertar planteles Libre ED ---
   </NavLink>

   <NavLink to="/Pro/Libre_Platino/plantelesView">
   -- planteles tabla Libre ED ---
   </NavLink>

   <h3>

   <h3> Liga AGUIGOL </h3>  <NavLink to="/AGUIGOL/SUB19/Createpartidos">
   - Crear partidos Liga Aguigol-
   </NavLink> 

   <NavLink to="/AGUIGOL/SUB19/partidos">
   - Libre resultados AGUIGOL-
   </NavLink>

   <NavLink to="/AGUIGOL/SUB19/tablageneral">
   - tabla general AGUIGOL-
   </NavLink>

 Ligas
</h3>
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
