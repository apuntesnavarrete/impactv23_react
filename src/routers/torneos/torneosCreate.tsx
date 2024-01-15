import { SubmitHandler, useForm } from 'react-hook-form';
import { TorneoType } from '../../types/torneotype';
import { apiruta } from '../../config/apiruta';


function TorneosCreate(){


  const token = localStorage.getItem('token');

 const { register, handleSubmit  }  = useForm<TorneoType>()

  const onSubmit: SubmitHandler<TorneoType> = async (data) => {
console.log(data.idName)

const formData = new URLSearchParams();
formData.append('idName', data.idName);

formData.append('description', data.description);
formData.append('date_fundation', data.date_fundation);

if (data.leagues) {
  formData.append('leagues', data.leagues.toString());
} 

if (data.categories) {
  formData.append('categories', data.categories.toString());
} 

    try {


      

        const response = await fetch(`${apiruta}/api/v1/tournaments`, {
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
   
      <>     <form onSubmit={handleSubmit(onSubmit)}>
      {/* nesecito que a fututo el diname se componga de la liga y torneo */}
      <label htmlFor="idName">idName</label>
      <input type="text" {...register('idName')} />
    
      <label htmlFor="description">Descripción</label>
    <input type="text" {...register('description')} />

    <label htmlFor="date_fundation">Fecha de Fundación</label>
    <input type="date" {...register('date_fundation')} />

    <label htmlFor="leagues">Ligas</label>
    <input type="number" {...register('leagues')} />

    <label htmlFor="categories">Categorías</label>
    <input type="number" {...register('categories')} />
   
      <button type="submit">Submit</button>
    </form>
    <p>
      ligas debe ser un select con las ligas.
      y Idname debe acompletar de ligas y categorias , ejemplo aqui
    </p>
    <p>LIGA-CATEGORIA-AÑOTORNEO</p>
    <p>ED-FEMENIL_PLANITO-22A</p>
    </>
 )
    }   

export default TorneosCreate