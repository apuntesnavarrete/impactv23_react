import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { MatchType } from '../../types/partidoType';


function PartidosCreate(){


  const token = localStorage.getItem('token');

 const { register, handleSubmit  }  = useForm<MatchType>()

  const onSubmit: SubmitHandler<MatchType> = async (data) => {

const formData = new URLSearchParams();





if (data.teamAway) {
    formData.append('teamAway', data.teamAway.toString());
  } 

  if (data.teamHome) {
    formData.append('teamHome', data.teamHome.toString());
  } 

formData.append('date', data.date);
formData.append('tournaments', data.tournaments.toString());


if (data.localgoals) {
    formData.append('localgoals', data.localgoals.toString());
  }

  if (data.visitangoals) {
    formData.append('visitangoals', data.visitangoals.toString());
  }

  let puntoslocals : number;
  let púntosvisitans : number;
  
 

 /// formData.append('pointsLocal', puntoslocals.toString());
//    formData.append('pointsVisitan', púntosvisitans.toString());


  if (data.localgoals > data.visitangoals) {
    console.log(data.localgoals)
    puntoslocals = 3
    púntosvisitans = 0
    console.log(puntoslocals)

    formData.append('pointsLocal', puntoslocals.toString());
    formData.append('pointsVisitan', púntosvisitans.toString());
  }


  if (data.localgoals < data.visitangoals) {
    console.log(data.visitangoals)

    puntoslocals = 0
    púntosvisitans = 3

    formData.append('pointsLocal', puntoslocals.toString());
    formData.append('pointsVisitan', púntosvisitans.toString());
  }



  if (data.localgoals === data.visitangoals) {
    // logica provision -- factorizar todo
   const ganadorDesempate = window.prompt('Por favor, ingrese algún texto:', 'Texto predeterminado');

    if(ganadorDesempate == "L"){
        puntoslocals = 2
        púntosvisitans = 1

        formData.append('pointsLocal', puntoslocals.toString());
        formData.append('pointsVisitan', púntosvisitans.toString());

    }else{
        puntoslocals = 1
        púntosvisitans = 2

        formData.append('pointsLocal', puntoslocals.toString());
        formData.append('pointsVisitan', púntosvisitans.toString());


    }
    

  }
    // Lógica de desempate
   

    try {


      console.log(formData.toString())

        const response = await fetch(`${apiruta}/api/v1/matches`, {
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
  };

  

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* nesecito que a fututo el diname se componga de la liga y torneo */}
        <label htmlFor="idName">Team Home</label>
        <input type="number" {...register('teamHome')} />
      
        <label htmlFor="description">TeamAway</label>
      <input type="number" {...register('teamAway')} />

      <label htmlFor="date_fundation">Fecha de partido</label>
      <input type="date" {...register('date')} />

      <label htmlFor="leagues">Goles Local</label>
      <input type="number" {...register('localgoals')} />

      <label htmlFor="categories">Goles Visitante</label>
      <input type="number" {...register('visitangoals')} />
     
      <label htmlFor="categories">torneo</label>
      <input type="number" {...register('tournaments')} />

        <button type="submit">Submit</button>
      </form>
 )
    }   

export default PartidosCreate