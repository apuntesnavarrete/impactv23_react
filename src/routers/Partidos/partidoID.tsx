import { SubmitHandler, useForm } from 'react-hook-form';
//import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';

import { EstadisticasJugadorType } from '../../types/EstadisticasJugadorType';
import { useEffect } from 'react';
import getTeamIdsFromMatchId from './functions/getTeamIdsFromMatchId';
import getPlayersByTeamAndTournament from './functions/getPlayersByTeamAndTournament';
//import { MatchType } from '../../types/partidoType';


function PartidoID(){
    const { idPartido } = useParams();
  //  const [idtorneo, setidtorneo] = useState<number | null>(null);
  const numeroIdPartido = parseInt(idPartido ?? "0", 10);



  useEffect(() => {

    getTeamIdsFromMatchId(numeroIdPartido)
    .then((resultado) => {
      // Verificamos si resultado?.teamAwayId es null o undefined, y le asignamos un valor por defecto si es necesario
      const teamAwayId = resultado?.teamAwayId || 0; // Puedes ajustar el valor por defecto según tus necesidades
  
      // Verificamos si resultado?.teamHomeId es null o undefined, y le asignamos un valor por defecto si es necesario
      const teamHomeId = resultado?.teamHomeId || 0; // Puedes ajustar el valor por defecto según tus necesidades
  
      // Llamamos a fetchTeamsById pasando el teamAwayId y teamHomeId obtenidos
      const promiseAway = getPlayersByTeamAndTournament(teamAwayId,1);
      const promiseHome = getPlayersByTeamAndTournament(teamHomeId,1);
  
      // Podemos utilizar Promise.all para esperar a que ambas promesas se resuelvan antes de continuar
      return Promise.all([promiseAway, promiseHome]);
    })
    .then(([equiposFiltradosAway, equiposFiltradosHome]) => {
      // Manejamos los equipos filtrados obtenidos de fetchTeamsById para teamAwayId y teamHomeId
      console.log('Equipos filtrados para teamAwayId:', equiposFiltradosAway);
      console.log('Equipos filtrados para teamHomeId:', equiposFiltradosHome);
      // Puedes realizar cualquier otra acción con los equipos filtrados aquí
    })
    .catch((error) => {
      console.error('Error:', error);
      // Manejar errores según tus necesidades
    });
  

  }, [numeroIdPartido]);

 // const token = localStorage.getItem('token');

 const { register, handleSubmit  }  = useForm<EstadisticasJugadorType>()

  const onSubmit: SubmitHandler<EstadisticasJugadorType> = async (data) => {


    console.log(data)


const formData = new URLSearchParams();

  if (data.attendance) {
  
    if (data.annotations) {
        formData.append('annotations', data.annotations.toString());
      } 

      if (data.participants) {
        formData.append('participants', data.participants.toString());
      } 
    
      if (data.teams) {
        formData.append('teams', data.teams.toString());
      } 
    
      formData.append('matches', idPartido !== null && idPartido !== undefined ? idPartido.toString() : '');


    formData.append('attendance', "1");

/*
    try {

    
        const response = await fetch(`${apiruta}/api/v1/PlayerStatistics`, {
            method: 'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
    
        },
        body: formData.toString(),
    
    
      });
    
    
      if (response.ok) {
        console.log(response)
      //  window.location.href = '/Jugadores';
    
      } else {
        // Handle error response
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    */

  } 

//modificar enum


 


  

    

  }
   

 

  

    return(

        <>
        <div>
     
      <p>idPartido: {idPartido}</p>
      {/* El resto de tu lógica para mostrar detalles del torneo */}
    </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* nesecito que a fututo el diname se componga de la liga y torneo */}
        <label htmlFor="annotations">Anotaciones</label>
        <input type="number" {...register('annotations')} />
      
        <label htmlFor="attendance">Asistencia</label>
<input type="checkbox" {...register('attendance')} />

        <label htmlFor="teamsId">Equipo</label>
      <input type="number" {...register('teams')} />


      <label htmlFor="participants">Jugador</label>
      <input type="number" {...register('participants')} />
  
        <button type="submit">Submit</button>
      </form>
      </>
 )
    }   

export default PartidoID