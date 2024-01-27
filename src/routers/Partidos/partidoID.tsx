import { SubmitHandler, useForm } from 'react-hook-form';
//import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import getTeamIdsFromMatchId from './functions/getTeamIdsFromMatchId';
import getPlayersByTeamAndTournament from './functions/getPlayersByTeamAndTournament';
import { EstadisticasJugadorTypeNuevo } from '../../types/EstadisticasJugadorType';







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

 const { register, handleSubmit } = useForm<EstadisticasJugadorTypeNuevo>();

  const onSubmit: SubmitHandler<EstadisticasJugadorTypeNuevo> = async (data) => {


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
  {/* En el futuro, el nombre puede componerse de la liga y el torneo */}
  
  {/* Jugador 1 */}
  <label htmlFor="participants.player1.annotations">Anotaciones Jugador 1</label>
  <input type="number" {...register('participants.player1.annotations')} />

  <label htmlFor="participants.player1.attendance">Asistencia Jugador 1</label>
  <input type="checkbox" {...register('participants.player1.attendance')} />

  {/* Jugador 2 */}
  <label htmlFor="participants.player2.annotations">Anotaciones Jugador 2</label>
  <input type="number" {...register('participants.player2.annotations')} />

  <label htmlFor="participants.player2.attendance">Asistencia Jugador 2</label>
  <input type="checkbox" {...register('participants.player2.attendance')} />

  {/* Campo compartido para ambos jugadores */}
  <label htmlFor="teams">Equipo para Ambos Jugadores</label>
  <input type="number" {...register('teams')} />

  <button type="submit">Submit</button>
</form>
      </>
 )
    }   

export default PartidoID