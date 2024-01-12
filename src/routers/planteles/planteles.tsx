import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TorneoType } from '../../types/torneotype';
import { Plantelestype } from '../../types/plantelestype';



function Planteles(){
    const { liga, torneo } = useParams();
    const [idtorneo, setidtorneo] = useState<number | null>(null);

    useEffect(() => {
        // Función para realizar la solicitud fetch
        const fetchData = async () => {
          try {
            // Realizar la solicitud fetch
            const response = await fetch('http://18.188.110.39:83/api/v1/tournaments');
         




            // Verificar si la respuesta es exitosa (código de estado 200)
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
    
            // Convertir la respuesta a formato JSON
            const data: TorneoType[] = await response.json();
           const resultadosFiltrados = data.filter(item => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias === torneo );

         const RESULTIRDENADOS =  resultadosFiltrados.sort((b, a) => a.idName.localeCompare(b.idName));


    /*    const resultadosFiltrados = data.filter(item => 
          item.leagues && 
          item.leagues.Alias === (liga?.toUpperCase()) &&
          item.leagues. === torneo
        );  
      */  
        console.log(RESULTIRDENADOS[0].id)

            // Actualizar el estado con los datos obtenidos
            setidtorneo(RESULTIRDENADOS[0].id)
          } catch (error) {
            console.error('Error:');
          }
        };
    
        // Llamar a la función para realizar la solicitud fetch
        fetchData();
      }, [liga,torneo]); 

  const token = localStorage.getItem('token');

 const { register, handleSubmit  }  = useForm<Plantelestype>()

  const onSubmit: SubmitHandler<Plantelestype> = async (data) => {

const formData = new URLSearchParams();





if (data.dorsal) {
    formData.append('dorsal', data.dorsal.toString());
  } 

  if (data.typeParticipants) {
    console.log(data.typeParticipants)
    formData.append('typeParticipant', data.typeParticipants.toString());
  } 
//modificar enum
  if (data.tournaments) {
    formData.append('tournaments', data.tournaments.toString());
  } 

  if (data.participants) {
    formData.append('participants', data.participants.toString());
  } 

  if (data.teams) {
    formData.append('teams', data.teams.toString());
  } 

  formData.append('tournaments', idtorneo !== null ? idtorneo.toString() : '');


  try {



    const response = await fetch(`${apiruta}/api/v1/rosters`, {
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

    

  }
   

 

  

    return(

        <>
        <div>
      <h2>Detalles del Torneo</h2>
      <p>Liga: {liga}</p>
      <p>Categoria: {torneo}</p>
      <p>idTorneo: {idtorneo}</p>
      {/* El resto de tu lógica para mostrar detalles del torneo */}
    </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* nesecito que a fututo el diname se componga de la liga y torneo */}
        <label htmlFor="dorsal">Dorsal</label>
        <input type="number" {...register('dorsal')} />
    
        <label htmlFor="TypeParticipant">Typo de Participante</label>
<select {...register('typeParticipants')} id="TypeParticipant">
  <option value="Delegado">Delegado</option>
  <option value="Jugador">Jugador</option>
  <option value="Entrenador">Entrenador</option>
</select>
      
        <label htmlFor="teamsId">Equipo</label>
      <input type="number" {...register('teams')} />


      <label htmlFor="participants">Jugador</label>
      <input type="number" {...register('participants')} />
  
        <button type="submit">Submit</button>
      </form>
      </>
 )
    }   

export default Planteles