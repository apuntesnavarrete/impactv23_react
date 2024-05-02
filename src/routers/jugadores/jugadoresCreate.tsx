import { useForm, SubmitHandler } from 'react-hook-form';
import { Jugadorestype } from '../../types/jugadores';
import { apiruta } from '../../config/apiruta';

interface FormData extends Jugadorestype {
  file: FileList; 
}

function JugadoresCreate(){

  const { register, handleSubmit } = useForm<FormData>();

  const token = localStorage.getItem('token');


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('name', data.name);
    formData.append('Curp', data.Curp);
    formData.append('Email', data.Email);
    formData.append('birthDate', data.birthDate);

    try {
      const response = await fetch(`${apiruta}/api/v1/participants`, {
        method: 'POST',
        body: formData,
        headers:{
            'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        window.location.href = '/Jugadores';

      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

     
   
    return(
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* Your form fields go here */}
      <label htmlFor="name">Name:</label>
      <input type="text" {...register('name')} />

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
    )
    }

export default JugadoresCreate