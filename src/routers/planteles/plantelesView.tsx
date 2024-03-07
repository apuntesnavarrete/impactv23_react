import React, { useState, useEffect } from 'react';
import { Plantelestype } from '../../types/plantelestype';
import { apiruta } from '../../config/apiruta';
import getPlayersTournament from '../Partidos/functions/getPlayersByTournament';
import { useParams } from 'react-router-dom';
import getTournamentId from '../Partidos/functions/getTournamentId';

const PlantelesTabla: React.FC = () => {
    // Estado para almacenar los datos de la API
    const [data, setData] = useState<Plantelestype[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { liga, torneo } = useParams();

    useEffect(() => {
      // Función para realizar la solicitud a la API
      const fetchData = async () => {
        try {
        
          const idtorneo = await getTournamentId(liga, torneo)
          console.log(idtorneo)
          const jsonData = await getPlayersTournament(idtorneo);

          

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
    }, []); // El segundo argumento [] indica que este efecto solo se ejecuta al montar el componente
  
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

                <td><img className="PhotoTablas" src={`${apiruta}/public/participants/${item.participants.Photo}`} alt="Foto del jugador" /></td>

                {/* Agrega más celdas según la estructura de tus datos */}
              </tr>
            ))}
          </tbody>
        </table>


        <div>

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
        <div key={player.id} className="card_container">
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
                          </div>
          </div>
        </div>
      ))}
    </div>     
    <div className="bottom">
    <div className="content_rigth">
      <p>Marcador Final _________________</p>
      
    </div>
    <div className="content_left">

      <h3>Firma______________________</h3>

    </div>
  </div>
      </div>
    );
  };

export default PlantelesTabla;