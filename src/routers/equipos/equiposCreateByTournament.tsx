import { useForm, SubmitHandler } from 'react-hook-form';
import { EquiposByTournamentType } from '../../types/equipostype';

function EquiposCreateByTournament() {
  const { register, handleSubmit } = useForm<EquiposByTournamentType>();

  const onSubmit: SubmitHandler<EquiposByTournamentType> = async (data) => {
    console.log('Data del formulario:', data);
    console.log('Data del teamsId:', data.teams.id);
    console.log('Data del tournamentsId:', data.tournaments);
    console.log('Data del participantsId:', data.participants);

    const objetoDatos = {
        teamsId: Number(data.teams),
        tournamentsId: Number(data.tournaments),
        participantsId: Number(data.participants)
      };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:4000/api/v1/teams-tournament`, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoDatos)
      });

      if (response.ok) {
        console.log('Equipo creado correctamente.');
      } else {
        console.error('Error al crear el equipo:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="tournaments">Tournaments:</label>
        <input type="number" {...register('tournaments')} />

        <label htmlFor="participants">Participants:</label>
        <input type="number" {...register('participants')} />
    
        <label htmlFor="teams">Teams:</label>
        <input type="number" {...register('teams')} />
      
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EquiposCreateByTournament;
