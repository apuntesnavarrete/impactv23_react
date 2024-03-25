import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './routers/login/loguin';
import Jugadores from './routers/jugadores/jugadores';
import JugadoresCreate from './routers/jugadores/jugadoresCreate';
import Equipos from './routers/equipos/equipos';
import EquiposCreate from './routers/equipos/equiposCreate';
import Pruebas from './routers/pruebas/form';
import Torneos from './routers/torneos/torneos';
import TorneosCreate from './routers/torneos/torneosCreate';
import PartidosCreate from './routers/Partidos/partidosCreate';
import Menu_Ligas from './routers/Menu/Prochampions';
import Planteles from './routers/planteles/planteles';
import PartidoID from './routers/Partidos/partidoID';
import PartidosView from './routers/Partidos/partidosView';
import TablaGeneral from './routers/tablageneral/tablageneral';
import PlantelesTabla from './routers/planteles/plantelesView';
import CrearPartidos from './routers/Partidos/crearPartidos';
import PartidoIdView from './routers/Partidos/partidoIdView';
import Goleo from './routers/estadisticasJugadores/goleo';
import PartidoImg from './routers/Partidos/partidoImg';
import Roll from './routers/roll/roll';
import MenuTorneos from './routers/Menu/menuTorneo';
import MenuTorneoOptions from './routers/Menu/menuTorneoOptions';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token; // Convertir el token a un booleano
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/jugadores/crear" element={<JugadoresCreate />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/equipos/crear" element={<EquiposCreate />} />
            <Route path="/pruebas" element={<Pruebas />} />
            <Route path="/torneos" element={<Torneos />} />
            <Route path="/torneos/create" element={<TorneosCreate />} />
            <Route path="/partidos" element={<PartidosCreate />} />
            <Route path="/Menu" element={<Menu_Ligas />} />
            <Route path="/Menu/torneos" element={<MenuTorneos />} />

            {/* Rutas para hacer dinamicas*/}
            {/* Rutas dinámicas*/}
            <Route path="/:liga/:torneo/Createpartidos" element={<CrearPartidos />} />
            <Route path="/:liga/:torneo/partidos" element={<PartidosView />} />
            <Route path="/:liga/:torneo/tablageneral" element={<TablaGeneral />} />

            <Route path="/:liga/:torneo/planteles" element={<Planteles />} />
            <Route path="/:liga/:torneo/plantelesView" element={<PlantelesTabla />} />

            <Route path="/:liga/:torneo/partidos/:idPartido" element={<PartidoID />} />
            <Route path="/:liga/:torneo/partidos/view/:idPartido" element={<PartidoIdView />} />
            <Route path="/:liga/:torneo/goleo" element={<Goleo />} />
            <Route path="/:liga/:torneo/partidos/img/:idPartido" element={<PartidoImg />} />
            <Route path="/:liga/:torneo/roll" element={<Roll />} />

            <Route path="/:liga" element={<MenuTorneos />} />
            <Route path="/:liga/:torneo" element={<MenuTorneoOptions />} />
          </>
        ) : null}
        <Route path="/*" element={isAuthenticated ? null : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
