import { useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { MatchType } from '../../types/partidoType';
import { getMatchById } from './functions/getMatchbyId';
import { TablageneralType } from '../../types/tablageneral';
import getRapidFootballStandings from './functions/getRapidFootballStandings';
import getTournamentId from './functions/getTournamentId';

interface FormData extends MatchType {
  file: FileList;
}

function PartidoEdit() {
  const [tablageneral, setTablageneral] = useState<TablageneralType[]>([]);

  const [MatchId, setMatchId] = useState<MatchType>();

  const { idpartido,liga,torneo } = useParams();
  let idAsNumber: number | undefined;

  if (idpartido !== undefined) {
    idAsNumber = parseInt(idpartido, 10);
  } else {
    // Handle the case where id is undefined, such as setting a default value or throwing an error
  }

  const { register, handleSubmit, setValue } = useForm<FormData>();


  useEffect(() => {
    async function fetchParticipantsData() {
     
      if (idAsNumber !== undefined) {
        const MatchById = await getMatchById(idAsNumber);
      
        setMatchId(MatchById);
        // Set form values after fetching data
        if (MatchById) {
         // setValue('name', MatchById);
         setValue('matchday', MatchById.matchday);
         setValue('pointsLocal', MatchById.pointsLocal);
         setValue('teamHome', MatchById.teamHome.id);
         setValue('localgoals', MatchById.localgoals);
         setValue('visitangoals', MatchById.visitangoals);
         setValue('teamAway', MatchById.teamAway.id);
         setValue('pointsVisitan', MatchById.pointsVisitan);
         setValue('date', MatchById.date);
        }
      }
    }

    getTournamentId(liga,torneo)
      .then((idtorneo)=>{
        if (idtorneo !== null) {
          //arreglar la funcion
          getRapidFootballStandings(idtorneo)
            .then((equiposConInfo) => {
              console.log('Equipos con Info:', equiposConInfo);
              setTablageneral(equiposConInfo);
    
            })
            .catch((error) => {
              console.error('Error en la obtención de equipos con info:', error);
            });
        }
      })

    

    fetchParticipantsData();
  }, [idAsNumber, setValue]); // Add idAsNumber and setValue to dependency array

 

  const onSubmit: SubmitHandler<FormData> = async (data) => {
  


    
   const payload = {
    matchday: data.matchday,
    pointsLocal: data.pointsLocal,
    teamHome: data.teamHome,
    localgoals: data.localgoals,
    visitangoals: data.visitangoals,
    teamAway: data.teamAway,
    pointsVisitan: data.pointsVisitan,
    date: data.date,
  };
    


    try {

      const response = await fetch(`${apiruta}/api/v1/matches/${idAsNumber}`, {
        

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // Establecer el tipo de contenido como JSON
      },
        body: JSON.stringify(payload),
        // Agregar token después.
      });

      if (response.ok) {
        console.log(response)
//Hacer comprobacion de insercion exitosa o no.
      } else {
         // La solicitud falló, manejar el error
    const errorData = await response.json(); // Obtener detalles del error del cuerpo de la respuesta
    console.error('Error en la solicitud:', errorData);

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
  };

 

 


  return (
    <div className='participants-edit-container'>
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="matchday">Matchday:</label>
        <input type="number" {...register('matchday')} />

      

        <label htmlFor="pointsLocal">Points Local:</label>
        <input type="number" {...register('pointsLocal')} />

        <label htmlFor="teamHomeName">Home Team: 
         {` ${MatchId?.teamHome.name}`}
        </label>
        <select {...register('teamHome')}>
        {tablageneral.map((equipo) => (
              <option key={equipo.equipoId} value={equipo.equipoId}>
                {equipo.equipo}
              </option>
            ))}
        </select>


        <label htmlFor="localGoals">Local Goals:</label>
        <input type="number" {...register('localgoals')} />

        <label htmlFor="visitorGoals">Visitor Goals:</label>
        <input type="number" {...register('visitangoals')} />

        <label htmlFor="teamAwayName">Away Team:         {` ${MatchId?.teamAway.name}`}
</label>
<select {...register('teamAway')}>
        {tablageneral.map((equipo) => (
              <option key={equipo.equipo} value={equipo.equipoId}>
                {equipo.equipo}
              </option>
            ))}
        </select>
        <label htmlFor="pointsVisitor">Points Visitor:</label>
        <input type="number" {...register('pointsVisitan')} />

        <label htmlFor="date">Date:</label>
        <input type="date" {...register('date')} />

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
    
  );
}

export default PartidoEdit;