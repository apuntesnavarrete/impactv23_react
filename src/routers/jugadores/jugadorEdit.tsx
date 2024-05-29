import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getParticipantById } from '../Partidos/functions/getParticipantById';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Jugadorestype } from '../../types/jugadores';
import { apiruta } from '../../config/apiruta';

interface FormData extends Jugadorestype {
  file: FileList;
}

function JugadoresEdit() {
  const [jugador, setJugador] = useState<Jugadorestype>();

  const { id } = useParams();
  let idAsNumber: number | undefined;

  if (id !== undefined) {
    idAsNumber = parseInt(id, 10);
  } else {
    // Handle the case where id is undefined, such as setting a default value or throwing an error
  }

  const { register, handleSubmit, setValue } = useForm<FormData>();


  useEffect(() => {
    async function fetchParticipantsData() {
      if (idAsNumber !== undefined) {
        const participantsById = await getParticipantById(idAsNumber);
        console.log(participantsById);
        setJugador(participantsById);
        console.log(participantsById.name)
        // Set form values after fetching data
        if (participantsById) {
          setValue('name', participantsById.name);
          setValue('sex', participantsById.sex);
          setValue('Curp', participantsById.Curp);
          setValue('Email', participantsById.Email);
          setValue('birthDate', participantsById.birthDate);
        }
      }
    }

    fetchParticipantsData();
  }, [idAsNumber, setValue]); // Add idAsNumber and setValue to dependency array

  useEffect(() => {
    setValue('file', new DataTransfer().files);
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  
    const photo = data.Photo === undefined ? `${idAsNumber}.jpg` : data.Photo;


    const payload = {
        name: data.name,
        birthDate: data.birthDate,
        Curp: data.Curp,
        Photo: photo, // Si está disponible en los datos
        Email: data.Email,
        sex: data.sex,
      };
    
    try {
    //  console.log(payload);

      const response = await fetch(`${apiruta}/api/v1/participants/${idAsNumber}`, {
        

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // Establecer el tipo de contenido como JSON
      },
        body: JSON.stringify(payload),
        // Agregar token después.
      });

      if (response.ok) {
        //window.location.href = '/Jugadores';
        console.log(response)
      } else {
         // La solicitud falló, manejar el error
    const errorData = await response.json(); // Obtener detalles del error del cuerpo de la respuesta
    console.error('Error en la solicitud:', errorData);

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input type="text" {...register('name')} />

        <label htmlFor="Genero">Género:</label>
        <select id="Genero" {...register('sex')}>
          <option value="M">Hombre</option>
          <option value="F">Mujer</option>
        </select>

        <label htmlFor="Curp">Curp:</label>
        <input type="text" {...register('Curp')} />

        <label htmlFor="Email">Email:</label>
        <input type="text" {...register('Email')} />

        <label htmlFor="birthDate">Birth Date:</label>
        <input type="date" {...register('birthDate')} />

        <label htmlFor="file">File:</label>
        <input type="file" {...register('file')} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JugadoresEdit;
