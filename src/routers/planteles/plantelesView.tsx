import React, { useState, useEffect } from 'react';
import { Plantelestype } from '../../types/plantelestype';
import { apiruta } from '../../config/apiruta';
import getPlayersTournament from '../../functions/getPlayersByTournament';
import { NavLink, useParams } from 'react-router-dom';
import getTournamentId from '../../functions/getTournamentId';
import { getPlayersStadisticsByIdTournament } from '../../functions/getPlayersStatisticsByIdTournament';
import { EstadisticasJugadorType } from '../../types/EstadisticasJugadorType';
import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


const PlantelesTabla: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

    // Estado para almacenar los datos de la API
    const [data, setData] = useState<Plantelestype[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { liga, torneo } = useParams();
    const [StadisticsTournament, setStadisticsTournament] = useState<EstadisticasJugadorType[]>([]);
    const [reload, setReload] = useState(false);  // Estado para controlar la recarga
    const token = localStorage.getItem('token');

    useEffect(() => {
      // Función para realizar la solicitud a la API
      const fetchData = async () => {
        try {
        
          const idtorneo = await getTournamentId(liga, torneo)
          const jsonData = await getPlayersTournament(idtorneo);

          const playersStadisticsTournament = await getPlayersStadisticsByIdTournament(idtorneo);
          setStadisticsTournament(playersStadisticsTournament)

          const sortedData = jsonData.sort((a: Plantelestype, b: Plantelestype) =>
          a.teams.name.localeCompare(b.teams.name)
        );
          setData(sortedData);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      // Llama a la función para obtener los datos cuando el componente se monta
      fetchData();
    }, [reload]); // El segundo argumento [] indica que este efecto solo se ejecuta al montar el componente
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const filteredData = data
    .filter((item: Plantelestype) => 
        item.teams.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: Plantelestype, b: Plantelestype) => {
      // Primer criterio de ordenamiento: por nombre de equipo
      const teamComparison = a.teams.name.localeCompare(b.teams.name);
      if (teamComparison !== 0) {
          return teamComparison;
      }
      
      // Segundo criterio de ordenamiento: por id de participantes
      return a.participants.id - b.participants.id;
  });


  //espacio del experimento

  const goleadores: { [key: string]: { id: number; goles: number; asistencias: number; equipo: string; equipoId: number } } = StadisticsTournament.reduce((acumulador, registro) => {
    const nombreJugador = registro.participants.name;
    const jugadorId = registro.participants.id;
    const equipo = registro.teams.name;
    const equipoId = registro.teams.id; // Aquí agregamos el ID del equipo
  
    // Sumar 1 al contador de asistencias si la asistencia es true
    const asistencias = registro.attendance ? 1 : 0;
  
    // Construir una clave única para cada jugador, basada en su ID y el ID del equipo
    const clave = `${jugadorId}-${equipo}`;
  
    // Verificar si ya existe un registro para este jugador y equipo en el acumulador
    if (!acumulador[clave]) {
        // Si no existe, crear un nuevo registro
        acumulador[clave] = { id: jugadorId, goles: 0, asistencias: 0, equipo: equipo, equipoId: equipoId }; // Agregamos equipoId aquí
    }
  
    // Incrementar el contador de goles y asistencias para este jugador y equipo
    acumulador[clave].goles += registro.annotations;
    acumulador[clave].asistencias += asistencias;
  
    return acumulador;
  }, {} as { [key: string]: { id: number; goles: number; asistencias: number; equipo: string; equipoId: number } });
  
  const goleadoresArray = Object.keys(goleadores).map(nombreJugador => ({
    nombre: nombreJugador,
    id: goleadores[nombreJugador].id,
    goles: goleadores[nombreJugador].goles,
    asistencias: goleadores[nombreJugador].asistencias, // Agregar el campo de asistencias
   idequipo: goleadores[nombreJugador].equipoId,

    equipo: goleadores[nombreJugador].equipo
  }));

  const goleadoresFiltrados = goleadoresArray.filter(jugador => {
    return data.some(item => {
        return item.participants.id === jugador.id && item.teams.id === jugador.idequipo;
    });
});


const handleDelete  = async (id: number) => {
  if (window.confirm(`Eliminara el Registro ${id}`)) {

  try {
    const response = await fetch(`${apiruta}/api/v1/rosters/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setReload(!reload); // Cambia el estado `reload` para recargar los datos


    } else {
      console.error(`Failed to delete item with id ${id}`);
    }
  } catch (error) {
    console.error(`Error deleting item with id ${id}:`, error);
  }
}
};

const handleCapture = () => {
  console.log(cardsRef.current)
  if (cardsRef.current) {
    console.log("funciono cardsRef")

    domtoimage.toBlob(cardsRef.current)
      .then(blob => {
        if (blob) {
          saveAs(blob, 'cards-screenshot.png');
        }
      })
      .catch(error => {
        console.error('Error capturing the image', error);
      });
  }
};

    return (
      <div>

<div>
  <h1>Tabla de Datos</h1>
  {/* Agrega un campo de entrada para el término de búsqueda */}
  <input
    type="text"
    placeholder="Buscar por equipo"
    value={searchTerm}
    onChange={handleSearch}
  />
  {/* Resto del código... */}
</div>

        <h1>Registros</h1>
        <table>
          <thead>
            <tr>
              <th>ID_Jugador</th>

              <th>Equipo</th>
              <th>Jugador</th>
              <th>Dorsal</th>
              <th>Tipo de Participante</th>
              <th>ID_Registro</th>

              <th>Foto</th>
              <th>A</th>

              <th>Delete</th>

              {/* Agrega más encabezados según la estructura de tus datos */}
            </tr>
          </thead>
          <tbody>
            {/* Mapea los datos para generar filas de la tabla */}
            {filteredData.map((item: Plantelestype) => (
  <tr key={item.id}>
    <td>{item.participants.id}</td>
    <td>{item.teams.name}</td>
    <td>{item.participants.name}</td>
    <td>{item.dorsal}</td>
    <td>{item.typeParticipant}</td>
    <td>{item.id}</td>
    <td>
      <img className="PhotoTablas" src={`${apiruta}/public/participants/${item.participants.Photo}`} alt="Foto del jugador" />
    </td>
    {/* Agrega una condición para mostrar el campo de asistencia */}
    {goleadoresFiltrados.map((goleador) => {
      if (goleador.id === item.participants.id) {
        return (
          <td key={`asistencia-${item.id}`}>
            {goleador.asistencias}
          </td>
        );
      }
      return null;
    })}
    <td>  
    <button onClick={() => handleDelete(item.id)}>Delete</button>

   </td>
   <td>  
              <NavLink to={`/${liga}/${torneo}/planteles/edit/${item.id}`}>
              edit 
          </NavLink>
   </td>
  </tr>
))}



          </tbody>
        </table>


        <div ref={cardsRef} className="Registros_card">

        <div className="top">
      <div className="content_rigth">
        <p>Jornada _________________</p>
         <p>Fecha _________________</p>
      </div>
      <div className="content_left">
  
        <h3>Hoja de Registros</h3>
        <p>{liga} {torneo} </p>
              </div>
      </div>

      {filteredData.map(player => (
  <div key={player.id} className="card_container" >
    <div className="card_interna">
      <img className="card_perfil" src={`${apiruta}/public/participants/${player.participants.Photo}`} alt="Foto del jugador" />
      <div className="card_data">
        <a href={`Delete/${player.participants.id}`}>
          <h5 className="card_plante-id">Id.-{player.participants.id}</h5>
        </a>
        <h4 className="card_nombre">{player.participants.name}</h4>
        <h5 className="card_escudo">
          <img className="PhotoTablas" src={`${apiruta}/public/teams/${player.teams.logo}`} alt="Foto del equipo" />
          <h5 className="card_plante-id">{player.teams.name}</h5>
        </h5>
        <p className="card_Torneo">Torneo {liga} {torneo}</p>
        <a href={`Edit/${player.id}`}>
          <p className="card_Dorsal">Dorsal .- {player.dorsal}</p>
        </a>
        {goleadoresFiltrados.map((goleador) => {
          if (goleador.id === player.participants.id) {
            return (
              <p key={`asistencia-${player.id}`} className="card_asistencia">
                Asistencias: {goleador.asistencias}   /    {/*goleador.asistencias >= 5 ? " Autorizado a liguilla" : ""*/}

              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  </div>
))}
  <div className="bottom">
    <div className="content_rigth">
      <p>Marcador Final _________________</p>
      
    </div>
    <div className="content_left">

      <h3>Firma______________________</h3>

    </div>
    <button onClick={handleCapture}>Capture</button>

  </div>
    </div>     
  


      </div>
      
    );
  };

export default PlantelesTabla;