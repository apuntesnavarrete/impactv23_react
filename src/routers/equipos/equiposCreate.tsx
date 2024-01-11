import { useForm, SubmitHandler } from 'react-hook-form';
import { EquiposType } from '../../types/equipostype';
import { apiruta } from '../../config/apiruta';

interface FormData extends EquiposType {
  file: FileList;
}

function EquiposCreate(){

  const { register, handleSubmit } = useForm<FormData>();

  const token = localStorage.getItem('token');


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('name', data.name);


    if (data.participants) {
      formData.append('participants', data.participants.toString());
    } 
    //  formData.append('participants',participants.id);

    try {
      const response = await fetch(`${apiruta}/api/v1/teams`, {
        method: 'POST',
        body: formData,
        headers:{
            'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
///mensaje de elemento creado
        window.location.href = '/Equipos';

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

      <label htmlFor="dt">dt:</label>
      <input type="text" {...register('participants')} />
    
      <label htmlFor="file">Logo:</label>
      <input type="file" {...register('file')} />

      <button type="submit">Submit</button>
    </form>
    )
    }

export default EquiposCreate