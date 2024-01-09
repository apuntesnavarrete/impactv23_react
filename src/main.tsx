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
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
