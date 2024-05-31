import { useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getParticipantById } from '../Partidos/functions/getParticipantById';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Jugadorestype } from '../../types/jugadores';
import { apiruta } from '../../config/apiruta';

interface FormData extends Jugadorestype {
  file: FileList;
}

function JugadoresEdit() {
  const [jugador, setJugador] = useState<Jugadorestype>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
        setJugador(participantsById);
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const handleSubmit2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch(`${apiruta}/api/v1/participants/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Imagen subida:', data);
    } catch (error) {
      console.error('Hubo un problema con la solicitud fetch:', error);
    }
  };


  return (
    <div className='participants-edit-container'>
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
       <div>
         <p><img className="ParticipantsEdit" src={`${apiruta}/public/participants/${jugador?.Photo}`} alt="Foto del jugador" /></p>
     
         <form onSubmit={handleSubmit2}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Subir imagen</button>
    </form>
       </div>
    </div>
    
  );
}

export default JugadoresEdit;
