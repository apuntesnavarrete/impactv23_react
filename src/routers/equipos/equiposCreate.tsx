import { useState } from "react";
import { EquiposType } from "../../types/equipostype";

function EquiposCreate(){

    const [formData, setFormData] = useState<Partial<EquiposType>>({
        name: ''
      });
    
      const token = localStorage.getItem('token');
console.log(token)

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://18.188.110.39:83/api/v1/teams', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

              },
              body: JSON.stringify(formData),
            });
    
            console.log(response)

            if (response.ok) {
                // El servidor respondió correctamente (código de estado 2xx)
                const responseData = await response.json();
    

    
                console.log('Creacion exitosa:', responseData);
              } else {

                // El servidor respondió con un error (código de estado diferente de 2xx)
                console.error('Error en la autenticación:', response.statusText);

              }
            } catch (error) {
              // Manejo de errores de la solicitud
              console.error('Error al enviar la solicitud:', error);
            }
    
        }
   
    return(
        <>
        <p>formulario para crear Equipos</p>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Nombre</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />


        <button type="submit">Crear Equipos</button>
      </form>
        </>
    )
    }

export default EquiposCreate