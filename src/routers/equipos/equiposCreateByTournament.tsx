import { useForm, SubmitHandler } from 'react-hook-form';
import { EquiposByTournamentType } from '../../types/equipostype';
import { apiruta } from '../../config/apiruta';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getTournamentId from '../Partidos/functions/getTournamentId';
import { SuccessMessage } from '../SuccesMessage';

function EquiposCreateByTournament() {
    const [showSuccess, setShowSuccess] = useState(false);

    const { liga, torneo } = useParams();
    const [idTorneo, setIdTorneo] = useState<number | null>(null);
 const { register, handleSubmit } = useForm<EquiposByTournamentType>();

 useEffect(()=>{
    getTournamentId(liga,torneo)
                .then((idTorneo:number | null)=>{
                    if (idTorneo !== null) {
                        // Hacer algo con el ID del torneo
                        console.log('ID del torneo:', idTorneo);
                        setIdTorneo(idTorneo);
                       
                      } else {
                        console.error('No se pudo obtener el ID del torneo.');
                      }
                })
},[])

  const onSubmit: SubmitHandler<EquiposByTournamentType> = async (data) => {
    console.log('Data del formulario:', data);
    console.log('Data del teamsId:', data.teams);
    console.log('Data del tournamentsId:', idTorneo);
    console.log('Data del participantsId:', data.participants);

    

    const objetoDatos = {
        teamsId: Number(data.teams),
        tournamentsId: idTorneo,
        participantsId: data.participants ? data.participants.id : null
    };

      console.log('Data del objeto:', objetoDatos);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiruta}/api/v1/teams-tournament`, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoDatos)
      });

      if (response.ok) {
        console.log('Equipo creado correctamente.');
        setShowSuccess(true); // Mostrar el mensaje de éxito si la solicitud fue exitosa
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        console.error('Error al crear el equipo:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return(
    <>
     <h2>Detalles del Torneo</h2>
      <p>Liga: {liga}</p>
      <p>Categoria: {torneo}</p>
      <p>idTorneo: {idTorneo}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        

         <label htmlFor="teams">Teams:</label>
        <input type="number" {...register('teams')} />

        <label htmlFor="participants">Participants:</label>
        <input type="number" {...register('participants')} />
    
     
      
        <button type="submit">Submit</button>
      </form>
      {showSuccess && <SuccessMessage message="¡Creado con éxito!" />}

    </>
  );
}

export default EquiposCreateByTournament;
