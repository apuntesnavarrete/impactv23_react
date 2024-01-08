import { useState } from "react";
import { Jugadorestype } from "../../types/jugadores";

function JugadoresCreate(){

    const [formData, setFormData] = useState<Partial<Jugadorestype>>({
      name: '',
      Email: '',
      birthDate: '',
      Photo: '', // Aquí podrías usar algún tipo de componente para manejar la carga de imágenes
      Curp: '',
      });
    
      const token = localStorage.getItem('token');

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
            const response = await fetch('http://18.188.110.39:83/api/v1/participants', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

              },
              body: JSON.stringify(formData),
            });
    
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
        <p>formulario para crear jugadores</p>
        <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="Email">Correo Electrónico</label>
      <input
        type="email"
        id="Email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
      />


      <label htmlFor="birthDate">Fecha de Nacimiento</label>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
      />

      <label htmlFor="Photo">Foto</label>
      <input
        type="file"
        id="Photo"
        name="Photo"
        onChange={handleChange}
        accept="image/*"
      />

      <label htmlFor="Curp">CURP</label>
      <input
        type="text"
        id="Curp"
        name="Curp"
        value={formData.Curp}
        onChange={handleChange}
      />

      <button type="submit">Crear jugador</button>
    </form>
        </>
    )
    }

export default JugadoresCreate