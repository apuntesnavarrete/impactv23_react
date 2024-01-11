import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Jugadores from './routers/jugadores/jugadores.tsx';
import App from './App';
import Equipos from './routers/equipos/equipos.tsx';
import Login from './routers/login/loguin.tsx';
import JugadoresCreate from './routers/jugadores/jugadoresCreate.tsx';
import EquiposCreate from './routers/equipos/equiposCreate.tsx';
import Pruebas from './routers/pruebas/form.tsx';
import Torneos from './routers/torneos/torneos.tsx';
import TorneosCreate from './routers/torneos/torneosCreate.tsx';
import PartidosCreate from './routers/Partidos/partidosCreate.tsx';
import Menu_Ligas from './routers/Menu/Prochampions.tsx';
import Categoria from './routers/Menu/Libre_platino.tsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>
  },
 
  {
    path: "/jugadores",
    element: <Jugadores></Jugadores>
  },
  {
    path: "/jugadores/crear",
    element: <JugadoresCreate></JugadoresCreate>
  },
  {
    path: "/Equipos",
    element: <Equipos></Equipos>
  },
  {
    path: "/Equipos/crear",
    element: <EquiposCreate></EquiposCreate>
  },
  {
    path: "/",
    element: <App></App>
  }

  ,
  {
    path: "/pruebas",
    element: <Pruebas></Pruebas>
  },
  {
    path: "/Torneos",
    element: <Torneos></Torneos>
  },
  {
    path: "/Torneos/Create",
    element: <TorneosCreate></TorneosCreate>
  }

  ,
  {
    path: "/Partidos",
    element: <PartidosCreate></PartidosCreate>
  }
   ,
  {
    path: "/Prochampions",
    element: <Menu_Ligas></Menu_Ligas>
  }, {
    path: "/Pro/Libre_Platino",
    element: <Categoria></Categoria>
  }

]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
