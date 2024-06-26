import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { TorneoType } from '../../types/torneotype';
import { Plantelestype } from '../../types/plantelestype';
import { SuccessMessage } from '../SuccesMessage';
import { TablageneralType } from '../../types/tablageneral';
import getRapidFootballStandings from '../../functions/getRapidFootballStandings';
import getPlayersTournament from '../../functions/getPlayersByTournament';



function Planteles(){
    const { liga, torneo } = useParams();
    const [idtorneo, setidtorneo] = useState<number | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [mensaje, setMensaje] = useState<string>("");

    const [tablageneral, setTablageneral] = useState<TablageneralType[]>([]);
    const [jugadoresRegistro, setjugadoresRegistro] = useState<Plantelestype[]>([]);

    useEffect(() => {
        // Función para realizar la solicitud fetch
        const fetchData = async () => {
          try {
            // Realizar la solicitud fetch
            const response = await fetch(`${apiruta}/api/v1/tournaments`);
         




            // Verificar si la respuesta es exitosa (código de estado 200)
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
    
            // Convertir la respuesta a formato JSON
            const data: TorneoType[] = await response.json();
            const resultadosFiltrados = data.filter(
              (item) => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias.toUpperCase() === torneo?.toUpperCase()
              //            const resultadosFiltrados = data.filter(item => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias.toUpperCase() === torneo );
    
            );
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


        if (idtorneo !== null) {
          getRapidFootballStandings(idtorneo)
            .then((equiposConInfo) => {
              console.log('Equipos con Info:', equiposConInfo);
              setTablageneral(equiposConInfo);
      
            })
            .catch((error) => {
              console.error('Error en la obtención de equipos con info:', error);
            });
        }


        getPlayersTournament(idtorneo)
          .then((jugadores  )=>{
            setjugadoresRegistro(jugadores)
          })
          .catch((error) => {
            console.error('Error en la obtención de jugadores', error);
          });

      }, [liga,torneo, idtorneo]); 

  const token = localStorage.getItem('token');

 const { register, handleSubmit  }  = useForm<Plantelestype>()

  const onSubmit: SubmitHandler<Plantelestype> = async (data) => {

const formData = new URLSearchParams();





if (data.dorsal) {
    formData.append('dorsal', data.dorsal.toString());
  } 

  if (data.typeParticipant) {
    console.log(data.typeParticipant)
    formData.append('typeParticipant', data.typeParticipant.toString());
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
    setShowSuccess(true); // Mostrar el mensaje de éxito si la solicitud fue exitosa
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  //  window.location.href = '/Jugadores';

  } else {
    // Handle error response
  }
} catch (error) {
  console.error('Error submitting form:', error);
}

    

  }
   

  const findregister = (event: ChangeEvent<HTMLInputElement>): void => {
    const idRegistro: number = parseInt(event.target.value);
    console.log(idRegistro); // Imprimir el número en la consola
    console.log('jugadores del torneo', jugadoresRegistro);
    const registroEncontrado = jugadoresRegistro.find(registro => registro.participants.id === idRegistro);
    if (registroEncontrado) {
      setMensaje(`Jugador ${JSON.stringify(registroEncontrado.participants.name)} - Equipo ${JSON.stringify(registroEncontrado.teams.name)}- Id Registro ${JSON.stringify(registroEncontrado.id)}`);
  } else {
      setMensaje("No se encontró el jugador registrado.");
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
        
    
        <label htmlFor="TypeParticipant">Typo de Participante</label>
<select {...register('typeParticipant')} id="TypeParticipant">
  <option value="Jugador">Jugador</option>
</select>
      
      
    <label htmlFor="teams">Team Away</label>
          <select {...register('teams')}>
            {tablageneral.map((equipo) => (
              <option key={equipo.equipoId} value={equipo.equipoId}>
                {equipo.equipo}
              </option>
            ))}
          </select>

      <label htmlFor="participants">Jugador</label>
      <input type="number" {...register('participants') }
          onChange={findregister} 
          />
  
      <label htmlFor="dorsal">Dorsal</label>
        <input type="number" {...register('dorsal')} />

        <button type="submit">Submit</button>
      </form>
      {showSuccess && <SuccessMessage message="¡Creado con éxito!" />}
      <p>{mensaje}</p>


      </>
 )
    }   

export default Planteles