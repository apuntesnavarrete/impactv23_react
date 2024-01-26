import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';

import { EstadisticasJugadorType } from '../../types/EstadisticasJugadorType';
import { useEffect } from 'react';
import { MatchType } from '../../types/partidoType';



function PartidoID(){
    const { idPartido } = useParams();
  //  const [idtorneo, setidtorneo] = useState<number | null>(null);
  const numeroIdPartido = parseInt(idPartido ?? "0", 10);



  useEffect(() => {
    // Función asincrónica para realizar la consulta a la API
    const fetchData = async () => {
      try {
        // Realizar la consulta a la API
        const response = await fetch('http://18.188.110.39:83/api/v1/matches');
        
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        
        // Convertir la respuesta a formato JSON
        const data : MatchType [] = await response.json();
        
        // Actualizar el estado con los datos de la API
        const objetoEncontrado = data.find(objeto => objeto.id === numeroIdPartido);

        if (objetoEncontrado) {
          console.log("Equipo Local:", objetoEncontrado.teamAway.id);
          console.log("Equipo visitante:", objetoEncontrado.teamHome.id);

        } else {
          console.log("Objeto no encontrado");
        }       
        // Imprimir los datos en la consola
      } catch (error) {
        console.error('Error:', error);
      }


      //lamada a planteles y doble filtro.


    };

    // Llamar a la función para realizar la consulta cuando el componente se monta
    fetchData();
  }, [numeroIdPartido]); // El segundo argumento, un array vacío, indica que useEffect solo se ejecutará una vez (equivalente a componentDidMount en componentes de clase)


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