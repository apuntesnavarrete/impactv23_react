// Importa los componentes necesarios
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './routers/login/loguin';
import Jugadores from './routers/jugadores/jugadores';
import JugadoresCreate from './routers/jugadores/jugadoresCreate';
import Equipos from './routers/equipos/equipos';
import EquiposCreate from './routers/equipos/equiposCreate';
import App from './App';
import Pruebas from './routers/pruebas/form';
import Torneos from './routers/torneos/torneos';
import TorneosCreate from './routers/torneos/torneosCreate';
import PartidosCreate from './routers/Partidos/partidosCreate';
import Menu_Ligas from './routers/Menu/Prochampions';
import Categoria from './routers/Menu/Libre_platino';
 // Nuevo componente para detalles de torneo

// Configura las rutas
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugadores/crear" element={<JugadoresCreate />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/equipos/crear" element={<EquiposCreate />} />
        <Route path="/" element={<App />} />
        <Route path="/pruebas" element={<Pruebas />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/torneos/create" element={<TorneosCreate />} />
        <Route path="/partidos" element={<PartidosCreate />} />
        <Route path="/prochampions" element={<Menu_Ligas />} />

        {/* Ruta dinámica para detalles de torneo */}
        <Route path="/:liga/:torneo" element={<Categoria />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;