import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';

import { EstadisticasJugadorType } from '../../types/EstadisticasJugadorType';



function PartidoID(){
    const { idPartido } = useParams();
  //  const [idtorneo, setidtorneo] = useState<number | null>(null);



  const token = localStorage.getItem('token');

 const { register, handleSubmit  }  = useForm<EstadisticasJugadorType>()

  const onSubmit: SubmitHandler<EstadisticasJugadorType> = async (data) => {

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


    try {

        console.log(formData.toString())
    
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