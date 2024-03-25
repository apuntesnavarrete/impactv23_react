import React, { useState } from 'react';
import { LoginForm } from '../../types/loginform';
import { SuccessMessage } from '../SuccesMessage';



const Login: React.FC = () => {

  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });



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
        const response = await fetch('http://18.188.110.39:83/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El servidor respondió correctamente (código de estado 2xx)
            const responseData = await response.json();

            localStorage.setItem('token', responseData.token);

            console.log('Autenticación exitosa:', responseData);
            setShowSuccess(true); // Mostrar el mensaje de éxito si la solicitud fue exitosa
            setTimeout(() => {
              setShowSuccess(false);

            }, 3000);

          } else {
            // El servidor respondió con un error (código de estado diferente de 2xx)
            console.error('Error en la autenticación:', response.statusText);
          }
        } catch (error) {
          // Manejo de errores de la solicitud
          console.error('Error al enviar la solicitud:', error);
        }

  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Iniciar Sesión</button>
      </form>

      {showSuccess && <SuccessMessage message="Autenticacion exitosa" />}

    </div>
  );
};

export default Login;