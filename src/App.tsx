
import { NavLink } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <nav>
    {/* Usando NavLink para la navegación */}
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
  </nav>
  )
}

export default App
