import { useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiruta } from '../../config/apiruta';
import { getTeamsById } from '../../functions/getTeamById';
import { EquiposType } from '../../types/equipostype';

interface FormData extends EquiposType {
  file: FileList;
}

function EquiposEdit() {
  const [equipo, setequipo] = useState<EquiposType>();
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
        const TeamsById = await getTeamsById(idAsNumber);
        setequipo(TeamsById);
        // Set form values after fetching data
        if (TeamsById) {
          setValue('name', TeamsById.name);
         
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
  
   // const photo = data.Photo === undefined ? `${idAsNumber}.jpg` : data.Photo;


    
    const payload = {
        name: data.name,
       
      };
    
    try {
    //  console.log(payload);

      const response = await fetch(`${apiruta}/api/v1/teams/${idAsNumber}`, {
        

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
      const response = await fetch(`${apiruta}/api/v1/teams/upload-image`, {
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

     
        <button type="submit">Submit</button>
      </form>
       </div>
       <div>
         <p><img className="ParticipantsEdit" src={`${apiruta}/public/teams/${equipo?.logo}`} alt="Foto del jugador" /></p>
     
         <form onSubmit={handleSubmit2}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Subir imagen</button>
    </form>
    <p>{`El logo debe llamarase ${equipo?.logo}`}</p>

       </div>
    </div>
    
  );
}

export default EquiposEdit;