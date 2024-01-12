import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { MatchType } from '../../types/partidoType';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TorneoType } from '../../types/torneotype';



function Categoria(){
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
        console.log(RESULTIRDENADOS)

            console.log()
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
formData.append('tournaments', idtorneo !== null ? idtorneo.toString() : '');


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
  

        <button type="submit">Submit</button>
      </form>
      </>
 )
    }   

export default Categoria